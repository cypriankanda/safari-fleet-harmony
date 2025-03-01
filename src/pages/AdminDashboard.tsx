
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CalendarRange, Car, Users, DollarSign, Map, PlusCircle, Search } from "lucide-react";
import drivers from "@/data/drivers";
import vehicles from "@/data/vehicles";
import { Driver } from "@/data/drivers";

// Mock booking data
const mockBookings = [
  {
    id: "B12345",
    vehicleId: 1,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+254 712 345 678",
    startDate: "2023-06-15T08:00:00",
    endDate: "2023-06-18T18:00:00",
    withDriver: true,
    status: "pending",
    totalAmount: 45000,
    notes: "Airport pickup required",
    createdAt: "2023-06-10T14:23:00"
  },
  {
    id: "B12346",
    vehicleId: 3,
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+254 723 456 789",
    startDate: "2023-06-20T09:00:00",
    endDate: "2023-06-25T17:00:00",
    withDriver: false,
    status: "approved",
    driverId: "d1",
    totalAmount: 100000,
    notes: "",
    createdAt: "2023-06-12T10:15:00"
  },
  {
    id: "B12347",
    vehicleId: 5,
    customerName: "Robert Kimani",
    customerEmail: "robert@example.com",
    customerPhone: "+254 734 567 890",
    startDate: "2023-06-18T10:00:00",
    endDate: "2023-06-19T10:00:00",
    withDriver: false,
    status: "completed",
    totalAmount: 7000,
    notes: "Business trip",
    createdAt: "2023-06-05T09:45:00"
  }
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [assignDriver, setAssignDriver] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const filteredBookings = bookings.filter(booking => 
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVehicleDetails = (vehicleId: number) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.name} ${vehicle.model}` : "Unknown Vehicle";
  };

  const getDriverDetails = (driverId?: string) => {
    if (!driverId) return "Not Assigned";
    const driver = drivers.find(d => d.id === driverId);
    return driver ? driver.name : "Unknown Driver";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApproveBooking = () => {
    if (!selectedBooking) return;
    
    const updatedBookings = bookings.map(booking => {
      if (booking.id === selectedBooking.id) {
        return { 
          ...booking, 
          status: 'approved',
          driverId: selectedBooking.withDriver ? assignDriver : undefined
        };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    setShowDialog(false);
    
    toast({
      title: "Booking Approved",
      description: `Booking ${selectedBooking.id} has been approved successfully.`,
    });
  };

  const handleRejectBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'rejected' };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    
    toast({
      title: "Booking Rejected",
      description: `Booking ${bookingId} has been rejected.`,
    });
  };

  const handleMarkAsCompleted = (bookingId: string) => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingId) {
        return { ...booking, status: 'completed' };
      }
      return booking;
    });
    
    setBookings(updatedBookings);
    
    toast({
      title: "Booking Completed",
      description: `Booking ${bookingId} has been marked as completed.`,
    });
  };

  const availableDrivers = drivers.filter(driver => driver.available);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50">
      <div className="safari-container">
        <h1 className="text-3xl font-bold mb-6">Fleet Management Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CalendarRange className="w-5 h-5 text-primary mr-2" />
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Vehicles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Car className="w-5 h-5 text-primary mr-2" />
                <p className="text-2xl font-bold">{vehicles.filter(v => v.available).length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Available Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="w-5 h-5 text-primary mr-2" />
                <p className="text-2xl font-bold">{drivers.filter(d => d.available).length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                <p className="text-2xl font-bold">KES {bookings.reduce((sum, booking) => sum + booking.totalAmount, 0).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="map">Live Tracking</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Booking
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
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
                        <TableCell colSpan={8} className="text-center">No bookings found</TableCell>
                      </TableRow>
                    ) : (
                      filteredBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{booking.customerName}</div>
                              <div className="text-xs text-muted-foreground">{booking.customerEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getVehicleDetails(booking.vehicleId)}</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>From: {formatDate(booking.startDate)}</div>
                              <div>To: {formatDate(booking.endDate)}</div>
                            </div>
                          </TableCell>
                          <TableCell>{booking.withDriver ? getDriverDetails(booking.driverId) : "Self-Drive"}</TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>KES {booking.totalAmount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            {booking.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8"
                                  onClick={() => {
                                    setSelectedBooking(booking);
                                    setAssignDriver(booking.driverId || "");
                                    setShowDialog(true);
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                  onClick={() => handleRejectBooking(booking.id)}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                            {booking.status === 'approved' && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="h-8"
                                onClick={() => handleMarkAsCompleted(booking.id)}
                              >
                                Mark Completed
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
          
          <TabsContent value="vehicles">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Fleet</CardTitle>
                <CardDescription>Manage your vehicles and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Vehicle management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <CardTitle>Driver Management</CardTitle>
                <CardDescription>Manage your drivers and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Driver management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>GPS Tracking</CardTitle>
                <CardDescription>Live tracking of your fleet</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="text-center p-12">
                  <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">GPS Tracking Module</h3>
                  <p className="text-muted-foreground">
                    The GPS tracking interface will be implemented in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Booking</DialogTitle>
            <DialogDescription>
              Review and approve this booking request.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Customer</Label>
                  <p className="font-medium">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Vehicle</Label>
                  <p className="font-medium">{getVehicleDetails(selectedBooking.vehicleId)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <p className="font-medium">{formatDate(selectedBooking.startDate)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <p className="font-medium">{formatDate(selectedBooking.endDate)}</p>
                </div>
              </div>
              
              {selectedBooking.withDriver && (
                <div>
                  <Label htmlFor="driver-select">Assign Driver</Label>
                  <Select value={assignDriver} onValueChange={setAssignDriver}>
                    <SelectTrigger id="driver-select">
                      <SelectValue placeholder="Select a driver" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDrivers.length === 0 ? (
                        <SelectItem value="none" disabled>No drivers available</SelectItem>
                      ) : (
                        availableDrivers.map((driver: Driver) => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedBooking.notes && (
                <div>
                  <Label className="text-xs text-muted-foreground">Customer Notes</Label>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApproveBooking}
              disabled={selectedBooking?.withDriver && !assignDriver}
            >
              Approve Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
