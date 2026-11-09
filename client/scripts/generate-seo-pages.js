import { mkdir, readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_SITE_URL,
  buildSiteStructuredData,
  buildProductStructuredData,
  getProductUrl,
  getProductSlug,
} from '../src/utils/productSeo.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(scriptDir, '../dist');
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
const apiUrl = (process.env.API_URL || process.env.VITE_API_URL || 'https://thriftdistrict.onrender.com/api').replace(/\/$/, '');
const description = 'Discover unique, affordable second-hand fashion at Thrift District. Shop sustainable style and find your next favorite piece.';

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const safeJsonLd = (data) => JSON.stringify(data).replaceAll('<', '\\u003c');

const buildSeoTags = ({ title, pageDescription, url, image, structuredData, pageType = 'website' }) => {
  const tags = [
    `<meta name="description" content="${escapeHtml(pageDescription)}" />`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    `<meta property="og:type" content="${pageType}" />`,
    '<meta property="og:site_name" content="Thrift District" />',
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(pageDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(url)}" />`,
    `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(pageDescription)}" />`,
  ];
  if (image) {
    tags.push(`<meta property="og:image" content="${escapeHtml(image)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  }
  tags.push(`<script id="page-structured-data" type="application/ld+json">${safeJsonLd(structuredData)}</script>`);
  return tags.join('\n    ');
};

const applySeoTags = (html, seo) => {
  const cleanHtml = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<meta\b[^>]*>/gi, (tag) => /(?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"/i.test(tag) ? '' : tag)
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<script\b[^>]*id="page-structured-data"[^>]*>[\s\S]*?<\/script>/gi, '');
  return cleanHtml.replace('</head>', `    ${buildSeoTags(seo)}\n  </head>`);
};

const xmlEscape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const response = await fetch(`${apiUrl}/products`, { signal: AbortSignal.timeout(60000) });
if (!response.ok) {
  throw new Error(`Sitemap generation failed: product API returned HTTP ${response.status} at ${apiUrl}/products`);
}

const products = await response.json();
if (!Array.isArray(products)) throw new Error('Sitemap generation failed: product API response was not a list.');

const htmlTemplate = await readFile(path.join(distDir, 'index.html'), 'utf8');
const homeTitle = 'Thrift District | Shop Sustainable Second-Hand Fashion';
await writeFile(path.join(distDir, 'index.html'), applySeoTags(htmlTemplate, {
  title: homeTitle,
  pageDescription: description,
  url: `${siteUrl}/`,
  image: products.find((product) => product.image)?.image,
  structuredData: buildSiteStructuredData(siteUrl),
}));

const staticPages = [
  {
    path: 'about',
    title: 'About Thrift District | Sustainable Fashion',
    pageDescription: 'Learn about Thrift District and our mission to make unique second-hand fashion affordable and sustainable.',
  },
  {
    path: 'contact',
    title: 'Contact Thrift District',
    pageDescription: 'Get in touch with Thrift District for help finding your next favorite second-hand fashion piece.',
  },
];
const sitemapUrls = [`${siteUrl}/`];
for (const page of staticPages) {
  const url = `${siteUrl}/${page.path}`;
  const pageHtml = applySeoTags(htmlTemplate, {
    ...page,
    url,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.pageDescription,
      url,
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
  });
  const pagePath = path.join(distDir, page.path, 'index.html');
  await mkdir(path.dirname(pagePath), { recursive: true });
  await writeFile(pagePath, pageHtml);
  sitemapUrls.push(url);
}

for (const product of products) {
  if (!product._id || !product.name) continue;

  const slug = getProductSlug(product);
  const url = getProductUrl(product, siteUrl);
  const productDescription = product.description || `Shop ${product.name} at Thrift District.`;
  const productHtml = applySeoTags(htmlTemplate, {
    title: `${product.name} | Thrift District`,
    pageDescription: productDescription,
    url,
    image: product.image,
    pageType: 'product',
    structuredData: buildProductStructuredData(product, siteUrl),
  });
  const pagePath = path.join(distDir, 'products', slug, 'index.html');
  await mkdir(path.dirname(pagePath), { recursive: true });
  await writeFile(pagePath, productHtml);
  sitemapUrls.push(url);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Generated SEO metadata, ${products.length} product pages, and sitemap.xml.`);
