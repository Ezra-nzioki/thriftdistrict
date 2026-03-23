import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { CartModal } from './cartModal'

export const Nav = () => {
  const [open, setOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()
  return (
 <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#62109F] text-white rounded-md flex items-center justify-center font-semibold text-sm">
              TD
            </div>
            <span className="text-lg font-bold text-[#344F1F]">THRIFT DISTRICT</span>
          </a>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            <a href="/" className="text-[#344F1F] hover:text-[#F4991A] font-medium transition">Home</a>
            <a href="/about" className="text-[#344F1F] hover:text-[#F4991A] font-medium transition">About</a>
            <a href="/contact" className="text-[#344F1F] hover:text-[#F4991A] font-medium transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#344F1F] hover:text-[#F4991A] transition hidden md:block"
              aria-label="Shopping cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h12l-2-8m0 0h6m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1 -translate-y-1 bg-[#F4991A] rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="p-2 rounded-md text-[#344F1F] hover:bg-gray-100 focus:outline-none"
              >
                {open ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium">Home</a>
            <a href="/about" className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium">About</a>
            <a href="/contact" className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium">Contact</a>
            <button
              onClick={() => {
                setIsCartOpen(true)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium flex items-center gap-2"
            >
              🛒 Cart ({getTotalItems()})
            </button>
          </div>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
 </>
  )
}
