
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
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
  ChevronLeft,
  FilterX,
  Sparkles,
  Activity,
  RefreshCw,
} from "lucide-react";
import { Driver } from "@/data/drivers";
import driversData from "@/data/drivers";
import vehiclesData, { Vehicle } from "@/data/vehicles";
import ChatBot from "@/components/ChatBot";

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
  {
    id: "B12347",
    vehicleId: 2,
    customerName: "David Kimani",
    customerEmail: "david@example.com",
    customerPhone: "+254 734 567 890",
    startDate: "2023-07-01T10:00:00",
    endDate: "2023-07-05T16:00:00",
    withDriver: true,
    status: "pending",
    totalAmount: 60000,
    notes: "Business trip",
    createdAt: "2023-06-25T09:30:00",
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
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [assignDriverDialog, setAssignDriverDialog] = useState(false);
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
  const [statusFilter, setStatusFilter] = useState<Booking["status"] | "all">("all");
  const [refreshAnimation, setRefreshAnimation] = useState(false);

  // Added for UI enhancements
  const [activeTab, setActiveTab] = useState("bookings");
  
  // Animate data refresh
  const refreshData = () => {
    setRefreshAnimation(true);
    setTimeout(() => {
      setRefreshAnimation(false);
      toast({
        title: "Data Refreshed",
        description: "Latest fleet data has been loaded.",
      });
    }, 1000);
  };

  // Memoized Filtered Data
  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    
    // Apply search filter
    if (searchTerms.bookings) {
      filtered = filtered.filter((b) =>
        [b.customerName, b.customerEmail, b.id].some((field) =>
          field.toLowerCase().includes(searchTerms.bookings.toLowerCase())
        )
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }
    
    return filtered;
  }, [bookings, searchTerms.bookings, statusFilter]);

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

  // Get available drivers for assignment
  const availableDrivers = useMemo(() => 
    drivers.filter(d => d.available),
    [drivers]
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

  const getDriverDetails = (driverId?: string) => {
    if (!driverId) return "None";
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? driver.name : "Unknown Driver";
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const variants: Record<Booking["status"], { bg: string, icon: React.ComponentType }> = {
      pending: { bg: "bg-yellow-100 text-yellow-800", icon: CalendarRange },
      approved: { bg: "bg-green-100 text-green-800", icon: CheckCircle2 },
      rejected: { bg: "bg-red-100 text-red-800", icon: XCircle },
      completed: { bg: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
    };
    
    const { bg, icon: Icon } = variants[status];
    
    return (
      <Badge variant="outline" className={`${bg} hover:${bg} flex items-center space-x-1`}>
        <Icon className="h-3.5 w-3.5 mr-1" />
        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
      </Badge>
    );
  };

  // Handler Functions
  const handleSearch = (type: keyof typeof searchTerms, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [type]: value }));
  };

  const handleStatusFilter = (status: Booking["status"] | "all") => {
    setStatusFilter(status);
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

  const handleReviewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    if (booking.withDriver && !booking.driverId) {
      setAssignDriverDialog(true);
    } else {
      // Handle regular booking review
      toast({
        title: "Review Booking",
        description: "Review functionality to be implemented",
      });
    }
  };

  const handleAssignDriver = (driverId: string) => {
    if (!selectedBooking) return;
    
    // Update booking with assigned driver
    setBookings(prev => 
      prev.map(b => 
        b.id === selectedBooking.id 
          ? { ...b, driverId, status: "approved" } 
          : b
      )
    );
    
    // Update driver availability
    setDrivers(prev => 
      prev.map(d => 
        d.id === driverId ? { ...d, available: false } : d
      )
    );
    
    toast({
      title: "Driver Assigned",
      description: `The driver has been assigned and booking approved.`,
    });
    
    setAssignDriverDialog(false);
  };

  // Effect to change tab when user clicks on tabs
  useEffect(() => {
    const handleTabChange = (value: string) => {
      setActiveTab(value);
    };
    
    // Add event listener for tab changes
    document.querySelectorAll('[role="tab"]').forEach(tab => {
      tab.addEventListener('click', () => {
        const value = tab.getAttribute('data-value');
        if (value) handleTabChange(value);
      });
    });
    
    return () => {
      // Clean up
      document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 flex-1">Fleet Management Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={refreshData}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshAnimation ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Stats Overview with improved UI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Bookings", icon: CalendarRange, value: bookings.length, color: "bg-blue-500" },
            { title: "Available Vehicles", icon: Car, value: vehicles.filter((v) => v.available).length, color: "bg-green-500" },
            { title: "Available Drivers", icon: Users, value: drivers.filter((d) => d.available).length, color: "bg-purple-500" },
            { title: "Total Revenue", icon: DollarSign, value: `KES ${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`, color: "bg-orange-500" },
          ].map((stat, index) => (
            <Card key={stat.title} className="shadow-md overflow-hidden border-0 transition-all duration-300 hover:shadow-lg relative">
              <div className={`absolute top-0 left-0 w-1.5 h-full ${stat.color}`}></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 mr-3`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color.split('-')[1]}-600`} />
                </div>
                <span className="text-2xl font-semibold text-gray-800">{stat.value}</span>
              </CardContent>
              <div className="absolute bottom-3 right-3">
                <Activity className="w-5 h-5 text-gray-300" />
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs with improved UI */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg border">
            <TabsTrigger 
              value="bookings" 
              data-value="bookings"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <CalendarRange className="mr-2 h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="vehicles" 
              data-value="vehicles"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Car className="mr-2 h-4 w-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger 
              value="drivers" 
              data-value="drivers"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Users className="mr-2 h-4 w-4" />
              Drivers
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              data-value="map"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <Map className="mr-2 h-4 w-4" />
              Live Tracking
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card className="shadow-md overflow-hidden border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                  <div>
                    <CardTitle className="text-xl">Bookings</CardTitle>
                    <CardDescription>View and manage customer bookings</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex space-x-2 text-sm">
                      {['all', 'pending', 'approved', 'rejected', 'completed'].map((status) => (
                        <Button 
                          key={status}
                          size="sm"
                          variant={statusFilter === status ? "default" : "outline"}
                          className={
                            statusFilter === status 
                              ? `bg-${status === 'all' ? 'blue' : status === 'pending' ? 'yellow' : status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'blue'}-600`
                              : ""
                          }
                          onClick={() => handleStatusFilter(status as Booking["status"] | "all")}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                      {statusFilter !== "all" && (
                        <Button 
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusFilter("all")}
                          className="pl-1"
                        >
                          <FilterX className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="relative w-full md:w-64">
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
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                            <div className="flex flex-col items-center justify-center">
                              <CalendarRange className="h-12 w-12 text-gray-300 mb-2" />
                              <p>No bookings found</p>
                              {(searchTerms.bookings || statusFilter !== "all") && (
                                <Button
                                  variant="link"
                                  onClick={() => {
                                    setSearchTerms((prev) => ({ ...prev, bookings: "" }));
                                    setStatusFilter("all");
                                  }}
                                  className="mt-2"
                                >
                                  Clear filters
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBookings.map((booking) => (
                          <TableRow key={booking.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{booking.customerName}</span>
                                <span className="text-xs text-gray-500">{booking.customerEmail}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getVehicleDetails(booking.vehicleId)}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="whitespace-nowrap">{formatDate(booking.startDate)}</span>
                                <span className="text-xs text-gray-500 whitespace-nowrap">to {formatDate(booking.endDate)}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {booking.withDriver ? (
                                booking.driverId ? (
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                                      {getDriverDetails(booking.driverId)}
                                    </Badge>
                                  </div>
                                ) : (
                                  <Badge variant="outline" className="bg-red-100 text-red-800">
                                    Driver Requested
                                  </Badge>
                                )
                              ) : (
                                "No Driver"
                              )}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(booking.status)}
                            </TableCell>
                            <TableCell className="font-medium">KES {booking.totalAmount.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                              {booking.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-blue-50"
                                  onClick={() => handleReviewBooking(booking)}
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles">
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
                              {searchTerms.vehicles && (
                                <Button
                                  variant="link"
                                  onClick={() => handleSearch("vehicles", "")}
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
                                  onClick={() => toggleAvailability("vehicle", vehicle.id)}
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
          </TabsContent>

          {/* Drivers Tab */}
          <TabsContent value="drivers">
            <Card className="shadow-md overflow-hidden border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                  <div>
                    <CardTitle className="text-xl">Drivers</CardTitle>
                    <CardDescription>Manage your drivers</CardDescription>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="relative w-full md:w-64">
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
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-gray-50">
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
                          <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                            <div className="flex flex-col items-center justify-center">
                              <Users className="h-12 w-12 text-gray-300 mb-2" />
                              <p>No drivers found</p>
                              {searchTerms.drivers && (
                                <Button
                                  variant="link"
                                  onClick={() => handleSearch("drivers", "")}
                                  className="mt-2"
                                >
                                  Clear search
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDrivers.map((driver) => (
                          <TableRow key={driver.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                <img
                                  src={driver.avatar}
                                  alt={`${driver.name}'s avatar`}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                                  }}
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{driver.name}</TableCell>
                            <TableCell>{driver.phone}</TableCell>
                            <TableCell>{driver.license}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <span className="mr-1">{driver.rating}</span>
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                              </div>
                            </TableCell>
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
                                  className="hover:bg-blue-50"
                                  onClick={() => handleViewDriverProfile(driver)}
                                >
                                  View
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="hover:bg-amber-50"
                                  onClick={() => handleEditDriver(driver)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className={driver.available ? "hover:bg-red-50" : "hover:bg-green-50"}
                                  onClick={() => toggleAvailability("driver", driver.id)}
                                >
                                  {driver.available ? "Mark Busy" : "Mark Available"}
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
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map">
            <Card className="shadow-md overflow-hidden border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Live Vehicle Tracking</CardTitle>
                    <CardDescription>Track your vehicles in real-time</CardDescription>
                  </div>
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Locations
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gray-100 h-96 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Map className="w-12 h-12 mb-4 mx-auto text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">GPS Tracking Coming Soon</h3>
                    <p className="text-gray-500 max-w-lg">
                      Our live GPS tracking feature is currently in development and will be available soon. 
                      This will allow you to monitor all vehicles in real-time with detailed location data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Chat Bot */}
        <ChatBot />

        {/* Assign Driver Dialog */}
        <Dialog open={assignDriverDialog} onOpenChange={setAssignDriverDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assign Driver to Booking</DialogTitle>
              <DialogDescription>
                Select a driver to assign to booking #{selectedBooking?.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {availableDrivers.length === 0 ? (
                <div className="text-center p-4 bg-gray-50 rounded border">
                  <Users className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No available drivers found</p>
                  <p className="text-sm text-gray-400">All drivers are currently assigned or unavailable</p>
                </div>
              ) : (
                availableDrivers.map((driver) => (
                  <div 
                    key={driver.id} 
                    className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAssignDriver(driver.id)}
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-3">
                      <img
                        src={driver.avatar}
                        alt={`${driver.name}'s avatar`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{driver.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{driver.rating}</span>
                        <Sparkles className="h-3 w-3 text-yellow-500 ml-1 mr-2" />
                        <span>{driver.totalTrips} trips</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Assign</Button>
                  </div>
                ))
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAssignDriverDialog(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Driver Dialog */}
        <Dialog open={editDriverDialog} onOpenChange={setEditDriverDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Driver</DialogTitle>
              <DialogDescription>
                Update driver details below
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedDriver.name || ""}
                  onChange={(e) => setEditedDriver({ ...editedDriver, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedDriver.phone || ""}
                  onChange={(e) => setEditedDriver({ ...editedDriver, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="license">License Number</Label>
                <Input
                  id="license"
                  value={editedDriver.license || ""}
                  onChange={(e) => setEditedDriver({ ...editedDriver, license: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedDriver.email || ""}
                  onChange={(e) => setEditedDriver({ ...editedDriver, email: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDriverDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveDriver}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add New Driver Dialog */}
        <Dialog open={addDriverDialog} onOpenChange={setAddDriverDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Driver</DialogTitle>
              <DialogDescription>
                Enter driver details below to add a new driver
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="newName">Name</Label>
                <Input
                  id="newName"
                  value={newDriver.name || ""}
                  onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPhone">Phone</Label>
                <Input
                  id="newPhone"
                  value={newDriver.phone || ""}
                  onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newLicense">License Number</Label>
                <Input
                  id="newLicense"
                  value={newDriver.license || ""}
                  onChange={(e) => setNewDriver({ ...newDriver, license: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newEmail">Email</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newDriver.email || ""}
                  onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newAvatar">Avatar URL</Label>
                <Input
                  id="newAvatar"
                  value={newDriver.avatar || ""}
                  onChange={(e) => setNewDriver({ ...newDriver, avatar: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
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

        {/* View Driver Profile Dialog */}
        <Dialog open={viewDriverProfileDialog} onOpenChange={setViewDriverProfileDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Driver Profile</DialogTitle>
            </DialogHeader>
            {selectedDriver && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={selectedDriver.avatar}
                      alt={`${selectedDriver.name}'s avatar`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedDriver.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{selectedDriver.rating}</span>
                      <Sparkles className="h-3.5 w-3.5 text-yellow-500 ml-1 mr-2" />
                      <span>{selectedDriver.totalTrips} trips</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{selectedDriver.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{selectedDriver.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">License</p>
                    <p className="font-medium">{selectedDriver.license}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium capitalize">{selectedDriver.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Hire Date</p>
                    <p className="font-medium">{new Date(selectedDriver.hireDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Active</p>
                    <p className="font-medium">{new Date(selectedDriver.lastActive).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <Badge
                    variant="outline"
                    className={selectedDriver.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {selectedDriver.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDriverProfileDialog(false)}>
                Close
              </Button>
              <Button 
                variant="outline" 
                className="hover:bg-amber-50"
                onClick={() => {
                  setViewDriverProfileDialog(false);
                  handleEditDriver(selectedDriver!);
                }}
              >
                Edit Driver
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
