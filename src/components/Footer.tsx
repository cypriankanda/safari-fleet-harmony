
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-16 pb-8" id="contact">
      <div className="safari-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-6">
              PSK <span className="text-secondary">Safaris</span>
            </h3>
            <p className="mb-6 text-white/80">
              Premier car hire service in Eldoret, Kenya. 
              Providing reliable transportation solutions 
              for both business and leisure travelers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center text-white/80 hover:text-secondary transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#vehicles" className="flex items-center text-white/80 hover:text-secondary transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Vehicles</span>
                </a>
              </li>
              <li>
                <a href="#about" className="flex items-center text-white/80 hover:text-secondary transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#testimonials" className="flex items-center text-white/80 hover:text-secondary transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Testimonials</span>
                </a>
              </li>
              <li>
                <a href="#book-now" className="flex items-center text-white/80 hover:text-secondary transition-colors">
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span>Book Now</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  123 Uganda Road, Eldoret, Kenya
                </span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  +254 7XX XXX XXX
                </span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  info@psksafaris.com
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-6">Newsletter</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for updates on new vehicles, 
              special offers, and travel tips.
            </p>
            <form className="space-y-3">
              <div>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="form-input w-full bg-primary-600 border-primary-400 text-white placeholder:text-white/60 focus:ring-secondary"
                />
              </div>
              <button 
                type="submit" 
                className="bg-secondary hover:bg-secondary-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-primary-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              &copy; {currentYear} PSK Safaris. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
