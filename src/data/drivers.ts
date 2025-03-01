
export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  available: boolean;
  rating: number;
  image: string;
}

const drivers: Driver[] = [
  {
    id: "d1",
    name: "John Kamau",
    phone: "+254 712 345 678",
    license: "KE-DL-12345",
    available: true,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "d2",
    name: "Grace Wanjiru",
    phone: "+254 723 456 789",
    license: "KE-DL-67890",
    available: true,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "d3",
    name: "David Omondi",
    phone: "+254 734 567 890",
    license: "KE-DL-24680",
    available: false,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop"
  }
];

export default drivers;
