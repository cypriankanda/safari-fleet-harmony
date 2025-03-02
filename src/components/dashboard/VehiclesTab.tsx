
import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Car,
  Search, 
  PlusCircle, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { Vehicle } from "@/data/vehicles";

interface VehiclesTabProps {
  vehicles: Vehicle[];
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>;
}

const VehiclesTab = ({ vehicles, setVehicles }: VehiclesTabProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered vehicles based on search term
  const filteredVehicles = vehicles.filter((v) =>
    [v.name, v.model, v.type].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Toggle vehicle availability
  const toggleAvailability = (id: number) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, available: !v.available } : v
      )
    );
    
    const vehicle = vehicles.find((v) => v.id === id);
    toast({
      title: "Vehicle Status Updated",
      description: `${vehicle?.name} ${vehicle?.model} is now ${vehicle?.available ? "unavailable" : "available"}.`,
    });
  };

  return (
    <Card className="shadow-md overflow-hidden border-0">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-xl">Vehicles</CardTitle>
            <CardDescription>Manage your vehicle fleet</CardDescription>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search vehicles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price/Day</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    <div className="flex flex-col items-center justify-center">
                      <Car className="h-12 w-12 text-gray-300 mb-2" />
                      <p>No vehicles found</p>
                      {searchTerm && (
                        <Button
                          variant="link"
                          onClick={() => setSearchTerm("")}
                          className="mt-2"
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder.svg";
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{vehicle.name} {vehicle.model}</p>
                          <p className="text-xs text-gray-500">{vehicle.year}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>KES {vehicle.pricePerDay.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={vehicle.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {vehicle.available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className={vehicle.available ? "hover:bg-red-50" : "hover:bg-green-50"}
                          onClick={() => toggleAvailability(vehicle.id)}
                        >
                          {vehicle.available ? (
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          ) : (
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          )}
                          {vehicle.available ? "Mark Unavailable" : "Mark Available"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehiclesTab;
