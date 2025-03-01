
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Vehicle } from "@/data/vehicles";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingFormProps {
  vehicle: Vehicle;
}

const BookingForm = ({ vehicle }: BookingFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotalDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1; // Minimum 1 day
  };

  const calculateTotal = () => {
    const days = calculateTotalDays();
    const driverCost = withDriver ? 2500 * days : 0; // 2,500 KES per day for driver
    return (vehicle.pricePerDay * days) + driverCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }

    if (endDate < startDate) {
      toast({
        title: "Error",
        description: "End date cannot be before start date",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // In a real application, this would be an API call to save the booking
    setTimeout(() => {
      // Simulate API call
      const bookingData = {
        id: `booking-${Date.now()}`,
        vehicleId: vehicle.id,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        withDriver,
        status: 'pending',
        totalAmount: calculateTotal(),
        notes,
        createdAt: new Date().toISOString()
      };

      // Log the booking data (in a real app, this would be saved to a database)
      console.log("Booking submitted:", bookingData);

      // Show success toast
      toast({
        title: "Booking Submitted!",
        description: "Your booking request has been received and is pending approval."
      });

      // Redirect to a success page
      navigate("/booking-success");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold text-primary">Book {vehicle.name} {vehicle.model}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="start-date"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="end-date">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="end-date"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => date < (startDate || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="with-driver"
              checked={withDriver}
              onCheckedChange={setWithDriver}
            />
            <Label htmlFor="with-driver">Include Driver (+ 2,500 KES per day)</Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+254 7XX XXX XXX"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Special Requests or Notes</Label>
        <textarea
          id="notes"
          className="w-full min-h-24 px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests or additional information..."
        ></textarea>
      </div>

      <Separator />
      
      <div className="bg-slate-50 p-4 rounded-md">
        <h4 className="font-semibold text-lg mb-2">Booking Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Vehicle:</span>
            <span className="font-medium">{vehicle.name} {vehicle.model}</span>
          </div>
          <div className="flex justify-between">
            <span>Duration:</span>
            <span className="font-medium">{calculateTotalDays()} day(s)</span>
          </div>
          <div className="flex justify-between">
            <span>Vehicle Rate:</span>
            <span className="font-medium">{vehicle.pricePerDay.toLocaleString()} KES/day</span>
          </div>
          {withDriver && (
            <div className="flex justify-between">
              <span>Driver Fee:</span>
              <span className="font-medium">2,500 KES/day</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{calculateTotal().toLocaleString()} KES</span>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting || !startDate || !endDate || !name || !email || !phone}
      >
        {isSubmitting ? "Processing..." : "Submit Booking Request"}
      </Button>
      
      <p className="text-xs text-slate-500 text-center mt-4">
        Your booking will be reviewed by our team. You will receive a confirmation email once approved.
      </p>
    </form>
  );
};

export default BookingForm;
