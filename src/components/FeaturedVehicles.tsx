
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import vehicles from '../data/vehicles';
import VehicleCard from './VehicleCard';

const FeaturedVehicles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredVehicles = vehicles.slice(0, 4);
  const maxIndex = featuredVehicles.length - 1;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleNext = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  };
  
  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  };
  
  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = currentIndex * (containerRef.current.scrollWidth / featuredVehicles.length);
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, featuredVehicles.length]);
  
  return (
    <section className="py-16 bg-white" id="vehicles">
      <div className="safari-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10">
          <div>
            <h2 className="section-heading">Our Featured Vehicles</h2>
            <p className="text-charcoal-light max-w-2xl">
              Discover our premium selection of vehicles, meticulously maintained 
              and ready for your journey through Kenya's beautiful landscapes.
            </p>
          </div>
          
          <div className="flex space-x-2 mt-6 md:mt-0">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous vehicle"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors"
              aria-label="Next vehicle"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-hidden relative">
          <div 
            ref={containerRef}
            className="flex w-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredVehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id}
                className="flex-shrink-0 w-full snap-center pr-4"
              >
                <VehicleCard vehicle={vehicle} featured />
              </div>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredVehicles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
          {featuredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} featured />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="btn-outline inline-flex items-center">
            View All Vehicles <ChevronRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
