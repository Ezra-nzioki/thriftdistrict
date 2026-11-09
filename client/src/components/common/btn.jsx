import React from 'react'

export const Btn = (props) => {
  const { text } = props  
  return (
    <div className="flex justify-center">
        <button
          onClick={() => document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-3 min-h-12 rounded-full border border-[#e36414] bg-[#0f4c5c] px-8 py-3 font-semibold capitalize text-[#e5eeea] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#344e41]"
        >
          {text}
        </button>
    </div>
  )
}
