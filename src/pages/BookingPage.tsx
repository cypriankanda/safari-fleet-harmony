
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "@/components/BookingForm";
import { Vehicle } from "@/data/vehicles";
import vehicles from "@/data/vehicles";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Check, X, Calendar, Users, Fuel, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of vehicle data
    const timer = setTimeout(() => {
      if (id) {
        const vehicleId = parseInt(id);
        const foundVehicle = vehicles.find(v => v.id === vehicleId);
        setVehicle(foundVehicle || null);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 w-40 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the vehicle you're looking for.</p>
        <Button onClick={() => navigate('/vehicles')}>View All Vehicles</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="safari-container">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="h-64 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${vehicle.image})` }}
              ></div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{vehicle.name} {vehicle.model}</h1>
                <div className="flex items-center mb-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${vehicle.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {vehicle.available ? 'Available' : 'Currently Unavailable'}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">{vehicle.year}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-gray-600">{vehicle.type}</span>
                </div>

                <p className="text-gray-700 mb-6">{vehicle.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <Users className="w-5 h-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600">Seats</span>
                    <span className="font-medium">{vehicle.seats}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <Settings className="w-5 h-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600">Transmission</span>
                    <span className="font-medium">{vehicle.transmission}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <Fuel className="w-5 h-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600">Fuel</span>
                    <span className="font-medium">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-slate-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600">Year</span>
                    <span className="font-medium">{vehicle.year}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold mb-3">Features & Amenities</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {vehicle.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <BookingForm vehicle={vehicle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
