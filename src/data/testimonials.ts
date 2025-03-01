
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Mwangi",
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    text: "PSK Safaris provided an exceptional experience for our family trip around Eldoret. The Land Cruiser was in perfect condition, and the driver was knowledgeable and friendly. I highly recommend their services to anyone visiting the region!",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    text: "We rented a 4x4 for our safari adventure, and PSK Safaris exceeded our expectations. The vehicle was well-maintained, and the team was responsive to all our needs. The pricing was transparent with no hidden fees.",
    rating: 5
  },
  {
    id: 3,
    name: "David Ochieng",
    location: "Eldoret, Kenya",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    text: "As a local business owner, I regularly use PSK Safaris for my transportation needs. Their fleet is reliable, and their customer service is outstanding. The online booking system makes the process incredibly convenient.",
    rating: 4
  },
  {
    id: 4,
    name: "Emma Chen",
    location: "Shanghai, China",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1922&auto=format&fit=crop",
    text: "Our tour group had an amazing experience with PSK Safaris. The vans were comfortable, and the drivers were professional and knowledgeable about the local areas. Will definitely use their services again on our next trip to Kenya.",
    rating: 5
  }
];

export default testimonials;
