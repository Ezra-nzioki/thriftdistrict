
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

function App() {
  

  return (
    <Router>
      <Header/>
      <main className="pt-16">
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
              <Features/>
              <NewStock/>
              <Best/>
              <Allproducts/>
              <Testimonials/>
            </>
          } />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer/>
    </Router>
  )
}

export default App
