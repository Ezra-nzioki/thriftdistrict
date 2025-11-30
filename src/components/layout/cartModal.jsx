import React from 'react'
import { useCart } from '../../context/CartContext'

export const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl m-4 max-w-2xl mx-auto my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#344F1F]">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#F4991A] transition"
                >
                  {/* Product Image */}
                  <img
                    src={item.imageUrl || item.imgUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#344F1F]">{item.name}</h3>
                    <p className="text-[#F4991A] font-bold">Ksh. {item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-[#344F1F] hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-semibold text-[#344F1F]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-[#344F1F] hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-24">
                    <p className="font-semibold text-[#344F1F]">
                      Ksh. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition"
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
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-[#344F1F]">Total:</span>
              <span className="text-2xl font-bold text-[#F4991A]">
                Ksh. {getTotalPrice().toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 px-4 py-3 bg-gray-300 text-[#344F1F] font-semibold rounded-lg hover:bg-gray-400 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-[#62109F] text-white font-semibold rounded-lg hover:bg-[#310950] transition"
              >
                Continue Shopping
              </button>
              <button className="flex-1 px-4 py-3 bg-[#F4991A] text-[#344F1F] font-semibold rounded-lg hover:bg-[#E07A0D] transition">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
