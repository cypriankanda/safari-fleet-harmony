
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";

const LiveTrackingTab = () => {
  return (
    <Card className="shadow-md overflow-hidden border-0">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-xl">Live Tracking</CardTitle>
            <CardDescription>Track your fleet in real-time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <Map className="w-20 h-20 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-800 mb-2">Live Tracking Coming Soon</h3>
          <p className="text-gray-500 max-w-md">
            We're working on implementing real-time tracking for your fleet. This feature will be available soon.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTrackingTab;
