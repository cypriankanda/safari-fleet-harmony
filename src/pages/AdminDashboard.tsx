
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, ChevronLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ChatBot from "@/components/ChatBot";
import StatCard from "@/components/dashboard/StatCard";
import BookingsTab from "@/components/dashboard/BookingsTab";
import VehiclesTab from "@/components/dashboard/VehiclesTab";
import DriversTab from "@/components/dashboard/DriversTab";
import LiveTrackingTab from "@/components/dashboard/LiveTrackingTab";
import { initialBookings, Booking } from "@/components/dashboard/types";
import driversData from "@/data/drivers";
import vehiclesData from "@/data/vehicles";

const AdminDashboard = () => {
  const { toast } = useToast();

  // State Management
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [drivers, setDrivers] = useState(driversData);
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [activeTab, setActiveTab] = useState("bookings");
  const [refreshAnimation, setRefreshAnimation] = useState(false);

  // Stats for dashboard
  const stats = [
    { 
      title: "Total Bookings", 
      icon: "CalendarRange", 
      value: bookings.length, 
      color: "bg-blue-500" 
    },
    { 
      title: "Available Vehicles", 
      icon: "Car", 
      value: vehicles.filter((v) => v.available).length, 
      color: "bg-green-500" 
    },
    { 
      title: "Available Drivers", 
      icon: "Users", 
      value: drivers.filter((d) => d.available).length, 
      color: "bg-purple-500" 
    },
    { 
      title: "Total Revenue", 
      icon: "DollarSign", 
      value: `KES ${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`, 
      color: "bg-orange-500" 
    },
  ];

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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg border">
            <TabsTrigger 
              value="bookings" 
              data-value="bookings"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger 
              value="vehicles" 
              data-value="vehicles"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Vehicles
            </TabsTrigger>
            <TabsTrigger 
              value="drivers" 
              data-value="drivers"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Drivers
            </TabsTrigger>
            <TabsTrigger 
              value="map" 
              data-value="map"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Live Tracking
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="bookings">
            <BookingsTab bookings={bookings} setBookings={setBookings} drivers={drivers} setDrivers={setDrivers} vehicles={vehicles} />
          </TabsContent>

          <TabsContent value="vehicles">
            <VehiclesTab vehicles={vehicles} setVehicles={setVehicles} />
          </TabsContent>

          <TabsContent value="drivers">
            <DriversTab drivers={drivers} setDrivers={setDrivers} />
          </TabsContent>

          <TabsContent value="map">
            <LiveTrackingTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
