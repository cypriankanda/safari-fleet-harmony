// drivers.ts
export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  available: boolean;
  rating: number;
  avatar: string;  // Changed from 'image' to 'avatar' for clarity
  email?: string;
  status: 'active' | 'inactive' | 'suspended';
  hireDate: string;
  totalTrips: number;
  lastActive?: string;
  emergencyContact?: string;
}

const drivers: Driver[] = [
  {
    id: "d1",
    name: "John Kamau",
    phone: "+254 712 345 678",
    license: "KE-DL-12345",
    available: true,
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1170&auto=format&fit=crop",
    email: "john.kamau@example.com",
    status: 'active',
    hireDate: "2022-03-15",
    totalTrips: 145,
    lastActive: "2025-02-28",
    emergencyContact: "+254 700 123 456"
  },
  {
    id: "d2",
    name: "Grace Wanjiru",
    phone: "+254 723 456 789",
    license: "KE-DL-67890",
    available: true,
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop",
    email: "grace.wanjiru@example.com",
    status: 'active',
    hireDate: "2021-11-20",
    totalTrips: 198,
    lastActive: "2025-02-27",
    emergencyContact: "+254 711 234 567"
  },
  {
    id: "d3",
    name: "David Omondi",
    phone: "+254 734 567 890",
    license: "KE-DL-24680",
    available: false,
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
    email: "david.omondi@example.com",
    status: 'active',
    hireDate: "2023-01-10",
    totalTrips: 87,
    lastActive: "2025-02-25",
    emergencyContact: "+254 722 345 678"
  }
];

export default drivers;