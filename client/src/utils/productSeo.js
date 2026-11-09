export const DEFAULT_SITE_URL = 'https://thriftdistrict-78lo.onrender.com';

export const getProductSlug = (product) => {
  const name = String(product.name || 'product')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'product';
  return `${name}-${product._id}`;
};

export const getProductUrl = (product, siteUrl = DEFAULT_SITE_URL) =>
  `${siteUrl.replace(/\/$/, '')}/products/${getProductSlug(product)}`;

export const getProductSizes = (product) => {
  const values = Array.isArray(product.sizes)
    ? product.sizes
    : [product.sizes || product.size];
  return [...new Set(values.flatMap((value) => String(value || '').split(','))
    .map((size) => size.trim())
    .filter(Boolean))];
};

export const getProductTimestamp = (product) => {
  if (product.createdAt) {
    const timestamp = new Date(product.createdAt).getTime();
    if (Number.isFinite(timestamp)) return timestamp;
  }

  const idPrefix = String(product._id || '').slice(0, 8);
  return /^[a-f\d]{8}$/i.test(idPrefix) ? Number.parseInt(idPrefix, 16) * 1000 : 0;
};

export const buildSiteStructuredData = (siteUrl = DEFAULT_SITE_URL) => {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OnlineStore',
        '@id': `${normalizedSiteUrl}/#store`,
        name: 'Thrift District',
        url: `${normalizedSiteUrl}/`,
        description: 'Discover unique, affordable second-hand fashion at Thrift District.',
      },
      {
        '@type': 'WebSite',
        '@id': `${normalizedSiteUrl}/#website`,
        url: `${normalizedSiteUrl}/`,
        name: 'Thrift District',
        publisher: { '@id': `${normalizedSiteUrl}/#store` },
      },
    ],
  };
};

export const buildProductStructuredData = (product, siteUrl = DEFAULT_SITE_URL) => {
  const productUrl = getProductUrl(product, siteUrl);
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.name,
    image: product.image ? [product.image] : undefined,
    sku: String(product._id),
    category: product.category || undefined,
    brand: { '@type': 'Brand', name: 'Thrift District' },
    url: productUrl,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'KES',
      price: Number(product.price).toFixed(2),
      availability: Number(product.stock) > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/UsedCondition',
    },
  };

  const rating = Number(product.rating ?? product.averageRating);
  const reviewCount = Number(product.reviewCount);
  if (Number.isFinite(rating) && rating > 0 && reviewCount > 0) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount,
    };
  }

  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
};
