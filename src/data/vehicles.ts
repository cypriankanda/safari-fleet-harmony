// data/vehicles.ts
export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  type: "Sedan" | "SUV" | "Van" | "Luxury" | "4x4";
  image: string; // Path to the main image
  gallery: string[]; // Array of paths to gallery images
  pricePerDay: number;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Petrol" | "Diesel" | "Hybrid";
  features: string[];
  available: boolean;
  description: string;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Land Cruiser",
    model: "Prado J250 2024",
    year: 2021,
    type: "4x4",
    image: "/src/assets/toyotaj250.jpg", // Local image path
    gallery: ["/src/assets/toyotaj250.jpg", "/src/assets/merc.jpeg", "/src/assets/merc.jpg"], // Local gallery paths
    pricePerDay: 15000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    features: [
      "4WD",
      "GPS Navigation",
      "Bluetooth",
      "Leather Seats",
      "Sunroof",
      "Reverse Camera",
      "Cruise Control",
    ],
    available: true,
    description:
      "The Toyota Land Cruiser Prado is the perfect companion for your safari adventures. With its powerful 4WD capabilities and comfortable interior, you'll navigate Kenya's landscapes with ease and style. Featuring a spacious cabin that can accommodate up to 7 passengers, this vehicle comes equipped with all the modern amenities to ensure a pleasant journey.",
  },
  {
    id: 2,
    name: "Audi",
    model: "A6",
    year: 2022,
    type: "Sedan",
    image: "/src/assets/audi.jpg",
    gallery: ["/src/assets/merc.jpeg", "/src/assets/audi.jpg", "/src/assets/toyota.jpg"],
    pricePerDay: 12000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: [
      "4WD",
      "GPS Navigation",
      "Bluetooth",
      "Leather Seats",
      "Reverse Camera",
      "Cruise Control",
    ],
    available: true,
    description:
      "Experience luxury and power with the Audi A6 S Line. This versatile Sedan combines elegant design with rugged performance, making it ideal for both urban drives in Eldoret and adventures in the surrounding wilderness. Its spacious interior and advanced safety features ensure a comfortable and secure journey for all passengers.",
  },
  {
    id: 3,
    name: "Mercedes-Benz",
    model: "E-Class",
    year: 2021,
    type: "Luxury",
    image: "/src/assets/merc.jpg",
    gallery: ["/src/assets/merc.jpeg", "/src/assets/audi.jpg", "/src/assets/toyota.jpg"],
    pricePerDay: 20000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: [
      "Leather Seats",
      "GPS Navigation",
      "Bluetooth",
      "Sunroof",
      "Heated Seats",
      "Reverse Camera",
      "Cruise Control",
    ],
    available: true,
    description:
      "Travel in ultimate luxury with our Mercedes-Benz E-Class. Perfect for business travel or special occasions, this premium sedan offers exceptional comfort, cutting-edge technology, and sophisticated style. Impress clients or celebrate special moments with the finest driving experience available in Eldoret.",
  },
  {
    id: 4,
    name: "Toyota Hiace",
    model: "GL",
    year: 2020,
    type: "Van",
    image: "/src/assets/hiace.jpeg",
    gallery: ["/src/assets/hiace.jpeg", "/src/assets/merc.jpg", "/src/assets/merc.jpg"],
    pricePerDay: 10000,
    seats: 14,
    transmission: "Manual",
    fuelType: "Diesel",
    features: ["Air Conditioning", "Spacious Interior", "Bluetooth", "Reverse Camera"],
    available: true,
    description:
      "The Toyota Hiace is the ideal choice for group transportation. Whether for corporate events, family gatherings, or tour groups exploring Kenya's attractions, this spacious van comfortably accommodates up to 14 passengers. With its reliable performance and practical features, the Hiace ensures everyone reaches their destination together in comfort.",
  },
  {
    id: 5,
    name: "Toyota Auris",
    model: "Auris",
    year: 2022,
    type: "Sedan",
    image: "/src/assets/auris.jpg",
    gallery: ["/src/assets/auris.jpg", "/src/assets/toyotaj250.jpg", "/src/assets/audi.jpg"],
    pricePerDay: 6000,
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: ["Fuel Efficient", "Bluetooth", "USB Ports", "Reverse Camera", "Cruise Control"],
    available: true,
    description:
      "The Toyota Auris offers the perfect balance of efficiency, comfort, and style for navigating Eldoret and beyond. This fuel-efficient sedan is ideal for business travelers or tourists seeking economical transportation without compromising on quality. With its smooth ride and modern amenities, the Corolla makes every journey a pleasure.",
  },
  {
    id: 6,
    name: "Nissan Patrol",
    model: "Y62",
    year: 2021,
    type: "4x4",
    image: "/src/assets/patrol.jpg",
    gallery: ["/src/assets/patrol.jpg", "/src/assets/auris.jpg", "/src/assets/toyota.jpg"],
    pricePerDay: 25000,
    seats: 7,
    transmission: "Automatic",
    fuelType: "Petrol",
    features: [
      "Off-road Capabilities",
      "Leather Seats",
      "GPS Navigation",
      "Bluetooth",
      "Sunroof",
      "360° Camera",
      "Cruise Control",
    ],
    available: false,
    description:
      "Conquer any terrain with the powerful Nissan Patrol. This premium 4x4 combines unmatched off-road capability with luxurious comfort, making it the ultimate choice for adventurous expeditions through Kenya's diverse landscapes. With its spacious interior and advanced technology, the Patrol ensures an unforgettable journey regardless of where your adventure takes you.",
  },
];

export default vehicles;