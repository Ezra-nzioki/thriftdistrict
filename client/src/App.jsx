
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header'
import { Allproducts } from './components/sections/products'
import { Hero } from './components/sections/hero'
import ShopBenefits from './components/sections/ShopBenefits'
import Footer from './components/layout/footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import Checkout from './components/checkout/Checkout'
import AboutPage from './components/pages/AboutPage'
import ContactPage from './components/pages/ContactPage'
import ProductPage from './components/pages/ProductPage'
import PageMeta from './components/common/PageMeta'
import { DEFAULT_SITE_URL, buildSiteStructuredData } from './utils/productSeo'

const API_URL = import.meta.env.VITE_API_URL || 'https://thriftdistrict.onrender.com/api';
const SITE_URL = import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
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
      await preloadImage(content.hero?.image);
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
      <div className="fixed inset-0 z-[100] flex min-h-screen flex-col items-center justify-center bg-[#e5eeea] px-6 text-center text-[#0f4c5c]" role={loadError ? 'alert' : 'status'} aria-live="polite">
        <p className="text-sm font-bold uppercase tracking-[0.25em]">Thrift District</p>
        <div className="my-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#344e41]/30">
          <div className="h-14 w-14 animate-spin rounded-full border-[3px] border-[#344e41] border-t-transparent" aria-hidden="true" />
        </div>
        {loadError ? (
          <>
            <h1 className="text-3xl font-bold">The shop is taking a moment</h1>
            <p className="mt-2">We couldn&apos;t load the latest finds.</p>
            <button onClick={() => { setLoadError(false); setRetryCount((count) => count + 1); }} className="mt-6 rounded-full bg-[#0f4c5c] px-6 py-3 font-semibold text-[#e5eeea] transition hover:bg-[#344e41]">Try again</button>
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
      <PageMeta
        title='Thrift District | Shop Sustainable Second-Hand Fashion'
        description='Discover unique, affordable second-hand fashion at Thrift District. Shop sustainable style and find your next favorite piece.'
        image={homeData.content.hero?.image || homeData.products.find((product) => product.image)?.image}
        structuredData={buildSiteStructuredData(SITE_URL)}
      />
      <Hero content={homeData.content} />
      <ShopBenefits />
      <Allproducts products={homeData.products} />
      <ContactPage />
    </>
  );
};

const AboutRoute = () => (
  <>
    <PageMeta
      title='About Thrift District | Sustainable Fashion'
      description='Learn about Thrift District and our mission to make unique second-hand fashion affordable and sustainable.'
      path='/about'
    />
    <AboutPage />
  </>
);

const ContactRoute = () => (
  <>
    <PageMeta
      title='Contact Thrift District'
      description='Get in touch with Thrift District for help finding your next favorite second-hand fashion piece.'
      path='/contact'
    />
    <ContactPage />
  </>
);

function App() {
  return (
    <Router>
      <Header/>
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<AboutRoute />} />
          <Route path="/contact" element={<ContactRoute />} />
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
