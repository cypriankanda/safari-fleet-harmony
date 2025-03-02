
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatCardProps } from "./types";
import { 
  CalendarRange, 
  Car, 
  Users, 
  DollarSign, 
  Activity 
} from "lucide-react";

const iconMap = {
  CalendarRange,
  Car,
  Users,
  DollarSign,
  Activity
};

const StatCard = ({ stat }: StatCardProps) => {
  // Get the icon component
  const IconComponent = iconMap[stat.icon as keyof typeof iconMap];

  return (
    <Card className="shadow-md overflow-hidden border-0 transition-all duration-300 hover:shadow-lg relative">
      <div className={`absolute top-0 left-0 w-1.5 h-full ${stat.color}`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center">
        <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 mr-3`}>
          {IconComponent && <IconComponent className={`w-6 h-6 text-${stat.color.split('-')[1]}-600`} />}
        </div>
        <span className="text-2xl font-semibold text-gray-800">{stat.value}</span>
      </CardContent>
      <div className="absolute bottom-3 right-3">
        <Activity className="w-5 h-5 text-gray-300" />
      </div>
    </Card>
  );
};

export default StatCard;
