import { useEffect } from 'react';
import { DEFAULT_SITE_URL } from '../../utils/productSeo';

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const removeMeta = (attribute, key) => {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
};

const PageMeta = ({ title, description, path = '/', image, structuredData }) => {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
    const canonicalUrl = `${siteUrl.replace(/\/$/, '')}${path}`;
    const pageTitle = title || 'Thrift District | Shop Sustainable Fashion';
    const pageDescription = description || 'Discover unique, affordable second-hand fashion at Thrift District.';

    document.title = pageTitle;
    setMeta('name', 'description', pageDescription);
    setMeta('property', 'og:type', path.startsWith('/products/') ? 'product' : 'website');
    setMeta('property', 'og:site_name', 'Thrift District');
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:url', canonicalUrl);
    if (image) {
      setMeta('property', 'og:image', image);
      setMeta('name', 'twitter:image', image);
    } else {
      removeMeta('property', 'og:image');
      removeMeta('name', 'twitter:image');
    }
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMeta('name', 'twitter:title', pageTitle);
    setMeta('name', 'twitter:description', pageDescription);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let jsonLd = document.getElementById('page-structured-data');
    if (!structuredData) {
      jsonLd?.remove();
      return;
    }
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.id = 'page-structured-data';
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);
  }, [description, image, path, structuredData, title]);

  return null;
};

export default PageMeta;
