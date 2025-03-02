
import { useState, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  CalendarRange, 
  Search, 
  PlusCircle, 
  FilterX, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { Booking } from "./types";
import { Driver } from "@/data/drivers";
import { Vehicle } from "@/data/vehicles";

interface BookingsTabProps {
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
  vehicles: Vehicle[];
}

const BookingsTab = ({ 
  bookings, 
  setBookings, 
  drivers, 
  setDrivers, 
  vehicles 
}: BookingsTabProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Booking["status"] | "all">("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [assignDriverDialog, setAssignDriverDialog] = useState(false);

  // Memoized Filtered Bookings
  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((b) =>
        [b.customerName, b.customerEmail, b.id].some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }
    
    return filtered;
  }, [bookings, searchTerm, statusFilter]);

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
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleStatusFilter = (status: Booking["status"] | "all") => {
    setStatusFilter(status);
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

  return (
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
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
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
                      {(searchTerm || statusFilter !== "all") && (
                        <Button
                          variant="link"
                          onClick={() => {
                            setSearchTerm("");
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
      
      {/* Assign Driver Dialog */}
      <Dialog open={assignDriverDialog} onOpenChange={setAssignDriverDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Driver to Booking</DialogTitle>
            <DialogDescription>
              Select a driver to assign to this booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {availableDrivers.length > 0 ? (
              availableDrivers.map(driver => (
                <Button 
                  key={driver.id} 
                  variant="outline" 
                  className="justify-start h-auto py-3"
                  onClick={() => handleAssignDriver(driver.id)}
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-3">
                      <img
                        src={driver.avatar}
                        alt={`${driver.name}'s avatar`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-gray-500">Rating: {driver.rating} • {driver.totalTrips} trips</div>
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No available drivers found.</p>
                <p className="text-sm mt-1">All drivers are currently assigned to other bookings.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDriverDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BookingsTab;
