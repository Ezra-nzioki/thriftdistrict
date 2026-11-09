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
      <section id='all-products' className='scroll-mt-20 bg-[#e5eeea] px-4 py-12 text-[#0f4c5c] sm:px-6 sm:py-16 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='mb-9 text-center sm:mb-12'>
            <p className='text-xs font-bold uppercase tracking-[0.3em] text-[#335c67]'>Curated for you</p>
            <h2 className='mt-2 text-3xl font-semibold tracking-tight text-[#0f4c5c] sm:text-4xl'>Find your next favorite</h2>
            <p className='mt-3 text-base text-[#344e41] sm:text-lg'>One-of-a-kind pieces, chosen to be worn again.</p>
          </div>

          <div className='mb-8 rounded-2xl border border-[#335c67]/50 bg-[#eef3ee] p-4 shadow-[0_12px_35px_-24px_rgba(15,76,92,.2)] sm:p-6'>
            <label htmlFor='product-search' className='mb-2 block text-sm font-semibold text-[#0f4c5c]'>Search the collection</label>
            <div className='relative'>
              <input
                id='product-search'
                type='search'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder='Search by name, description, category, or size'
                autoComplete='off'
                className='min-h-12 w-full rounded-xl border border-[#335c67]/60 bg-[#eef3ee] px-4 py-3 pr-12 text-base text-[#0f4c5c] outline-none transition placeholder:text-[#335c67] focus:border-[#344e41] focus:ring-2 focus:ring-[#344e41]/20'
              />
              {search && (
                <button type='button' onClick={() => setSearch('')} aria-label='Clear search' className='absolute right-3 top-1/2 min-h-11 -translate-y-1/2 rounded px-2 text-[#344e41] hover:bg-[#e5eeea]'>
                  Clear
                </button>
              )}
            </div>
            <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              <label className='text-sm font-semibold text-[#344e41]'>
                Sort by
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className='mt-1 min-h-11 w-full rounded-xl border border-[#335c67]/60 bg-[#eef3ee] px-3 text-base font-normal text-[#0f4c5c] focus:border-[#344e41] focus:outline-none'>
                  <option value='newest'>New arrivals</option>
                  <option value='price-low'>Price: low to high</option>
                  <option value='price-high'>Price: high to low</option>
                </select>
              </label>
              <label className='text-sm font-semibold text-[#344e41]'>
                Category
                <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className='mt-1 min-h-11 w-full rounded-xl border border-[#335c67]/60 bg-[#eef3ee] px-3 text-base font-normal text-[#0f4c5c] focus:border-[#344e41] focus:outline-none'>
                  <option value=''>All categories</option>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </label>
              {sizes.length > 0 && (
                <label className='text-sm font-semibold text-[#344e41]'>
                  Size
                  <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className='mt-1 min-h-11 w-full rounded-xl border border-[#335c67]/60 bg-[#eef3ee] px-3 text-base font-normal text-[#0f4c5c] focus:border-[#344e41] focus:outline-none'>
                    <option value=''>All sizes</option>
                    {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
                  </select>
                </label>
              )}
            </div>
            <div className='mt-4 flex flex-wrap items-center justify-between gap-3'>
              <p className='text-sm text-[#344e41]' role='status' aria-live='polite'>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {debouncedSearch && ` matching “${search.trim()}”`}
              </p>
              {(search || selectedCategory || selectedSize || sortOrder !== 'newest') && (
                <button type='button' onClick={clearFilters} className='min-h-11 rounded-full border border-[#344e41]/35 px-4 text-sm font-semibold text-[#0f4c5c] transition hover:border-[#e36414] hover:bg-[#335c67]/20'>
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
                    className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition ${selectedSize === size ? 'border-[#344e41] bg-[#344e41] text-white' : 'border-[#335c67]/60 bg-[#eef3ee] text-[#344e41] hover:border-[#344e41] hover:text-[#0f4c5c]'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {filteredProducts.map((item) => (
              <article key={item._id} className='group overflow-hidden rounded-2xl border border-[#335c67]/45 bg-[#eef3ee] text-[#0f4c5c] shadow-[0_10px_30px_-22px_rgba(15,76,92,.2)] transition duration-300 hover:-translate-y-1 hover:border-[#e36414]/70 hover:shadow-[0_24px_45px_-26px_rgba(15,76,92,.24)]'>
                <button
                  type='button'
                  onClick={() => setSelectedImage(item)}
                  aria-label={`View ${item.name} image full screen`}
                  className='block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#d9e5df]'
                >
                  <ProductImage src={item.image} alt={item.name} className='block h-full w-full object-cover transition duration-300' />
                </button>
                <div className='flex flex-col items-center p-4 text-center'>
                  <h3 className='text-lg font-semibold'>
                    <Link to={`/products/${getProductSlug(item)}`} className='transition hover:text-[#344e41]'>{item.name}</Link>
                  </h3>
                  <p className='mt-2 line-clamp-3 text-sm text-[#344e41]'>{item.description}</p>
                  {getProductSizes(item).length > 0 && <p className='mt-2 text-sm text-[#344e41]'>Sizes: {getProductSizes(item).join(', ')}</p>}
                  <p className='mt-3 font-semibold tracking-wide text-[#0f4c5c]'>Ksh.{Number(item.price).toFixed(2)}</p>
                  <button
                    type='button'
                    onClick={() => addToCart(item)}
                    className='mt-4 min-h-11 rounded-full bg-[#0f4c5c] px-6 py-2 text-sm font-semibold text-[#e5eeea] transition hover:bg-[#344e41]'
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className='rounded-2xl border border-[#335c67]/50 bg-[#eef3ee] px-5 py-12 text-center text-[#0f4c5c]'>
              <h3 className='text-lg font-semibold'>No products found</h3>
              <p className='mt-2 text-sm text-[#344e41]'>Try another search or clear the selected filters.</p>
              <button type='button' onClick={clearFilters} className='mt-4 min-h-11 rounded-full bg-[#0f4c5c] px-5 py-2 font-semibold text-[#e5eeea] transition hover:bg-[#344e41]'>Clear search and filters</button>
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
            className='absolute right-4 top-4 z-10 rounded-full bg-[#eef3ee] px-4 py-2 text-2xl font-semibold text-[#0f4c5c]'
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
