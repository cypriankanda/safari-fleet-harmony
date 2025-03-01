
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import testimonials from '../data/testimonials';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handlePrev = () => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  return (
    <section className="py-16 relative overflow-hidden" id="testimonials">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-primary rotate-3 transform-gpu scale-150 translate-y-1/4"></div>
      </div>
      
      <div className="safari-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-heading text-center inline-block">Customer Testimonials</h2>
          <p className="text-charcoal-light max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers who have
            experienced PSK Safaris' exceptional service throughout Kenya.
          </p>
        </div>
        
        {/* Desktop Testimonials */}
        <div className="hidden md:grid grid-cols-2 gap-6 mb-8 animate-fade-up">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="safari-card p-6">
              <div className="flex items-start mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-charcoal-light text-sm">{testimonial.location}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating ? 'text-secondary fill-secondary' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-charcoal-light">{testimonial.text}</p>
            </div>
          ))}
        </div>
        
        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden relative">
          <div className="safari-card p-6 min-h-[230px] animate-fade-in">
            <div className="flex items-start mb-4">
              <img 
                src={testimonials[activeIndex].image} 
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-lg">{testimonials[activeIndex].name}</h4>
                <p className="text-charcoal-light text-sm">{testimonials[activeIndex].location}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonials[activeIndex].rating ? 'text-secondary fill-secondary' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-charcoal-light">{testimonials[activeIndex].text}</p>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
