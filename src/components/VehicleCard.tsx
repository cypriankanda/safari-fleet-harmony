// VehicleCard.tsx
import { Vehicle } from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Fuel, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
  featured?: boolean;
  className?: string; // Added className as an optional prop
}

const VehicleCard = ({ vehicle, featured, className }: VehicleCardProps) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${vehicle.id}`);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group ${className}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} ${vehicle.model}`}
          className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge
            variant="outline"
            className={`${vehicle.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {vehicle.available ? "Available" : "Unavailable"}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{vehicle.name}</h3>
          <span className="text-xl font-semibold text-primary">
            KES {vehicle.pricePerDay.toLocaleString()}
            <span className="text-xs text-gray-500">/day</span>
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-3">{vehicle.model} • {vehicle.year}</p>

        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div className="flex items-center">
            <Users className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <span>{vehicle.seats} Passengers</span>
          </div>
          <div className="flex items-center">
            <Settings className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <span>{vehicle.transmission}</span>
          </div>
          <div className="flex items-center">
            <Fuel className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <span>{vehicle.type}</span>
          </div>
        </div>

        <Button
          onClick={handleBookNow}
          className="w-full"
          variant={vehicle.available ? "default" : "outline"}
          disabled={!vehicle.available}
        >
          {vehicle.available ? "Book Now" : "Currently Unavailable"}
        </Button>
      </div>
    </div>
  );
};

export default VehicleCard;