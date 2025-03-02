
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Map, RefreshCw, Truck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  driver: string;
  location: string;
  lastUpdated: string;
}

const LiveTrackingTab = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  // Sample data for vehicles
  const vehicles: Vehicle[] = [
    { 
      id: "v1", 
      name: "Safari Land Cruiser", 
      licensePlate: "KBZ 123X", 
      driver: "John Doe", 
      location: "Nairobi National Park", 
      lastUpdated: "2 minutes ago" 
    },
    { 
      id: "v2", 
      name: "Tour Van", 
      licensePlate: "KCE 456Y", 
      driver: "Jane Smith", 
      location: "Maasai Mara Reserve", 
      lastUpdated: "5 minutes ago" 
    },
    { 
      id: "v3", 
      name: "Airport Shuttle", 
      licensePlate: "KDF 789Z", 
      driver: "Michael Johnson", 
      location: "JKIA Airport", 
      lastUpdated: "10 minutes ago" 
    }
  ];

  return (
    <Card className="shadow-md overflow-hidden border-0">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-xl">Live Tracking</CardTitle>
            <CardDescription>Track your fleet in real-time</CardDescription>
          </div>
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh Data
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
          {/* Vehicle List */}
          <div className="border-r overflow-y-auto h-full">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium text-gray-700">Active Vehicles</h3>
            </div>
            <div className="divide-y">
              {vehicles.map((vehicle) => (
                <div 
                  key={vehicle.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedVehicle?.id === vehicle.id ? 'bg-gray-100' : ''}`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Truck className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{vehicle.name}</h4>
                        <p className="text-sm text-gray-500">{vehicle.licensePlate}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{vehicle.lastUpdated}</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Driver:</span> {vehicle.driver}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {vehicle.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Map Area */}
          <div className="col-span-2 relative">
            {selectedVehicle ? (
              <div className="h-full">
                <div className="absolute top-4 left-4 z-10 bg-white p-3 rounded-md shadow-md">
                  <h3 className="font-medium text-gray-800">{selectedVehicle.name}</h3>
                  <p className="text-sm text-gray-600">Current location: {selectedVehicle.location}</p>
                </div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036281522!2d36.70731848863105!3d-1.3032079339132795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1676418011226!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Map className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Select a Vehicle to Track</h3>
                <p className="text-gray-500 max-w-md">
                  Click on a vehicle from the list to view its current location and tracking details on the map.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTrackingTab;
