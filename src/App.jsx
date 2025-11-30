
import { Header } from './components/layout/header'
import { Allproducts } from './components/sections/products'
import { Best } from './components/sections/best'
import { Features } from './components/sections/features'
import { Hero } from './components/sections/hero'
import { NewStock } from './components/sections/newStock'
import Testimonials from './components/sections/testimonials'
import Footer from './components/layout/footer'


function App() {
  

  return (
    <>
     <Header/>
     <main className="pt-16">
       <Hero/>
       <Features/>
       <NewStock/>
       <Best/>
       <Allproducts/>
       <Testimonials/>
     </main>
     <Footer/>
    </>
  )
}

export default App
