
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import vehicles from "../data/vehicles";
import VehicleCard from "./VehicleCard";
import { Link } from "react-router-dom";

const FeaturedVehicles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredVehicles = vehicles.slice(0, 4);
  const maxIndex = featuredVehicles.length - 1;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    if (containerRef.current) {
      const scrollAmount = currentIndex * (containerRef.current.scrollWidth / featuredVehicles.length);
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex, featuredVehicles.length]);

  return (
    <section className="py-20 bg-white" id="vehicles">
      <div className="safari-container">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 section-heading">
              Our Featured Vehicles
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl text-sm md:text-base">
              Discover our premium selection of vehicles, meticulously maintained and
              ready for your journey through Kenya's beautiful landscapes.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-gray-50 text-gray-600 hover:text-primary transition-all duration-200 shadow-sm"
              aria-label="Previous vehicle"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-primary hover:bg-gray-50 text-gray-600 hover:text-primary transition-all duration-200 shadow-sm"
              aria-label="Next vehicle"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-hidden relative">
          <div
            ref={containerRef}
            className="flex w-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredVehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="flex-shrink-0 w-full snap-center px-3"
              >
                <VehicleCard vehicle={vehicle} featured />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {featuredVehicles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-up">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              featured
              className="transform hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        {/* View All Button - Updated to scroll to catalog section */}
        <div className="text-center mt-12">
          <a
            href="#catalog"
            className="btn-outline inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View All Vehicles <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
