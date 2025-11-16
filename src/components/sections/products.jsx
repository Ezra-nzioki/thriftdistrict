import React, { useState } from 'react';
import { allProducts } from '../sections/allProducts';

export const Allproducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalProducts = allProducts.length;

  // Calculate how many cards to show based on screen size
  const cardsToShow = () => {
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 2;  // md
    return 1;  // sm
  };

  const nextProduct = () => {
    const maxIndex = totalProducts - cardsToShow();
    setCurrentIndex((prevIndex) => (prevIndex + 1 > maxIndex ? 0 : prevIndex + 1));
  };

  const prevProduct = () => {
    const maxIndex = totalProducts - cardsToShow();
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <div className='flex flex-col justify-center items-center space-y-6 p-10 bg-(--primary-color) text-(--text-color)'>
      <div className='text-center mb-6'>
        <h3 className='text-2xl font-bold'>All Products</h3>
        <p className='text-lg'>The products we have in stock.</p>
      </div>

      <div className='relative w-full max-w-6xl mx-auto'>
        <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow())}%)` }}>
          {allProducts.map((item) => (
            <div key={item.id} className={`flex-shrink-0 p-1 w-full sm:w-1/2 md:w-1/3 lg:w-1/4`}>
              <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <img src={item.imageUrl} alt={item.name} className='w-full h-100 object-cover' />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>{item.name}</h3>
                  <p className='text-gray-600'>{item.description}</p>
                  <p className='text-gray-800 font-bold'>ksh.{item.price.toFixed(2)}</p>
                  <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='absolute top-1/2 transform -translate-y-1/2 left-4'>
          <button onClick={prevProduct} className='bg-white text-black px-2 py-1 rounded-md shadow'>
            ❮
          </button>
        </div>
        <div className='absolute top-1/2 transform -translate-y-1/2 right-4'>
          <button onClick={nextProduct} className='bg-white text-black px-2 py-1 rounded-md shadow'>
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};
