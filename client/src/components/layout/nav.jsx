import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { CartModal } from './cartModal'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const [open, setOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { getTotalItems } = useCart()

  return (
 <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f4c5c] text-sm font-bold tracking-wide text-[#e5eeea] shadow-sm shadow-[#0f4c5c]/20">
              TD
            </div>
            <span className="text-sm font-bold tracking-[0.16em] text-[#0f4c5c] sm:text-base">THRIFT DISTRICT</span>
          </a>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="font-medium text-[#0f4c5c] transition hover:text-[#335c67]">Home</Link>
            <Link to="/about" className="font-medium text-[#0f4c5c] transition hover:text-[#335c67]">About</Link>
            <Link to="/contact" className="font-medium text-[#0f4c5c] transition hover:text-[#335c67]">Contact</Link>
          </nav>
        
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hidden p-2 text-[#0f4c5c] transition hover:text-[#335c67] md:block"
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
                <span className="absolute right-0 top-0 inline-flex -translate-y-1 translate-x-1 items-center justify-center rounded-full bg-[#344e41] px-2 py-1 text-xs font-bold leading-none text-[#e5eeea]">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <Link
              to="/admin/login"
              className="hidden items-center rounded-full border border-[#344e41]/40 px-4 py-2 text-sm font-medium text-[#0f4c5c] transition hover:border-[#e36414] hover:text-[#335c67] md:inline-flex"
            >
              admin
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="rounded-full p-2 text-[#0f4c5c] hover:bg-[#335c67]/20 focus:outline-none"
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
        <div className="border-t border-[#335c67]/35 bg-[#eef3ee] md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block rounded-md px-3 py-2 font-medium text-[#0f4c5c] hover:bg-[#335c67]/20">Home</Link>
            <Link to="/about" className="block rounded-md px-3 py-2 font-medium text-[#0f4c5c] hover:bg-[#335c67]/20">About</Link>
            <Link to="/contact" className="block rounded-md px-3 py-2 font-medium text-[#0f4c5c] hover:bg-[#335c67]/20">Contact</Link>
            <button
              onClick={() => {
                setIsCartOpen(true)
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-medium text-[#0f4c5c] hover:bg-[#335c67]/20"
            >
              🛒 Cart ({getTotalItems()})
            </button>
            <Link
              to="/admin/login"
              className="block rounded-md px-3 py-2 font-medium text-[#0f4c5c] hover:bg-[#335c67]/20"
            >
              admin
            </Link>
          </div>
        </div>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
 </>
  )
}
