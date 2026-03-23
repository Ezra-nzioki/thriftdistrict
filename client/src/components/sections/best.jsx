import React from 'react'

export const Best = () => {
  return (
    <div className='flex flex-col justify-center items-center space-y-6 p-10 bg-[#F4991A] text-[#F9F5F0] lg:flex-row lg:space-x-10 lg:space-y-0'>
        <div className='space-y-4 max-w-lg text-center lg:text-left'>
            <h3 className='font-bold capitalize text-2xl'>
                The best jeans plug around you😉
            </h3>
            <p className='font-medium capitalize text-md '>
                We offer a wide range of high-quality jeans that are perfect for any occasion. Whether you're looking for classic styles or the latest trends, we've got you covered. Our jeans are made from durable materials and designed to provide a comfortable fit, ensuring you look and feel your best. Visit us today to find your perfect pair!
            </p>
        </div>
        <div>
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="best jeans" className='rounded-2xl ' />
        </div>
    </div>
  )
}
