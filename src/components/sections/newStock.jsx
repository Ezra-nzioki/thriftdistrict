import React from 'react'
import { newProducts } from '../sections/arrival'

export const NewStock = () => {

  return (
    <div className='flex flex-col justify-center items-center space-y-6 p-10 bg-[#F4991A] text-[#F9F5F0] lg:flex-row'>
        <div>
            <h2 className='font-bold capitalize text-2xl'>
                new in stock
            </h2>
            <p className='font-bold capitalize text-lg'>Get the latest fashionn pieces as they arrive in store. Check back regularly for new arrivals and exclusive drops.
            </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
           {newProducts.map(
            (item)=>{
            console.log(item);  
            return(
                <div key={item.id} className="flex flex-col h-[430px] justify-start items-center space-y-2 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer md:w-l  mt-4 
                 p-4 rounded-lg  sm:h-[380px] md:h-[450px]    ">
                    <img src={item.imgUrl} alt={item.name} className="md:w-[600px] h-[350px] sm:h-[350px] md:h-[350px]  object-contain rounded-2xl" />
                    <h3 className="mt-1 text-[#344F1F] text-lg capitalize">{item.name}</h3>
                </div>
            )
           }
           )}
        </div>
    </div>
  )
}
