import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const adminWhatsAppNumber = '254710865376';
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [content, setContent] = useState({});
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '', stock: '' });
  const [productImagePreview, setProductImagePreview] = useState('');
  const [uploadingImageFor, setUploadingImageFor] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [savingProduct, setSavingProduct] = useState(false);
  const [productSaveError, setProductSaveError] = useState('');
  const [editing, setEditing] = useState(null);
  const [isCheckingAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return !token || role !== 'admin';
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!productImagePreview.startsWith('blob:')) return undefined;
    return () => URL.revokeObjectURL(productImagePreview);
  }, [productImagePreview]);

  const fetchProducts = async () => {
    const res = await fetch('https://thriftdistrict.onrender.com/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('https://thriftdistrict.onrender.com/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingProduct(true);
    setProductSaveError('');
    const token = localStorage.getItem('token');
    const url = editing ? `https://thriftdistrict.onrender.com/api/products/${editing}` : 'https://thriftdistrict.onrender.com/api/products';
    const method = editing ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Could not save product (${res.status}).`);
      }
      await fetchProducts();
      setForm({ name: '', description: '', price: '', image: '', category: '', stock: '' });
      setProductImagePreview('');
      setEditing(null);
    } catch (error) {
      setProductSaveError(error.message);
    } finally {
      setSavingProduct(false);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setProductImagePreview('');
    setEditing(product._id);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`https://thriftdistrict.onrender.com/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    fetchProducts();
  };

  const fetchContent = async () => {
    const res = await fetch('https://thriftdistrict.onrender.com/api/content');
    const data = await res.json();
    const contentObj = {};
    data.forEach(item => {
      contentObj[item.section] = item.data;
    });
    setContent(contentObj);
  };

  const uploadImage = async (event, target) => {
    const file = event.currentTarget.files?.[0];
    const input = event.currentTarget;
    if (!file) return;

    if (target === 'product') setProductImagePreview(URL.createObjectURL(file));
    setUploadingImageFor(target);
    setUploadError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('https://thriftdistrict.onrender.com/api/products/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : null;
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('The image upload API is not deployed yet. Deploy the latest backend and try again.');
        }
        throw new Error(data?.error || `Image upload failed (${res.status}).`);
      }
      if (!data?.url) throw new Error('The server did not return an image URL.');

      const uploadedImage = new Image();
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('The uploaded image link did not load. Check the image storage configuration and try again.')), 10000);
        uploadedImage.onload = () => {
          clearTimeout(timeout);
          resolve();
        };
        uploadedImage.onerror = () => {
          clearTimeout(timeout);
          reject(new Error('The uploaded image link could not be displayed. Check the image storage configuration and try again.'));
        };
        uploadedImage.src = data.url;
      });

      if (target === 'product') {
        setForm((current) => ({ ...current, image: data.url }));
        setProductImagePreview(data.url);
      } else {
        setContent((current) => ({ ...current, hero: { ...current.hero, image: data.url } }));
      }
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploadingImageFor('');
      input.value = '';
    }
  };

  const updateOrderStatus = async (id, status) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`https://thriftdistrict.onrender.com/api/orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updatedOrder = await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: updatedOrder.status } : order
        )
      );

      if (status === 'completed') {
        const order = orders.find((item) => item._id === id);
        if (order?.customer?.phone) {
          const customerMessage = [
            `Hello ${order.customer.name}, your Thrift District order is confirmed and complete.`,
            '',
            'Order details:',
            ...order.items.map((item) => `${item.name} | Qty: ${item.quantity} | Ksh. ${item.price} | Image: ${item.image}`),
            `Total: Ksh. ${order.total}`,
            `Delivery address: ${order.customer.address}`
          ].join('\n');
          const customerNumber = order.customer.phone.replace(/\D/g, '').replace(/^0/, '254');
          window.open(`https://wa.me/${customerNumber}?text=${encodeURIComponent(customerMessage)}`, '_blank', 'noopener,noreferrer');
        } else {
          alert('Order completed, but this order has no customer WhatsApp number.');
        }
      }
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this completed order?')) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`https://thriftdistrict.onrender.com/api/orders/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (res.ok) {
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } else {
      alert('Could not delete this order.');
    }
  };

  const sendOrderToAdminWhatsApp = (order) => {
    const message = [
      'Thrift District order',
      `Customer: ${order.customer?.name || 'Unknown'}`,
      `Phone: ${order.customer?.phone || 'Unknown'}`,
      `Address: ${order.customer?.address || 'Unknown'}`,
      '',
      ...order.items.map((item) => `${item.name} | Qty: ${item.quantity} | Ksh. ${item.price} | Image: ${item.image}`),
      `Total: Ksh. ${order.total}`
    ].join('\n');
    window.open(`https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const updateContent = async (section, data) => {
    const token = localStorage.getItem('token');
    await fetch(`https://thriftdistrict.onrender.com/api/content/${section}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    fetchContent();
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    queueMicrotask(() => {
      fetchProducts();
      fetchOrders();
      fetchContent();
    });
  }, [navigate]);

  if (isCheckingAuth) {
    return <div className="p-6 text-center text-[#344F1F]">Checking admin access...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="block w-full mb-2 p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="block w-full mb-2 p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => {
            setForm({ ...form, image: e.target.value });
            setProductImagePreview('');
          }}
          className="block w-full mb-2 p-2 border"
        />
        <label className="block mb-2">
          <span className="block mb-1">Upload product image</span>
          <input type="file" accept="image/*" onChange={(event) => uploadImage(event, 'product')} />
        </label>
        {(productImagePreview || form.image) && <img src={productImagePreview || form.image} alt="Product image preview" className="mb-2 h-32 w-32 object-contain" />}
        {uploadingImageFor === 'product' && <p role="status">Uploading image...</p>}
        {uploadError && <p role="alert" className="mb-2 text-red-600">{uploadError}</p>}
        {productSaveError && <p role="alert" className="mb-2 text-red-600">{productSaveError}</p>}
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="block w-full mb-2 p-2 border"
        />
        <button type="submit" disabled={savingProduct || uploadingImageFor === 'product'} className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50">{savingProduct ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}</button>
        {editing && <button type="button" onClick={() => { setForm({ name: '', description: '', price: '', image: '', category: '', stock: '' }); setProductImagePreview(''); setEditing(null); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
      </form>
      <h2 className="text-2xl mb-4">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="mb-2 p-2 border flex justify-between">
            <span>{product.name} - ${product.price}</span>
            <div>
              <button onClick={() => handleEdit(product)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
        
      </ul>
      <h2 className="text-2xl mb-4 mt-8">Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="mb-4 p-4 border rounded">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer:</strong> {order.customer?.name || 'Unknown'}</p>
            <p><strong>WhatsApp:</strong> {order.customer?.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> {order.customer?.address || 'Not provided'}</p>
            <p><strong>Total:</strong> Ksh. {order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Items:</strong></p>
            <ul className="ml-4">
              {order.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                  {item.name} - Qty: {item.quantity} - Ksh. {item.price}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <button onClick={() => updateOrderStatus(order._id, 'completed')} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Mark Completed</button>
              <button onClick={() => updateOrderStatus(order._id, 'pending')} className="bg-yellow-500 text-white px-2 py-1 rounded">Mark Pending</button>
              <button onClick={() => sendOrderToAdminWhatsApp(order)} className="bg-[#25D366] text-white px-2 py-1 rounded ml-2">Send to my WhatsApp</button>
              {order.status === 'completed' && <button onClick={() => deleteOrder(order._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete Order</button>}
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-2xl mb-4 mt-8">Site Content</h2>
      <div className="mb-4">
        <h3 className="text-lg">Hero Section</h3>
        <input
          type="text"
          placeholder="Hero Title"
          value={content.hero?.title || ''}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Hero Image URL"
          value={content.hero?.image || ''}
          onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
          className="block w-full mb-2 p-2 border"
        />
        <label className="block mb-2">
          <span className="block mb-1">Upload hero image</span>
          <input type="file" accept="image/*" onChange={(event) => uploadImage(event, 'hero')} />
        </label>
        {uploadingImageFor === 'hero' && <p role="status">Uploading image...</p>}
        {uploadError && <p role="alert" className="mb-2 text-red-600">{uploadError}</p>}
        <button onClick={() => updateContent('hero', content.hero)} className="bg-blue-500 text-white px-4 py-2 rounded">Update Hero</button>
      </div>
    </div>
  );
};

export default AdminDashboard;