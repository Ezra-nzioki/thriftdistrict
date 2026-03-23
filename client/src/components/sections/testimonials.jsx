import React, { useState } from 'react'

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    { 
      name: 'Tony Ali', 
      role: 'Military', 
      quote: 'Great selection and amazing customer service!',
      image: 'https://i.pinimg.com/736x/9e/58/d8/9e58d8d7a36f9903f970a6acbd70293e.jpg'
    },
    { 
      name: 'John Kamau', 
      role: 'Buyer', 
      quote: 'Quality products at unbeatable prices.',
      image: 'https://i.pinimg.com/736x/1f/01/06/1f0106573662de00db2923f0df9a99da.jpg'
    },
    { 
      name: 'Aisha Mwangi', 
      role: 'Farmer', 
      quote: 'I found unique pieces that my clients love.',
      image: 'https://i.pinimg.com/736x/66/02/7b/66027be70f52899a6936a06f957299a3.jpg'
    },
  ]

  const currentTestimonial = testimonials[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  return (
    <section className="bg-[#344F1F] text-[#F9F5F0] h-fit py-1 px-2 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row justify-center items-center py-12">
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-8">What People Are Saying About Us</h1>
          
          <div className="flex items-center mb-6">
            <img 
              src={currentTestimonial.image} 
              alt={currentTestimonial.name} 
              className="rounded-full mr-4 w-[100px] h-[100px] object-cover" 
            />
            <div>
              <h2 className="text-lg font-bold">{currentTestimonial.name}</h2>
              <p className="text-[#F4991A]">{currentTestimonial.role}</p>
            </div>
          </div>
          
          <p className="text-[#F9F5F0] mb-8 text-lg">"{currentTestimonial.quote}"</p>

          {/* Navigation Buttons */}
          <div className="flex gap-4 items-center">
            <button 
              onClick={handlePrev}
              className="bg-[#62109F] hover:bg-[#310950] text-white font-bold py-2 px-6 rounded-lg transition"
            >
              ← Previous
            </button>
            
            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === currentIndex ? 'bg-[#F4991A]' : 'bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="bg-[#62109F] hover:bg-[#310950] text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="md:w-fit p-8">
          <img 
            src="https://i.pinimg.com/1200x/d6/b2/fc/d6b2fc912c9570f9fe6e06bcef0a5bff.jpg" 
            alt="Testimonial" 
            className=" w-xl rounded-lg" 
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
