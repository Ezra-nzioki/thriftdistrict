import React from 'react'

export const Btn = (props) => {
  const { text } = props  
  return (
    <div className="flex justify-center">
        <button
          onClick={() => document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-3 min-h-12 rounded-full border border-[#dfc58c] bg-[#c4a15a] px-8 py-3 font-semibold capitalize text-[#102a23] shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#dfc58c]"
        >
          {text}
        </button>
    </div>
  )
}
