import React from 'react'
import { Btn } from '../common/btn'
import { products } from '../../products'

export const Hero = () => {
  const heroProduct = products[0].imageUrl; // using first product for hero
  console.log(products)
  return (
    <>
      <div
        className="font-bold w-screen flex flex-col justify-center p-10 space-y-6 text-[#F9F5F0] min-h-[500px]"
        style={{ backgroundImage: `url(${heroProduct})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h2 className="text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl text-[#F9F5F0] leading-relaxed drop-shadow-lg">
          Reduce, Reuse, Revamp!<br/>
          Explore our online thrift shop<br/>
          For unique, eco-friendly fashion finds.<br/>
          Shop with us and join the sustainable fashion movement
        </h2>
        <Btn text="shop now" className="relative z-0" />
      </div>

      <div className='bg-[#344F1F] border-2 border-[#F9F5F0] rounded-lg md:w-auto lg:w-auto -mt-2 mb-2 lg:mx-2 relative z-20 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-0 items-center text-[#F9F5F0]'>
        <div className="text-center p-4 border-r-2 border-b-2 md:border-b-0 border-[#F9F5F0]">
          <h5 className="text-2xl md:text-3xl font-bold">7</h5>
          <p className="text-sm md:text-base">year experience</p>
        </div>
        <div className="text-center p-4 md:border-r-2 border-b-2 md:border-b-0 border-[#F9F5F0]">
          <h5 className="text-2xl md:text-3xl font-bold">2</h5>
          <p className="text-sm md:text-base">opened in the country</p>
        </div>
        <div className="text-center p-4 border-r-2 border-[#F9F5F0]">
          <h5 className="text-2xl md:text-3xl font-bold">1k+</h5>
          <p className="text-sm md:text-base">trousers sold</p>
        </div>
        <div className="text-center p-4">
          <h5 className="text-2xl md:text-3xl font-bold">260+</h5>
          <p className="text-sm md:text-base">variant trousers</p>
        </div>
      </div>
    </>
  )
}
