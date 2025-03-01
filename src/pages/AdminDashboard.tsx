// AdminDashboard.tsx
import { useState, useMemo } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  CalendarRange,
  Car,
  Users,
  DollarSign,
  Map,
  PlusCircle,
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Driver } from "@/data/drivers";
import driversData from "@/data/drivers";
import vehiclesData, { Vehicle } from "@/data/vehicles";

interface Booking {
  id: string;
  vehicleId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  withDriver: boolean;
  status: "pending" | "approved" | "rejected" | "completed";
  totalAmount: number;
  driverId?: string;
  notes?: string;
  createdAt: string;
}

const initialBookings: Booking[] = [
  {
    id: "B12345",
    vehicleId: 1,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+254 712 345 678",
    startDate: "2023-06-15T08:00:00",
    endDate: "2023-06-18T18:00:00",
    withDriver: true,
    status: "completed",
    totalAmount: 45000,
    driverId: "d1",
    notes: "Airport pickup required",
    createdAt: "2023-06-10T14:23:00",
  },
  {
    id: "B12346",
    vehicleId: 3,
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+254 723 456 789",
    startDate: "2023-06-20T09:00:00",
    endDate: "2023-06-25T17:00:00",
    withDriver: true,
    status: "approved",
    driverId: "d2",
    totalAmount: 100000,
    notes: "",
    createdAt: "2023-06-12T10:15:00",
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();

  // State Management
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [drivers, setDrivers] = useState<Driver[]>(driversData);
  const [vehicles, setVehicles] = useState<Vehicle[]>(vehiclesData);
  const [editDriverDialog, setEditDriverDialog] = useState(false);
  const [addDriverDialog, setAddDriverDialog] = useState(false);
  const [viewDriverProfileDialog, setViewDriverProfileDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null); // Kept for consistency, though not used
  const [editedDriver, setEditedDriver] = useState<Partial<Driver>>({});
  const [newDriver, setNewDriver] = useState<Partial<Driver>>({
    available: true,
    rating: 0,
    status: "active",
    totalTrips: 0,
  });
  const [searchTerms, setSearchTerms] = useState({
    bookings: "",
    vehicles: "",
    drivers: "",
  });

  // Memoized Filtered Data
  const filteredBookings = useMemo(() =>
    bookings.filter((b) =>
      [b.customerName, b.customerEmail, b.id].some((field) =>
        field.toLowerCase().includes(searchTerms.bookings.toLowerCase())
      )
    ),
    [bookings, searchTerms.bookings]
  );

  const filteredVehicles = useMemo(() =>
    vehicles.filter((v) =>
      [v.name, v.model, v.type].some((field) =>
        field.toLowerCase().includes(searchTerms.vehicles.toLowerCase())
      )
    ),
    [vehicles, searchTerms.vehicles]
  );

  const filteredDrivers = useMemo(() =>
    drivers.filter((d) =>
      [d.name, d.phone, d.license].some((field) =>
        field.toLowerCase().includes(searchTerms.drivers.toLowerCase())
      )
    ),
    [drivers, searchTerms.drivers]
  );

  // Utility Functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getVehicleDetails = (vehicleId: number) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle ? `${vehicle.name} ${vehicle.model}` : "Unknown Vehicle";
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const variants: Record<Booking["status"], string> = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge variant="outline" className={`${variants[status]} hover:bg-${variants[status].split(" ")[0]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Handler Functions
  const handleSearch = (type: keyof typeof searchTerms, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [type]: value }));
  };

  const toggleAvailability = (type: "driver" | "vehicle", id: string | number) => {
    if (type === "driver") {
      setDrivers((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, available: !d.available } : d
        )
      );
      const driver = drivers.find((d) => d.id === id);
      toast({
        title: "Driver Status Updated",
        description: `${driver?.name} is now ${driver?.available ? "unavailable" : "available"}.`,
      });
    } else {
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
    }
  };

  const handleEditDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setEditedDriver(driver);
    setEditDriverDialog(true);
  };

  const handleSaveDriver = () => {
    if (!selectedDriver) return;
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === selectedDriver.id ? { ...d, ...editedDriver } : d
      )
    );
    toast({
      title: "Driver Updated",
      description: `${editedDriver.name}'s details have been updated.`,
    });
    setEditDriverDialog(false);
  };

  const handleAddDriver = () => {
    setAddDriverDialog(true);
  };

  const handleSaveNewDriver = () => {
    if (!newDriver.name || !newDriver.phone || !newDriver.license || !newDriver.avatar) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Phone, License, Avatar).",
        variant: "destructive",
      });
      return;
    }

    const newDriverData: Driver = {
      id: `d${drivers.length + 1}`,
      name: newDriver.name,
      phone: newDriver.phone,
      license: newDriver.license,
      available: newDriver.available ?? true,
      rating: newDriver.rating ?? 0,
      avatar: newDriver.avatar,
      email: newDriver.email || "",
      status: newDriver.status ?? "active",
      hireDate: new Date().toISOString().split("T")[0],
      totalTrips: newDriver.totalTrips ?? 0,
      lastActive: new Date().toISOString().split("T")[0],
      emergencyContact: newDriver.emergencyContact || "",
    };

    setDrivers((prev) => [...prev, newDriverData]);
    toast({
      title: "Driver Added",
      description: `${newDriver.name} has been added successfully.`,
    });
    setAddDriverDialog(false);
    setNewDriver({ available: true, rating: 0, status: "active", totalTrips: 0 });
  };

  const handleViewDriverProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setViewDriverProfileDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Fleet Management Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Bookings", icon: CalendarRange, value: bookings.length },
            { title: "Available Vehicles", icon: Car, value: vehicles.filter((v) => v.available).length },
            { title: "Available Drivers", icon: Users, value: drivers.filter((d) => d.available).length },
            { title: "Total Revenue", icon: DollarSign, value: `KES ${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}` },
          ].map((stat) => (
            <Card key={stat.title} className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <stat.icon className="w-6 h-6 text-blue-500 mr-3" />
                <span className="text-2xl font-semibold text-gray-800">{stat.value}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-200 p-1 rounded-lg">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-white">Bookings</TabsTrigger>
            <TabsTrigger value="vehicles" className="data-[state=active]:bg-white">Vehicles</TabsTrigger>
            <TabsTrigger value="drivers" className="data-[state=active]:bg-white">Drivers</TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-white">Live Tracking</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Bookings</CardTitle>
                    <CardDescription>View and manage customer bookings</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search bookings..."
                        className="pl-10"
                        value={searchTerms.bookings}
                        onChange={(e) => handleSearch("bookings", e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Booking
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">No bookings found</TableCell>
                      </TableRow>
                    ) : (
                      filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{getVehicleDetails(booking.vehicleId)}</TableCell>
                          <TableCell>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>KES {booking.totalAmount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {booking.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="mr-2"
                                onClick={() => toast({ title: "Review Booking", description: "Review functionality to be implemented" })}
                              >
                                Review
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Vehicles</CardTitle>
                    <CardDescription>Manage your vehicle fleet</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search vehicles..."
                        className="pl-10"
                        value={searchTerms.vehicles}
                        onChange={(e) => handleSearch("vehicles", e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price/Day</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500">No vehicles found</TableCell>
                      </TableRow>
                    ) : (
                      filteredVehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell>{vehicle.name} {vehicle.model}</TableCell>
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
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleAvailability("vehicle", vehicle.id)}
                            >
                              {vehicle.available ? (
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                              ) : (
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              )}
                              Toggle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drivers Tab */}
          <TabsContent value="drivers">
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Drivers</CardTitle>
                    <CardDescription>Manage your drivers</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search drivers..."
                        className="pl-10"
                        value={searchTerms.drivers}
                        onChange={(e) => handleSearch("drivers", e.target.value)}
                      />
                    </div>
                    <Button variant="outline" onClick={handleAddDriver}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Driver
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">No drivers found</TableCell>
                      </TableRow>
                    ) : (
                      filteredDrivers.map((driver) => (
                        <TableRow key={driver.id}>
                          <TableCell>
                            <img
                              src={driver.avatar}
                              alt={`${driver.name}'s avatar`}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </TableCell>
                          <TableCell>{driver.name}</TableCell>
                          <TableCell>{driver.phone}</TableCell>
                          <TableCell>{driver.license}</TableCell>
                          <TableCell>{driver.rating} ★</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={driver.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {driver.available ? "Available" : "Unavailable"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleAvailability("driver", driver.id)}
                              >
                                {driver.available ? (
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                ) : (
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                )}
                                Toggle
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditDriver(driver)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewDriverProfile(driver)}
                              >
                                View Profile
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Driver Dialog */}
            <Dialog open={editDriverDialog} onOpenChange={setEditDriverDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Driver Details</DialogTitle>
                  <DialogDescription>Update driver information</DialogDescription>
                </DialogHeader>
                {selectedDriver && (
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="avatar">Avatar Preview</Label>
                      <img
                        src={editedDriver.avatar || selectedDriver.avatar}
                        alt="Driver avatar"
                        className="w-16 h-16 rounded-full object-cover mt-1 mb-2"
                      />
                      <Input
                        id="avatar"
                        type="text"
                        placeholder="Enter avatar URL"
                        value={editedDriver.avatar || ""}
                        onChange={(e) => setEditedDriver({ ...editedDriver, avatar: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editedDriver.name || ""}
                        onChange={(e) => setEditedDriver({ ...editedDriver, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editedDriver.phone || ""}
                        onChange={(e) => setEditedDriver({ ...editedDriver, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="license">License</Label>
                      <Input
                        id="license"
                        value={editedDriver.license || ""}
                        onChange={(e) => setEditedDriver({ ...editedDriver, license: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={editedDriver.email || ""}
                        onChange={(e) => setEditedDriver({ ...editedDriver, email: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditDriverDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveDriver}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Add Driver Dialog */}
            <Dialog open={addDriverDialog} onOpenChange={setAddDriverDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Driver</DialogTitle>
                  <DialogDescription>Enter details for the new driver</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="new-avatar">Avatar URL <span className="text-red-500">*</span></Label>
                    <Input
                      id="new-avatar"
                      type="text"
                      placeholder="Enter avatar URL"
                      value={newDriver.avatar || ""}
                      onChange={(e) => setNewDriver({ ...newDriver, avatar: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-name">Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="new-name"
                      value={newDriver.name || ""}
                      onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-phone">Phone <span className="text-red-500">*</span></Label>
                    <Input
                      id="new-phone"
                      value={newDriver.phone || ""}
                      onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-license">License <span className="text-red-500">*</span></Label>
                    <Input
                      id="new-license"
                      value={newDriver.license || ""}
                      onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-email">Email</Label>
                    <Input
                      id="new-email"
                      value={newDriver.email || ""}
                      onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDriverDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNewDriver}>Add Driver</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Driver Profile Dialog */}
            <Dialog open={viewDriverProfileDialog} onOpenChange={setViewDriverProfileDialog}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Driver Profile: {selectedDriver?.name}</DialogTitle>
                  <DialogDescription>View driver trip history</DialogDescription>
                </DialogHeader>
                {selectedDriver && (
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>Total Trips</Label>
                      <p className="text-gray-800">{selectedDriver.totalTrips}</p>
                    </div>
                    <div>
                      <Label>Trip History</Label>
                      {bookings
                        .filter((b) => b.driverId === selectedDriver.id && b.status === "completed")
                        .length === 0 ? (
                        <p className="text-gray-500">No completed trips</p>
                      ) : (
                        <ul className="list-disc pl-5">
                          {bookings
                            .filter((b) => b.driverId === selectedDriver.id && b.status === "completed")
                            .map((trip) => (
                              <li key={trip.id} className="text-gray-800">
                                {getVehicleDetails(trip.vehicleId)} - {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setViewDriverProfileDialog(false)}>
                    Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Live Tracking</CardTitle>
                <CardDescription>Real-time fleet monitoring (coming soon)</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-64">
                <Map className="h-16 w-16 text-gray-400" />
                <p className="ml-4 text-gray-500">Tracking feature under development</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;