
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header'
import { Allproducts } from './components/sections/products'
import { Best } from './components/sections/best'
import { Features } from './components/sections/features'
import { Hero } from './components/sections/hero'
import { NewStock } from './components/sections/newStock'
import Testimonials from './components/sections/testimonials'
import Footer from './components/layout/footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import Checkout from './components/checkout/Checkout'
import AboutPage from './components/pages/AboutPage'
import ContactPage from './components/pages/ContactPage'

const API_URL = 'https://thriftdistrict.onrender.com/api';
let homeDataPromise;

const preloadImage = (src) => new Promise((resolve) => {
  if (!src) return resolve();
  const image = new Image();
  image.onload = resolve;
  image.onerror = resolve;
  image.src = src;
});

const getHomeData = () => {
  if (!homeDataPromise) {
    homeDataPromise = Promise.all([
      fetch(`${API_URL}/products`),
      fetch(`${API_URL}/content`),
    ]).then(async ([productsResponse, contentResponse]) => {
      if (!productsResponse.ok || !contentResponse.ok) {
        throw new Error('Could not load storefront data.');
      }

      const [products, contentItems] = await Promise.all([
        productsResponse.json(),
        contentResponse.json(),
      ]);
      const content = contentItems.reduce((result, item) => {
        result[item.section] = item.data;
        return result;
      }, {});
      const imageUrls = [content.hero?.image, ...products.map((product) => product.image)];

      await Promise.all([...new Set(imageUrls)].map(preloadImage));
      return { products, content };
    }).catch((error) => {
      homeDataPromise = null;
      throw error;
    });
  }

  return homeDataPromise;
};

const HomePage = () => {
  const [homeData, setHomeData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    getHomeData().then((data) => {
      if (active) setHomeData(data);
    }).catch(() => {
      if (active) setLoadError(true);
    });

    return () => { active = false; };
  }, [retryCount]);

  if (!homeData) {
    return (
      <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-[#F9F5F0] px-6 text-center text-[#344F1F]" role={loadError ? 'alert' : 'status'} aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-[0.25em]">Thrift District</p>
        <div className="my-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#344F1F]/20">
          <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-[#F4991A] border-t-transparent" aria-hidden="true" />
        </div>
        {loadError ? (
          <>
            <h1 className="text-3xl font-bold">The shop is taking a moment</h1>
            <p className="mt-2">We couldn&apos;t load the latest finds.</p>
            <button onClick={() => { setLoadError(false); setRetryCount((count) => count + 1); }} className="mt-6 rounded bg-[#344F1F] px-5 py-3 font-semibold text-white">Try again</button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">The shop is opening</h1>
            <p className="mt-2">Getting the latest finds ready for you...</p>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      <Hero content={homeData.content} />
      <Features />
      <NewStock />
      <Best />
      <Allproducts products={homeData.products} />
      <Testimonials />
      <AboutPage />
      <ContactPage />
    </>
  );
};

function App() {
  return (
    <Router>
      <Header/>
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard/>}/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
