
export interface Booking {
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

export interface StatCardProps {
  stat: {
    title: string;
    icon: string;
    value: string | number;
    color: string;
  };
}

export const initialBookings: Booking[] = [
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
