
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
import { Label } from "@/components/ui/label";
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
  Users,
  Search, 
  PlusCircle, 
  Sparkles,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Driver } from "@/data/drivers";

interface DriversTabProps {
  drivers: Driver[];
  setDrivers: React.Dispatch<React.SetStateAction<Driver[]>>;
}

const DriversTab = ({ drivers, setDrivers }: DriversTabProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [editDriverDialog, setEditDriverDialog] = useState(false);
  const [addDriverDialog, setAddDriverDialog] = useState(false);
  const [viewDriverProfileDialog, setViewDriverProfileDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [editedDriver, setEditedDriver] = useState<Partial<Driver>>({});
  const [newDriver, setNewDriver] = useState<Partial<Driver>>({
    available: true,
    rating: 0,
    status: "active",
    totalTrips: 0,
  });

  // Filtered drivers based on search term
  const filteredDrivers = drivers.filter((d) =>
    [d.name, d.phone, d.license].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Toggle driver availability
  const toggleAvailability = (id: string) => {
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
  };

  // Handler Functions
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                          onClick={() => toggleAvailability(driver.id)}
                        >
                          {driver.available ? (
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          ) : (
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                          )}
                          {driver.available ? "Mark Unavailable" : "Mark Available"}
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

      {/* Edit Driver Dialog */}
      <Dialog open={editDriverDialog} onOpenChange={setEditDriverDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Driver</DialogTitle>
            <DialogDescription>
              Update driver information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={editedDriver.name || ""}
                onChange={(e) => setEditedDriver({...editedDriver, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                value={editedDriver.phone || ""}
                onChange={(e) => setEditedDriver({...editedDriver, phone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="license" className="text-right">
                License
              </Label>
              <Input
                id="license"
                className="col-span-3"
                value={editedDriver.license || ""}
                onChange={(e) => setEditedDriver({...editedDriver, license: e.target.value})}
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

      {/* Add Driver Dialog */}
      <Dialog open={addDriverDialog} onOpenChange={setAddDriverDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Driver</DialogTitle>
            <DialogDescription>
              Enter the details for the new driver
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newName" className="text-right">
                Name *
              </Label>
              <Input
                id="newName"
                className="col-span-3"
                value={newDriver.name || ""}
                onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newPhone" className="text-right">
                Phone *
              </Label>
              <Input
                id="newPhone"
                className="col-span-3"
                value={newDriver.phone || ""}
                onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newLicense" className="text-right">
                License *
              </Label>
              <Input
                id="newLicense"
                className="col-span-3"
                value={newDriver.license || ""}
                onChange={(e) => setNewDriver({...newDriver, license: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newAvatar" className="text-right">
                Avatar URL *
              </Label>
              <Input
                id="newAvatar"
                className="col-span-3"
                value={newDriver.avatar || ""}
                onChange={(e) => setNewDriver({...newDriver, avatar: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEmail" className="text-right">
                Email
              </Label>
              <Input
                id="newEmail"
                className="col-span-3"
                value={newDriver.email || ""}
                onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
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
            <div className="py-4">
              <div className="flex justify-center mb-4">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={selectedDriver.avatar}
                    alt={`${selectedDriver.name}'s avatar`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedDriver.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="outline"
                    className={selectedDriver.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {selectedDriver.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{selectedDriver.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">License</p>
                  <p>{selectedDriver.license}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{selectedDriver.email || "Not specified"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Hire Date</p>
                  <p>{selectedDriver.hireDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Trips</p>
                  <p>{selectedDriver.totalTrips}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center">
                    <span>{selectedDriver.rating}</span>
                    <Sparkles className="h-4 w-4 text-yellow-500 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewDriverProfileDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DriversTab;
