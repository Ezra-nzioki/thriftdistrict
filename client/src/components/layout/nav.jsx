import React, { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { CartModal } from './cartModal'
import { Link } from 'react-router-dom'

export const Nav = () => {
  const [open, setOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { getTotalItems } = useCart()

  useEffect(() => {
    const updateAdminStatus = () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')
      setIsAdmin(Boolean(token && role === 'admin'))
    }

    updateAdminStatus()
    window.addEventListener('user-auth-change', updateAdminStatus)

    return () => {
      window.removeEventListener('user-auth-change', updateAdminStatus)
    }
  }, [])

  return (
 <>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c4a15a]/60 bg-[#17372e] text-sm font-bold tracking-wide text-[#dfc58c] shadow-sm">
              TD
            </div>
            <span className="text-sm font-bold tracking-[0.16em] text-[#17372e] sm:text-base">THRIFT DISTRICT</span>
          </a>

          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="font-medium text-[#17372e] transition hover:text-[#a47b35]">Home</Link>
            <Link to="/about" className="font-medium text-[#17372e] transition hover:text-[#a47b35]">About</Link>
            <Link to="/contact" className="font-medium text-[#17372e] transition hover:text-[#a47b35]">Contact</Link>
          </nav>
        
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hidden p-2 text-[#17372e] transition hover:text-[#a47b35] md:block"
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
                <span className="absolute right-0 top-0 inline-flex -translate-y-1 translate-x-1 items-center justify-center rounded-full bg-[#c4a15a] px-2 py-1 text-xs font-bold leading-none text-[#102a23]">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <Link
              to="/admin/login"
              className="hidden items-center rounded-full border border-[#17372e]/15 px-4 py-2 text-sm font-medium text-[#17372e] transition hover:border-[#c4a15a] hover:text-[#a47b35] md:inline-flex"
            >
              admin
            </Link>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="rounded-full p-2 text-[#17372e] hover:bg-[#f6f2e9] focus:outline-none"
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
        <div className="border-t border-[#e7dfd1] bg-[#fffdf8] md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium">Home</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium">Contact</Link>
            <button
              onClick={() => {
                setIsCartOpen(true)
                setOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium flex items-center gap-2"
            >
              🛒 Cart ({getTotalItems()})
            </button>
            <Link
              to="/admin/login"
              className="block px-3 py-2 rounded-md text-[#344F1F] hover:bg-gray-50 font-medium"
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
