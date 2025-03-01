
import { useState } from 'react';
import { SearchIcon, Filter, X, Check } from 'lucide-react';
import vehicles, { Vehicle } from '../data/vehicles';
import VehicleCard from './VehicleCard';

type VehicleType = 'All' | 'Sedan' | 'SUV' | 'Van' | 'Luxury' | '4x4';
type TransmissionType = 'All' | 'Automatic' | 'Manual';

const VehicleCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<VehicleType>('All');
  const [selectedTransmission, setSelectedTransmission] = useState<TransmissionType>('All');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const maxPossiblePrice = Math.max(...vehicles.map(v => v.pricePerDay));
  
  const filteredVehicles = vehicles.filter(vehicle => {
    // Search filter
    const searchMatch = 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const typeMatch = selectedType === 'All' || vehicle.type === selectedType;
    
    // Transmission filter
    const transmissionMatch = 
      selectedTransmission === 'All' || 
      vehicle.transmission === selectedTransmission;
    
    // Availability filter
    const availabilityMatch = !showOnlyAvailable || vehicle.available;
    
    // Price filter
    const priceMatch = vehicle.pricePerDay <= maxPrice;
    
    return searchMatch && typeMatch && transmissionMatch && availabilityMatch && priceMatch;
  });
  
  const vehicleTypes: VehicleType[] = ['All', 'Sedan', 'SUV', 'Van', 'Luxury', '4x4'];
  const transmissionTypes: TransmissionType[] = ['All', 'Automatic', 'Manual'];
  
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedTransmission('All');
    setShowOnlyAvailable(false);
    setMaxPrice(maxPossiblePrice);
  };
  
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  return (
    <section className="py-16 bg-sand" id="catalog">
      <div className="safari-container">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10">
          <div>
            <h2 className="section-heading">Our Vehicle Catalog</h2>
            <p className="text-charcoal-light max-w-2xl">
              Browse our complete fleet of vehicles and find the perfect match for your needs.
              From compact sedans to luxury SUVs, we have options for every journey.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Section - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-safari p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-montserrat font-semibold text-lg">Filters</h3>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-secondary hover:text-secondary-600 font-medium"
                >
                  Clear All
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search vehicles..."
                    className="form-input pr-10"
                  />
                  <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              {/* Vehicle Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                <div className="space-y-2">
                  {vehicleTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        selectedType === type 
                          ? 'border-primary' 
                          : 'border-gray-300'
                      }`}>
                        {selectedType === type && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Transmission */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Transmission</label>
                <div className="space-y-2">
                  {transmissionTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedTransmission === type}
                        onChange={() => setSelectedTransmission(type)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                        selectedTransmission === type 
                          ? 'border-primary' 
                          : 'border-gray-300'
                      }`}>
                        {selectedTransmission === type && (
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-medium">Max Price (KES)</label>
                  <span className="text-sm text-gray-500">
                    {maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={maxPossiblePrice}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Availability */}
              <div className="mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlyAvailable}
                    onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                    showOnlyAvailable ? 'bg-primary border-primary' : 'border-gray-300'
                  }`}>
                    {showOnlyAvailable && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm">Show only available</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={toggleFilter}
              className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg bg-white hover:border-primary transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            
            {/* Mobile Filter Panel */}
            {isFilterVisible && (
              <div className="fixed inset-0 bg-black/60 z-50 flex justify-end animate-fade-in">
                <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-montserrat font-semibold text-lg">Filters</h3>
                    <button onClick={toggleFilter}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-secondary hover:text-secondary-600 font-medium"
                    >
                      Clear All
                    </button>
                    <button 
                      onClick={toggleFilter}
                      className="btn-primary py-2 px-4 text-sm"
                    >
                      Apply Filters
                    </button>
                  </div>
                  
                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Search</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search vehicles..."
                        className="form-input pr-10"
                      />
                      <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>
                  
                  {/* Vehicle Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                    <div className="space-y-2">
                      {vehicleTypes.map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            checked={selectedType === type}
                            onChange={() => setSelectedType(type)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                            selectedType === type 
                              ? 'border-primary' 
                              : 'border-gray-300'
                          }`}>
                            {selectedType === type && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Transmission */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Transmission</label>
                    <div className="space-y-2">
                      {transmissionTypes.map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            checked={selectedTransmission === type}
                            onChange={() => setSelectedTransmission(type)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${
                            selectedTransmission === type 
                              ? 'border-primary' 
                              : 'border-gray-300'
                          }`}>
                            {selectedTransmission === type && (
                              <div className="w-2 h-2 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium">Max Price (KES)</label>
                      <span className="text-sm text-gray-500">
                        {maxPrice.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={maxPossiblePrice}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Availability */}
                  <div className="mb-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={() => setShowOnlyAvailable(!showOnlyAvailable)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border rounded flex items-center justify-center mr-2 ${
                        showOnlyAvailable ? 'bg-primary border-primary' : 'border-gray-300'
                      }`}>
                        {showOnlyAvailable && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm">Show only available</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Vehicle Grid */}
          <div className="flex-1">
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-safari">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                <p className="text-charcoal-light mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button 
                  onClick={clearFilters}
                  className="btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-up">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleCatalog;
