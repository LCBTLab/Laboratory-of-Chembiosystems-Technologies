import React, { useState } from 'react';
import { Camera, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  date: string;
}

const GalleryPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Syringe pump",
      category: "Equipment",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/Syringe%20Pump.png",
      description: "A syringe pump precisely delivers or withdraws liquids at controlled flow rates for accurate dosing or infusion",
      date: ""
    },
    {
      id: 2,
      title: "Team Dinner",
      category: "Team",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/Lab%20picture%20June%202024.jpeg",
      description: "Weekly research discussion and project planning session",
      date: ""
    },
    {
      id: 3,
      title: "Protein Crystallization Setup",
      category: "Research",
      image: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Setting up protein crystallization experiments for structural studies",
      date: ""
    },
    {
      id: 4,
      title: "Conference Presentation",
      category: "Events",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/4.jpg",
      description: "Presenting research findings at international biotechnology conference",
      date: ""
    },
    {
      id: 5,
      title: "Team Dinner",
      category: "Team",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/3.jpg",
      description: "",
      date: ""
    },
    {
      id: 6,
      title: "Team Building Activity",
      category: "Team",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/Lab%20picture%20May%202023.jpeg",
      description: "Annual team outing and bonding activities",
      date: ""
    },
    {
      id: 7,
      title: "Split-Tube Furnace",
      category: "Equipment",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/split%20tube%20furnance.png",
      description: "A split tube furnace enables high-temperature heating with easy tube access through its hinged design",
      date: ""
    },
    {
      id: 8,
      title: "Rotary Vacuum Film Evaporator",
      category: "Equipment",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/WhatsApp%20Image%202025-10-28%20at%2011.44.07_201cea96.jpg",
      description: "A rotary vacuum film evaporator efficiently removes solvents by rotating a flask under reduced pressure for gentle and rapid evaporation",
      date: ""
    },
    {
      id: 9,
      title: "Biomaterial Synthesis",
      category: "Research",
      image: "https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Synthesis of novel biomaterials for medical applications",
      date: ""
    },
    {
      id: 10,
      title: "Student Mentoring Session",
      category: "Team",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "One-on-one mentoring session with graduate students",
      date: ""
    },
    {
      id: 11,
      title: "Spectroscopy Analysis",
      category: "Equipment",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Advanced spectroscopic analysis of synthesized compounds",
      date: ""
    },
    {
      id: 12,
      title: "Lab Safety Training",
      category: "Events",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Comprehensive safety training for all lab members",
      date: ""
    },
    {
      id: 13,
      title: "tour",
      category: "Team",
      image: "https://raw.githubusercontent.com/Kroofy01/Lab-picture/refs/heads/main/5.jpg",
      description: "Giving tour to the our Japanese fellow",
      date: ""
    }
  ];

  const categories = ['all', 'Research', 'Equipment', 'Team', 'Events'];

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedFilter);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setCurrentIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredItems.length) % filteredItems.length
      : (currentIndex + 1) % filteredItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-800',
      'Equipment': 'bg-green-100 text-green-800',
      'Team': 'bg-purple-100 text-purple-800',
      'Events': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Camera className="h-12 w-12 text-blue-600 mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Laboratory Facilities
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take a visual journey through our laboratory facilities, research activities, 
              team collaborations, and scientific achievements. Discover the environment 
              where innovation meets discovery.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{galleryItems.length}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {galleryItems.filter(item => item.category === 'Research').length}
                </div>
                <div className="text-sm text-gray-600">Research</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {galleryItems.filter(item => item.category === 'Team').length}
                </div>
                <div className="text-sm text-gray-600">Team</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {galleryItems.filter(item => item.category === 'Events').length}
                </div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <Filter className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-700 font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedFilter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category === 'all' ? 'All Images' : category} 
                ({category === 'all' ? galleryItems.length : galleryItems.filter(item => item.category === category).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No images found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            <img 
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedImage.category)}`}>
                  {selectedImage.category}
                </span>
              </div>
              <p className="text-gray-200 mb-2">{selectedImage.description}</p>
              <p className="text-sm text-gray-300">
                {new Date(selectedImage.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
