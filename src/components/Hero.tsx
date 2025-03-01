
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToVehicles = () => {
    const vehiclesSection = document.getElementById('vehicles');
    if (vehiclesSection) {
      vehiclesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    navigate('/vehicles');
  };

  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      </div>
      
      <div className="safari-container relative z-10">
        <div className="max-w-3xl text-white animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-secondary/90 text-white rounded-full font-ubuntu text-sm mb-6 animate-fade-in">
            Premier Car Hire Services in Eldoret
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Explore Kenya's Beauty with Our Premium Fleet
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
            Whether you're seeking adventure in the wilderness or business travel comfort,
            our diverse fleet of vehicles provides the perfect transportation solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleBookNow} className="btn-secondary inline-block text-center animate-fade-up">
              Book Now
            </button>
            <a href="#vehicles" className="btn-outline border-white text-white hover:bg-white hover:text-primary inline-block text-center animate-fade-up" onClick={(e) => { e.preventDefault(); scrollToVehicles(); }}>
              View Our Fleet
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center animate-bounce">
        <button 
          onClick={scrollToVehicles}
          className="flex flex-col items-center focus:outline-none"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
