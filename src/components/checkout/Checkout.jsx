import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = cartItems.map(item => ({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    }));
    const total = getTotalPrice();

    try {
      const res = await fetch('https://fluffy-winner-xjggrr5xp593v6qp-5001.app.github.dev/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, ...form }),
      });
      if (res.ok) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/');
      } else {
        alert('Error placing order');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-4 mb-4 p-4 border rounded">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <div>
                <h3>{item.name}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Ksh. {item.price * item.quantity}</p>
              </div>
            </div>
          ))}
          <p className="text-xl font-bold">Total: Ksh. {getTotalPrice()}</p>
        </div>
        <div>
          <h2 className="text-2xl mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="block w-full mb-2 p-2 border"
              required
            />
            <textarea
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="block w-full mb-4 p-2 border"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;