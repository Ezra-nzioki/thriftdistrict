import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductImage from '../common/ProductImage';
import { getProductSizes, getProductSlug, getProductTimestamp } from '../../utils/productSeo';

export const Allproducts = ({ products }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim().toLocaleLowerCase()), 160);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category?.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [products],
  );
  const sizes = useMemo(
    () => [...new Set(products.flatMap(getProductSizes))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    [products],
  );
  const filteredProducts = useMemo(() => {
    const searchTerms = debouncedSearch.split(/\s+/).filter(Boolean);
    const result = products.filter((product) => {
      const productSizes = getProductSizes(product);
      const searchableText = [
        product.name,
        product.description,
        product.category,
        ...productSizes,
      ].filter(Boolean).join(' ').toLocaleLowerCase();
      return searchTerms.every((term) => searchableText.includes(term))
        && (!selectedCategory || product.category === selectedCategory)
        && (!selectedSize || productSizes.some((size) => size.toLocaleLowerCase() === selectedSize.toLocaleLowerCase()));
    });

    if (sortOrder === 'price-low') result.sort((a, b) => Number(a.price) - Number(b.price));
    if (sortOrder === 'price-high') result.sort((a, b) => Number(b.price) - Number(a.price));
    if (sortOrder === 'newest') result.sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a));
    return result;
  }, [debouncedSearch, products, selectedCategory, selectedSize, sortOrder]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedSize('');
    setSortOrder('newest');
  };

  return (
    <>
      <section id='all-products' className='scroll-mt-20 bg-[#F4991A] px-4 py-10 text-[#F9F5F0] sm:px-6 sm:py-14 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='mb-8 text-center sm:mb-10'>
            <h2 className='text-2xl font-bold sm:text-3xl'>All Products</h2>
            <p className='mt-2 text-base sm:text-lg'>The products we have in stock.</p>
          </div>

          <div className='mb-8 rounded-xl bg-white p-4 text-[#344F1F] shadow-md sm:p-5'>
            <label htmlFor='product-search' className='mb-2 block text-sm font-semibold'>Search products</label>
            <div className='relative'>
              <input
                id='product-search'
                type='search'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder='Search by name, description, category, or size'
                autoComplete='off'
                className='min-h-12 w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-base outline-none focus:border-[#62109F] focus:ring-2 focus:ring-[#62109F]/20'
              />
              {search && (
                <button type='button' onClick={() => setSearch('')} aria-label='Clear search' className='absolute right-3 top-1/2 min-h-11 -translate-y-1/2 rounded px-2 text-gray-600 hover:bg-gray-100'>
                  Clear
                </button>
              )}
            </div>
            <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              <label className='text-sm font-semibold'>
                Sort by
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className='mt-1 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-base font-normal'>
                  <option value='newest'>New arrivals</option>
                  <option value='price-low'>Price: low to high</option>
                  <option value='price-high'>Price: high to low</option>
                </select>
              </label>
              <label className='text-sm font-semibold'>
                Category
                <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className='mt-1 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-base font-normal'>
                  <option value=''>All categories</option>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              {sizes.length > 0 && (
                <label className='text-sm font-semibold'>
                  Size
                  <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className='mt-1 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-base font-normal'>
                    <option value=''>All sizes</option>
                    {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </label>
              )}
            </div>
            <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
              <p className='text-sm text-gray-700' role='status' aria-live='polite'>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {debouncedSearch && ` matching “${search.trim()}”`}
              </p>
              {(search || selectedCategory || selectedSize || sortOrder !== 'newest') && (
                <button type='button' onClick={clearFilters} className='min-h-11 rounded-full border border-[#344F1F]/30 px-4 text-sm font-semibold hover:bg-gray-100'>
                  Clear filters
                </button>
              )}
            </div>
            {sizes.length > 0 && (
              <div className='mt-3 flex flex-wrap gap-2' aria-label='Filter by size'>
                {sizes.map((size) => (
                  <button
                    key={size}
                    type='button'
                    aria-pressed={selectedSize === size}
                    onClick={() => setSelectedSize((current) => current === size ? '' : size)}
                    className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${selectedSize === size ? 'border-[#344F1F] bg-[#344F1F] text-white' : 'border-gray-300 bg-white hover:border-[#344F1F]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredProducts.map((item) => (
              <article key={item._id} className='overflow-hidden rounded-lg bg-white text-[#344F1F] shadow-md'>
                <button
                  type='button'
                  onClick={() => setSelectedImage(item)}
                  aria-label={`View ${item.name} image full screen`}
                  className='block w-full cursor-zoom-in'
                >
                  <ProductImage src={item.image} alt={item.name} className='h-64 w-full bg-gray-50 object-contain p-3 sm:h-72' />
                </button>
                <div className='flex flex-col items-center p-4 text-center'>
                  <h3 className='text-lg font-semibold'>
                    <Link to={`/products/${getProductSlug(item)}`} className='hover:underline'>{item.name}</Link>
                  </h3>
                  <p className='mt-2 line-clamp-3 text-sm text-gray-700'>{item.description}</p>
                  {getProductSizes(item).length > 0 && <p className='mt-2 text-sm text-gray-700'>Sizes: {getProductSizes(item).join(', ')}</p>}
                  <p className='mt-3 font-bold'>Ksh.{Number(item.price).toFixed(2)}</p>
                  <button
                    type='button'
                    onClick={() => addToCart(item)}
                    className='mt-4 rounded-md bg-[#62109F] px-4 py-2 font-semibold text-white transition hover:bg-[#310950]'
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className='rounded-xl bg-white px-5 py-12 text-center text-[#344F1F]'>
              <h3 className='text-lg font-semibold'>No products found</h3>
              <p className='mt-2 text-sm text-gray-700'>Try another search or clear the selected filters.</p>
              <button type='button' onClick={clearFilters} className='mt-4 min-h-11 rounded-lg bg-[#344F1F] px-5 py-2 font-semibold text-white'>Clear search and filters</button>
            </div>
          )}
        </div>
      </section>
      {selectedImage && (
        <div
          role='dialog'
          aria-modal='true'
          aria-label={`${selectedImage.name} image`}
          className='fixed inset-0 z-[110] flex cursor-zoom-out items-center justify-center bg-black/90 p-4'
          onClick={() => setSelectedImage(null)}
        >
          <button
            type='button'
            onClick={() => setSelectedImage(null)}
            aria-label='Close full-screen image'
            className='absolute right-4 top-4 z-10 rounded-full bg-white px-4 py-2 text-2xl font-semibold text-black'
          >
            &times;
          </button>
          <ProductImage
            src={selectedImage.image}
            alt={selectedImage.name}
            loading='eager'
            sizes='100vw'
            className='max-h-full max-w-full cursor-default object-contain'
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
