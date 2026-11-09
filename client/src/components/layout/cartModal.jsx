import React from 'react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

export const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0f4c5c]/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative m-4 mx-auto my-8 max-w-2xl rounded-2xl border border-[#335c67]/50 bg-[#e5eeea] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#335c67]/40 p-6">
          <h2 className="text-2xl font-bold text-[#0f4c5c]">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-2xl text-[#344e41] hover:text-[#335c67]"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-[#344e41]">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-xl border border-[#335c67]/35 bg-[#eef3ee] p-4 transition hover:border-[#344e41]"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg bg-[#d9e5df] object-cover"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#0f4c5c]">{item.name}</h3>
                    <p className="font-bold text-[#344e41]">Ksh. {item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 rounded-lg border border-[#335c67]/50 bg-[#eef3ee]">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="px-3 py-1 text-[#0f4c5c] transition hover:bg-[#335c67]/20"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-semibold text-[#0f4c5c]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1 text-[#0f4c5c] transition hover:bg-[#335c67]/20"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-24">
                    <p className="font-semibold text-[#0f4c5c]">
                      Ksh. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="rounded p-2 text-[#0f4c5c] transition hover:bg-[#335c67]/20"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#335c67]/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-[#0f4c5c]">Total:</span>
              <span className="text-2xl font-bold text-[#344e41]">
                Ksh. {getTotalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 rounded-full bg-[#344e41] px-4 py-3 font-semibold text-[#e5eeea] transition hover:bg-[#0f4c5c]"
              >
                Clear Cart
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-full bg-[#344e41] px-4 py-3 font-semibold text-white transition hover:bg-[#0f4c5c]"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => { onClose(); navigate('/checkout'); }}
                className="flex-1 rounded-full bg-[#0f4c5c] px-4 py-3 font-semibold text-[#e5eeea] transition hover:bg-[#344e41]"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
