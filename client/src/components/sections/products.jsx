import { useCart } from '../../context/CartContext';

export const Allproducts = ({ products }) => {
  const { addToCart } = useCart();

  return (
    <section className='bg-[#F4991A] px-4 py-10 text-[#F9F5F0] sm:px-6 sm:py-14 lg:px-8'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='mb-8 text-center sm:mb-10'>
          <h2 className='text-2xl font-bold sm:text-3xl'>All Products</h2>
          <p className='mt-2 text-base sm:text-lg'>The products we have in stock.</p>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((item) => (
            <article key={item._id} className='overflow-hidden rounded-lg bg-white text-[#344F1F] shadow-md'>
              <img src={item.image} alt={item.name} className='h-64 w-full object-contain p-3 sm:h-72' />
              <div className='flex h-full flex-col items-center p-4 text-center'>
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
  );
};
