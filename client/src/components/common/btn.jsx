import React from 'react'

export const Btn = (props) => {
  const { text } = props  
  return (
    <div className="flex justify-center">
        <button className="mt-6 px-8 py-3 bg-[#62109F] text-white rounded-md hover:bg-[#310950] transition font-semibold">
          {text}
        </button>
    </div>
  )
}
