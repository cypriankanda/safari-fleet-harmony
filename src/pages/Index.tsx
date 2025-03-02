
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedVehicles from '../components/FeaturedVehicles';
import VehicleCatalog from '../components/VehicleCatalog';
import Testimonials from '../components/Testimonials';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Index = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  // Demo login credentials
  const demoCredentials = {
    email: 'admin@psk.com',
    password: 'admin123'
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if credentials match demo credentials
    if (formData.email === demoCredentials.email && formData.password === demoCredentials.password) {
      toast.success('Login successful! Redirecting to admin dashboard...');
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
      setShowLoginDialog(false);
    } else {
      toast.error('Invalid credentials. Use the demo credentials provided.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    // Listen for admin login requests
    const handleAdminLoginRequest = () => {
      setShowLoginDialog(true);
    };

    window.addEventListener('admin-login-request', handleAdminLoginRequest);

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

    return () => {
      window.removeEventListener('admin-login-request', handleAdminLoginRequest);
    };
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

      {/* Admin Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
            <DialogDescription>
              Use the demo credentials to access the admin dashboard.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                placeholder="admin@psk.com" 
                value={formData.email} 
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                type="password" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="bg-muted p-3 rounded-md text-sm">
              <strong>Demo credentials:</strong><br/>
              Email: {demoCredentials.email}<br/>
              Password: {demoCredentials.password}
            </div>
            
            <DialogFooter className="sm:justify-between flex flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setShowLoginDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Login</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
