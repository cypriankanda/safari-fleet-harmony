
import { useState } from 'react';
import { ChevronRight, Users, Calendar, Fuel, ArrowRight, Check } from 'lucide-react';
import type { Vehicle } from '../data/vehicles';

interface VehicleCardProps {
  vehicle: Vehicle;
  featured?: boolean;
}

const VehicleCard = ({ vehicle, featured = false }: VehicleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div 
      className={`safari-card overflow-hidden ${featured ? 'group' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={vehicle.image} 
          alt={`${vehicle.name} ${vehicle.model}`}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Vehicle Type Badge */}
        <div className="absolute top-4 left-4 bg-secondary/90 text-white text-sm font-medium px-3 py-1 rounded-full">
          {vehicle.type}
        </div>
        
        {/* Availability Badge */}
        {!vehicle.available && (
          <div className="absolute top-4 right-4 bg-charcoal/80 text-white text-sm font-medium px-3 py-1 rounded-full">
            Currently Booked
          </div>
        )}
        
        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-charcoal font-montserrat font-bold px-4 py-2 rounded-lg shadow-md">
          <div className="text-xs uppercase opacity-70">Per Day</div>
          <div className="text-lg">{formatPrice(vehicle.pricePerDay)}</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold font-montserrat mb-2 flex items-center justify-between">
          <span>{vehicle.name} {vehicle.model}</span>
          {featured && <ChevronRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />}
        </h3>
        
        {/* Features */}
        <div className="flex flex-wrap gap-y-3 mb-4">
          <div className="w-1/2 flex items-center text-sm text-charcoal-light">
            <Users className="mr-2 w-4 h-4 text-primary" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="w-1/2 flex items-center text-sm text-charcoal-light">
            <Calendar className="mr-2 w-4 h-4 text-primary" />
            <span>{vehicle.year}</span>
          </div>
          <div className="w-1/2 flex items-center text-sm text-charcoal-light">
            <Fuel className="mr-2 w-4 h-4 text-primary" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="w-1/2 flex items-center text-sm text-charcoal-light">
            <svg className="mr-2 w-4 h-4 text-primary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 13.707l-2.707-2.707-1.414 1.414 4.121 4.121 8.5-8.5-1.414-1.414z" />
            </svg>
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        
        {/* Key Features */}
        {featured && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-charcoal mb-2">Key Features:</div>
            <div className="grid grid-cols-2 gap-y-1 gap-x-2">
              {vehicle.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-charcoal-lighter">
                  <Check className="mr-1 w-3 h-3 text-primary flex-shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA */}
        <div className={`flex ${featured ? 'justify-between' : 'justify-end'} items-center mt-4`}>
          {featured && (
            <div className="text-sm font-semibold text-charcoal">
              {vehicle.available ? (
                <span className="text-primary">Available Now</span>
              ) : (
                <span className="text-charcoal-light">Currently Booked</span>
              )}
            </div>
          )}
          
          <a
            href="#"
            className={`
              inline-flex items-center text-sm font-semibold 
              ${vehicle.available ? 'text-secondary hover:text-secondary-600' : 'text-charcoal-light cursor-not-allowed'} 
              transition-colors
            `}
          >
            {vehicle.available ? 'View Details' : 'Check Later'}
            <ArrowRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
