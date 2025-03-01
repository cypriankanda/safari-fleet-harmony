
export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  type: 'Sedan' | 'SUV' | 'Van' | 'Luxury' | '4x4';
  image: string;
  gallery: string[];
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid';
  features: string[];
  available: boolean;
  description: string;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Land Cruiser",
    model: "Prado TX",
    year: 2021,
    type: "4x4",
    image: "https://images.unsplash.com/photo-1675707655137-e4886df4a265?q=80&w=1974&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1675707655137-e4886df4a265?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1675707849917-89c05389072c?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1675707708742-5ebd211ce730?q=80&w=2070&auto=format&fit=crop"
    ],
    pricePerDay: 15000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    features: ["4WD", "GPS Navigation", "Bluetooth", "Leather Seats", "Sunroof", "Reverse Camera", "Cruise Control"],
    available: true,
    description: "The Toyota Land Cruiser Prado is the perfect companion for your safari adventures. With its powerful 4WD capabilities and comfortable interior, you'll navigate Kenya's landscapes with ease and style. Featuring a spacious cabin that can accommodate up to 7 passengers, this vehicle comes equipped with all the modern amenities to ensure a pleasant journey."
  },
  {
    id: 2,
    name: "Toyota Fortuner",
    model: "V",
    year: 2022,
    type: "SUV",
    image: "https://images.unsplash.com/photo-1669128806696-87e501e45369?q=80&w=1932&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1669128806696-87e501e45369?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669128806700-613a2a9a3e66?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669128733338-f86f396c8fef?q=80&w=1932&auto=format&fit=crop"
    ],
    pricePerDay: 12000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    features: ["4WD", "GPS Navigation", "Bluetooth", "Leather Seats", "Reverse Camera", "Cruise Control"],
    available: true,
    description: "Experience luxury and power with the Toyota Fortuner. This versatile SUV combines elegant design with rugged performance, making it ideal for both urban drives in Eldoret and adventures in the surrounding wilderness. Its spacious interior and advanced safety features ensure a comfortable and secure journey for all passengers."
  },
  {
    id: 3,
    name: "Mercedes-Benz",
    model: "E-Class",
    year: 2021,
    type: "Luxury",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479255-1c1c6e100a0a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479000-dbeacb602d88?q=80&w=2070&auto=format&fit=crop"
    ],
    pricePerDay: 20000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: ["Leather Seats", "GPS Navigation", "Bluetooth", "Sunroof", "Heated Seats", "Reverse Camera", "Cruise Control"],
    available: true,
    description: "Travel in ultimate luxury with our Mercedes-Benz E-Class. Perfect for business travel or special occasions, this premium sedan offers exceptional comfort, cutting-edge technology, and sophisticated style. Impress clients or celebrate special moments with the finest driving experience available in Eldoret."
  },
  {
    id: 4,
    name: "Toyota Hiace",
    model: "GL",
    year: 2020,
    type: "Van",
    image: "https://images.unsplash.com/photo-1630075171976-ad4e0aee1e53?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1630075171976-ad4e0aee1e53?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1640080614619-7a3a9c36e166?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625253559853-b158c80504dc?q=80&w=2071&auto=format&fit=crop"
    ],
    pricePerDay: 10000,
    seats: 14,
    transmission: "Manual",
    fuelType: "Diesel",
    features: ["Air Conditioning", "Spacious Interior", "Bluetooth", "Reverse Camera"],
    available: true,
    description: "The Toyota Hiace is the ideal choice for group transportation. Whether for corporate events, family gatherings, or tour groups exploring Kenya's attractions, this spacious van comfortably accommodates up to 14 passengers. With its reliable performance and practical features, the Hiace ensures everyone reaches their destination together in comfort."
  },
  {
    id: 5,
    name: "Toyota Corolla",
    model: "Altis",
    year: 2022,
    type: "Sedan",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590362893825-55beced5e40c?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590362527869-5773b5854d16?q=80&w=2069&auto=format&fit=crop"
    ],
    pricePerDay: 7000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: ["Fuel Efficient", "Bluetooth", "USB Ports", "Reverse Camera", "Cruise Control"],
    available: true,
    description: "The Toyota Corolla offers the perfect balance of efficiency, comfort, and style for navigating Eldoret and beyond. This fuel-efficient sedan is ideal for business travelers or tourists seeking economical transportation without compromising on quality. With its smooth ride and modern amenities, the Corolla makes every journey a pleasure."
  },
  {
    id: 6,
    name: "Nissan Patrol",
    model: "Y62",
    year: 2021,
    type: "4x4",
    image: "https://images.unsplash.com/photo-1626443252986-97dbf81b76a0?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1626443252986-97dbf81b76a0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626443254753-3eb0d78c4b7c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626443253217-27c27162c4ae?q=80&w=2070&auto=format&fit=crop"
    ],
    pricePerDay: 18000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: ["Off-road Capabilities", "Leather Seats", "GPS Navigation", "Bluetooth", "Sunroof", "360° Camera", "Cruise Control"],
    available: false,
    description: "Conquer any terrain with the powerful Nissan Patrol. This premium 4x4 combines unmatched off-road capability with luxurious comfort, making it the ultimate choice for adventurous expeditions through Kenya's diverse landscapes. With its spacious interior and advanced technology, the Patrol ensures an unforgettable journey regardless of where your adventure takes you."
  }
];

export default vehicles;
