
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedVehicles from '../components/FeaturedVehicles';
import VehicleCatalog from '../components/VehicleCatalog';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedVehicles />
      <VehicleCatalog />
      <AboutSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
