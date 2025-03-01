
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="safari-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="font-montserrat font-bold text-xl md:text-2xl text-primary">
              PSK <span className="text-secondary">Safaris</span>
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-charcoal hover:text-primary font-medium transition-colors">Home</a>
            <a href="#vehicles" className="text-charcoal hover:text-primary font-medium transition-colors">Vehicles</a>
            <a href="#about" className="text-charcoal hover:text-primary font-medium transition-colors">About</a>
            <a href="#testimonials" className="text-charcoal hover:text-primary font-medium transition-colors">Testimonials</a>
            <a href="#contact" className="text-charcoal hover:text-primary font-medium transition-colors">Contact</a>
            
            <div className="relative group">
              <button className="flex items-center text-charcoal hover:text-primary font-medium transition-colors">
                Account <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-safari overflow-hidden scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 origin-top transform transition-all duration-200">
                <a href="#" className="block px-4 py-3 text-sm text-charcoal hover:bg-primary hover:text-white transition-colors">Sign In</a>
                <a href="#" className="block px-4 py-3 text-sm text-charcoal hover:bg-primary hover:text-white transition-colors">Register</a>
              </div>
            </div>
            
            <Link to="/admin" className="btn-secondary">Admin Dashboard</Link>
            <a href="#book-now" className="btn-primary">Book Now</a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-charcoal focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-charcoal hover:text-primary font-medium transition-colors">Home</a>
              <a href="#vehicles" className="text-charcoal hover:text-primary font-medium transition-colors">Vehicles</a>
              <a href="#about" className="text-charcoal hover:text-primary font-medium transition-colors">About</a>
              <a href="#testimonials" className="text-charcoal hover:text-primary font-medium transition-colors">Testimonials</a>
              <a href="#contact" className="text-charcoal hover:text-primary font-medium transition-colors">Contact</a>
              <a href="#" className="text-charcoal hover:text-primary font-medium transition-colors">Sign In</a>
              <a href="#" className="text-charcoal hover:text-primary font-medium transition-colors">Register</a>
              <Link to="/admin" className="text-charcoal hover:text-primary font-medium transition-colors">Admin Dashboard</Link>
              <a href="#book-now" className="btn-primary inline-block text-center">Book Now</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
