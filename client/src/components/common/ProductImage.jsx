const widths = [320, 640, 960];

const getCloudinaryUrl = (url, width) => {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.endsWith('res.cloudinary.com')) return '';

    const marker = '/image/upload/';
    const markerIndex = parsedUrl.pathname.indexOf(marker);
    if (markerIndex === -1) return '';

    let assetPath = parsedUrl.pathname.slice(markerIndex + marker.length);
    if (assetPath.startsWith('f_jpg/')) assetPath = assetPath.slice('f_jpg/'.length);
    parsedUrl.pathname = `${parsedUrl.pathname.slice(0, markerIndex + marker.length)}f_jpg,q_auto,w_${width},c_limit/${assetPath}`;
    return parsedUrl.toString();
  } catch {
    return '';
  }
};

const ProductImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
  onClick,
  sizes = '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw',
}) => {
  const responsiveSources = widths
    .map((width) => {
      const url = getCloudinaryUrl(src, width);
      return url ? `${url} ${width}w` : null;
    })
    .filter(Boolean);

  return (
    <img
      src={src}
      srcSet={responsiveSources.length ? responsiveSources.join(', ') : undefined}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding='async'
      fetchPriority={fetchPriority}
      onClick={onClick}
      className={className}
    />
  );
};

export default ProductImage;
