import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';

export const Allproducts = ({ products }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <>
      <section className='bg-[#F4991A] px-4 py-10 text-[#F9F5F0] sm:px-6 sm:py-14 lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='mb-8 text-center sm:mb-10'>
            <h2 className='text-2xl font-bold sm:text-3xl'>All Products</h2>
            <p className='mt-2 text-base sm:text-lg'>The products we have in stock.</p>
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((item) => (
              <article key={item._id} className='overflow-hidden rounded-lg bg-white text-[#344F1F] shadow-md'>
                <button
                  type='button'
                  onClick={() => setSelectedImage(item)}
                  aria-label={`View ${item.name} image full screen`}
                  className='block w-full cursor-zoom-in'
                >
                  <img src={item.image} alt={item.name} className='h-64 w-full object-contain p-3 sm:h-72' />
                </button>
                <div className='flex flex-col items-center p-4 text-center'>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  <p className='mt-2 line-clamp-3 text-sm text-gray-700'>{item.description}</p>
                  <p className='mt-3 font-bold'>Ksh.{Number(item.price).toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className='mt-4 rounded-md bg-[#62109F] px-4 py-2 font-semibold text-white transition hover:bg-[#310950]'
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
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
          <img
            src={selectedImage.image}
            alt={selectedImage.name}
            className='max-h-full max-w-full cursor-default object-contain'
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
