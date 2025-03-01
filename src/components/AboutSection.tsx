
import { CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

const AboutSection = () => {
  const benefits = [
    "Well-maintained fleet of premium vehicles",
    "Professional and experienced drivers",
    "GPS tracking for all vehicles",
    "Flexible rental terms",
    "24/7 customer support",
    "Comprehensive insurance coverage"
  ];
  
  return (
    <section className="py-16 bg-white" id="about">
      <div className="safari-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="animate-fade-up">
            <h2 className="section-heading">About PSK Safaris</h2>
            <p className="text-charcoal-light mb-6">
              PSK Safaris is a premier car hire service based in Eldoret, Kenya, 
              providing reliable and professional transportation solutions for individuals, 
              families, and businesses. With years of experience in the industry, we've 
              built a reputation for excellence through our commitment to quality service, 
              well-maintained vehicles, and customer satisfaction.
            </p>
            <p className="text-charcoal-light mb-8">
              Our fleet ranges from economical sedans to luxury SUVs, ensuring we have 
              the perfect vehicle for your needs. Whether you're exploring the natural 
              beauty of Kenya, handling business travel, or attending special events, 
              PSK Safaris delivers a seamless rental experience.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 mr-2" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            
            {/* Contact Info */}
            <div className="bg-muted rounded-xl p-6">
              <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Main Office</p>
                    <p className="text-charcoal-light">123 Uganda Road, Eldoret, Kenya</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-charcoal-light">+254 7XX XXX XXX</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-charcoal-light">info@psksafaris.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Image */}
          <div className="relative animate-fade-up-slow">
            <div className="safari-card p-3 h-full">
              <img 
                src="https://images.unsplash.com/photo-1627059549410-854c37240710?q=80&w=1974&auto=format&fit=crop" 
                alt="PSK Safaris Team" 
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 md:bottom-6 md:left-6 bg-white rounded-xl shadow-safari p-4 w-40">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-charcoal-light">Years Experience</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 md:top-6 md:right-6 bg-white rounded-xl shadow-safari p-4 w-40">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">100%</div>
                <div className="text-sm text-charcoal-light">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
