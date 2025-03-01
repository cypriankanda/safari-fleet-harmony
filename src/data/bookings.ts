
export interface Booking {
  id: string;
  vehicleId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  withDriver: boolean;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  driverId?: string;
  totalAmount: number;
  notes?: string;
  createdAt: string;
}

// Initial empty bookings array - in a real app this would come from a database
const bookings: Booking[] = [];

export default bookings;
