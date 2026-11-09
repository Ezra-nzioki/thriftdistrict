import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductImage from '../common/ProductImage';
import PageMeta from '../common/PageMeta';
import { DEFAULT_SITE_URL, buildProductStructuredData, getProductSizes, getProductSlug } from '../../utils/productSeo';

const API_URL = import.meta.env.VITE_API_URL || 'https://thriftdistrict.onrender.com/api';

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const loadProduct = async () => {
      try {
        setLoading(true);
        setLoadError('');
        setProduct(null);
        const response = await fetch(`${API_URL}/products`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Could not load product (${response.status}).`);
        const products = await response.json();
        const foundProduct = products.find((item) => getProductSlug(item) === slug);
        setProduct(foundProduct || null);
      } catch (error) {
        if (error.name !== 'AbortError') setLoadError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    loadProduct();
    return () => controller.abort();
  }, [slug]);

  const siteUrl = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
  const description = product?.description || (product ? `Shop ${product.name} at Thrift District.` : '');
  const structuredData = useMemo(
    () => product ? buildProductStructuredData(product, siteUrl) : null,
    [product, siteUrl],
  );

  if (loading) {
    return <p className='mx-auto max-w-7xl px-4 py-16 text-center text-[#0f4c5c]' role='status'>Loading product...</p>;
  }
  if (loadError || !product) {
    return (
      <section className='mx-auto max-w-7xl px-4 py-16 text-center text-[#0f4c5c]' role='alert'>
        <h1 className='text-2xl font-bold'>{loadError ? 'Could not load this product' : 'Product not found'}</h1>
        {loadError && <p className='mt-2'>{loadError}</p>}
        <Link to='/' className='mt-5 inline-block rounded-full bg-[#0f4c5c] px-6 py-3 font-semibold text-[#e5eeea] transition hover:bg-[#344e41]'>Back to shop</Link>
      </section>
    );
  }

  const sizes = getProductSizes(product);

  return (
    <section className='mx-auto max-w-7xl px-4 py-10 text-[#0f4c5c] sm:px-6 lg:px-8'>
      <PageMeta
        title={`${product.name} | Thrift District`}
        description={description}
        path={`/products/${slug}`}
        image={product.image}
        structuredData={structuredData}
      />
      <Link to='/#all-products' className='mb-6 inline-block font-semibold text-[#344e41] underline underline-offset-4'>← Back to all products</Link>
      <div className='grid gap-8 md:grid-cols-2 md:items-start'>
        <div className='rounded-3xl border border-[#335c67]/50 bg-[#eef3ee] p-3 shadow-xl shadow-[#0f4c5c]/10'>
          <ProductImage
            src={product.image}
            alt={product.name}
            loading='eager'
            fetchPriority='high'
            className='aspect-square w-full rounded-2xl bg-[#d9e5df] object-contain'
          />
        </div>
        <div>
          {product.category && <p className='text-xs font-bold uppercase tracking-[0.24em] text-[#335c67]'>{product.category}</p>}
          <h1 className='mt-2 text-3xl font-semibold tracking-tight sm:text-4xl'>{product.name}</h1>
          <p className='mt-4 text-2xl font-semibold'>Ksh.{Number(product.price).toFixed(2)}</p>
          <p className={`mt-3 font-semibold ${Number(product.stock) > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {Number(product.stock) > 0 ? 'In stock' : 'Out of stock'}
          </p>
          {product.description && <p className='mt-6 whitespace-pre-line leading-relaxed text-[#344e41]'>{product.description}</p>}
          {sizes.length > 0 && (
            <div className='mt-6'>
              <h2 className='font-semibold'>Available sizes</h2>
              <ul className='mt-2 flex flex-wrap gap-2'>
                {sizes.map((size) => <li key={size} className='rounded-full border border-[#335c67]/60 bg-[#335c67]/15 px-4 py-2 text-sm'>{size}</li>)}
              </ul>
            </div>
          )}
          <button
            type='button'
            disabled={Number(product.stock) <= 0}
            onClick={() => addToCart(product)}
            className='mt-8 min-h-12 rounded-full bg-[#0f4c5c] px-8 py-3 font-semibold text-[#e5eeea] transition hover:bg-[#344e41] disabled:cursor-not-allowed disabled:opacity-50'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
