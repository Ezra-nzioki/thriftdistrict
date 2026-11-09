import React from 'react'

export const Best = () => {
  return (
    <section className='bg-[#17372e] px-5 py-14 text-[#fffdf8] sm:px-8 lg:px-12'>
      <div className='mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:gap-14'>
        <div className='max-w-xl space-y-5 text-center lg:text-left'>
            <p className='text-xs font-bold uppercase tracking-[0.3em] text-[#dfc58c]'>Built to be worn again</p>
            <h2 className='text-3xl font-semibold capitalize tracking-tight sm:text-4xl'>
                The best jeans plug around you😉
            </h2>
            <p className='text-base leading-relaxed text-white/75 sm:text-lg'>
                We offer a wide range of high-quality jeans that are perfect for any occasion. Whether you're looking for classic styles or the latest trends, we've got you covered. Our jeans are made from durable materials and designed to provide a comfortable fit, ensuring you look and feel your best. Visit us today to find your perfect pair!
            </p>
        </div>
        <div className='w-full max-w-xl rounded-3xl border border-[#dfc58c]/30 bg-white/5 p-2 shadow-2xl shadow-black/20'>
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amVhbnN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="Curated denim at Thrift District" loading="lazy" decoding="async" className='h-72 w-full rounded-2xl object-cover sm:h-96' />
        </div>
      </div>
    </section>
  )
}
