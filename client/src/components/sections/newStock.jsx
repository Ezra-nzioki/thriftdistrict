import React from 'react'
import { newProducts } from './arrival'

export const NewStock = () => {

  return (
    <section className='bg-[#ede7da] px-5 py-14 text-[#17372e] sm:px-8 lg:px-12'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto mb-8 max-w-2xl text-center'>
            <p className='text-xs font-bold uppercase tracking-[0.3em] text-[#a47b35]'>Just landed</p>
            <h2 className='mt-2 text-3xl font-semibold capitalize tracking-tight sm:text-4xl'>
                new in stock
            </h2>
            <p className='mt-3 text-base leading-relaxed text-[#70776e] sm:text-lg'>Freshly found pieces, ready for their next chapter.
            </p>
        </div>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
           {newProducts.map(
            (item)=>{
            return(
                <div key={item.id} className="group flex flex-col items-center overflow-hidden rounded-2xl border border-[#e7dfd1] bg-[#fffdf8] p-4 shadow-[0_12px_30px_-24px_rgba(16,42,35,.5)] transition duration-300 hover:-translate-y-1 hover:border-[#c4a15a]/60 hover:shadow-xl">
                    <img src={item.imgUrl} alt={item.name} loading="lazy" decoding="async" className="h-72 w-full rounded-xl bg-[#f1ece2] object-contain transition duration-500 group-hover:scale-[1.03]" />
                    <h3 className="mt-4 text-center text-lg font-semibold capitalize text-[#17372e]">{item.name}</h3>
                </div>
            )
           }
           )}
        </div>
      </div>
    </section>
  )
}
