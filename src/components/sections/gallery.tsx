'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Filter, 
  Search, 
  Grid3X3, 
  List, 
  Heart, 
  Eye, 
  Download, 
  Share2, 
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  Maximize2,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all', name: 'All', icon: Grid3X3 },
    { id: 'makeup', name: 'Makeup', icon: ImageIcon },
    { id: 'hairstyle', name: 'Hairstyle', icon: ImageIcon },
    { id: 'nails', name: 'Nails', icon: ImageIcon },
    { id: 'skincare', name: 'Skincare', icon: ImageIcon },
    { id: 'bridal', name: 'Bridal', icon: ImageIcon },
    { id: 'events', name: 'Events', icon: VideoIcon },
    { id: 'competitions', name: 'Competitions', icon: ImageIcon }
  ]

  const galleryItems = [
    {
      id: 1,
      title: 'Elegant Wedding Makeup',
      category: 'makeup',
      type: 'image',
      thumbnail: '/images/gallery/wedding-makeup-thumb.jpg',
      fullImage: '/images/gallery/wedding-makeup.jpg',
      artist: 'Sarah Johnson',
      likes: 342,
      views: 1250,
      description: 'Stunning bridal makeup transformation using premium gold and rose tones.'
    },
    {
      id: 2,
      title: 'Creative Color Explosion',
      category: 'makeup',
      type: 'image',
      thumbnail: '/images/gallery/color-makeup-thumb.jpg',
      fullImage: '/images/gallery/color-makeup.jpg',
      artist: 'Michael Chen',
      likes: 289,
      views: 987,
      description: 'Bold and artistic makeup design featuring vibrant colors and creative techniques.'
    },
    {
      id: 3,
      title: 'Avant-Garde Hair Collection',
      category: 'hairstyle',
      type: 'image',
      thumbnail: '/images/gallery/avantgarde-hair-thumb.jpg',
      fullImage: '/images/gallery/avantgarde-hair.jpg',
      artist: 'Emma Wilson',
      likes: 456,
      views: 1567,
      description: 'Cutting-edge hairstyles that push boundaries of conventional beauty standards.'
    },
    {
      id: 4,
      title: 'Floral Nail Art Masterpiece',
      category: 'nails',
      type: 'image',
      thumbnail: '/images/gallery/floral-nails-thumb.jpg',
      fullImage: '/images/gallery/floral-nails.jpg',
      artist: 'Lisa Anderson',
      likes: 523,
      views: 890,
      description: 'Intricate floral nail art design with hand-painted details and 3D elements.'
    },
    {
      id: 5,
      title: 'Luxury Skincare Treatment',
      category: 'skincare',
      type: 'image',
      thumbnail: '/images/gallery/skincare-treatment-thumb.jpg',
      fullImage: '/images/gallery/skincare-treatment.jpg',
      artist: 'David Brown',
      likes: 267,
      views: 743,
      description: 'High-end facial treatment showcasing premium skincare products and techniques.'
    },
    {
      id: 6,
      title: 'Romantic Bridal Look',
      category: 'bridal',
      type: 'image',
      thumbnail: '/images/gallery/bridal-look-thumb.jpg',
      fullImage: '/images/gallery/bridal-look.jpg',
      artist: 'Sophia Martinez',
      likes: 445,
      views: 1123,
      description: 'Soft and romantic bridal makeup with delicate gold accents.'
    },
    {
      id: 7,
      title: 'PIBA Awards Ceremony 2024',
      category: 'events',
      type: 'video',
      thumbnail: '/images/gallery/awards-ceremony-thumb.jpg',
      fullVideo: '/images/gallery/awards-ceremony.mp4',
      duration: '3:45',
      artist: 'PIBA International',
      likes: 892,
      views: 3456,
      description: 'Annual awards ceremony recognizing excellence in beauty industry professionals.'
    },
    {
      id: 8,
      title: 'Nail Art Competition Highlights',
      category: 'competitions',
      type: 'video',
      thumbnail: '/images/gallery/nail-competition-thumb.jpg',
      fullVideo: '/images/gallery/nail-competition.mp4',
      duration: '2:30',
      artist: 'Various Artists',
      likes: 667,
      views: 2234,
      description: 'Highlights from international nail art competition showcasing incredible talent and creativity.'
    }
  ]

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    
    return matchesSearch && matchesCategory
  })

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  const renderGalleryItem = (item: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative group cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Image/Video Thumbnail */}
        <div className="relative aspect-square overflow-hidden">
          {item.type === 'video' ? (
            <div className="relative">
              <video 
                src={item.thumbnail} 
                className="w-full h-full object-cover"
                muted
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {item.duration}
              </div>
            </div>
          ) : (
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>

        {/* Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <div className="text-white">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm opacity-90 mb-3 line-clamp-2">{item.description}</p>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-1" />
                <span>{item.artist}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Heart className="w-4 h-4 mr-1" />
                <span>{item.likes}</span>
              </div>
              <div className="flex items-center space-x-4">
                <Eye className="w-4 h-4 mr-1" />
                <span>{item.views}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )

  const renderModal = () => {
    if (!selectedItem) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={handleCloseModal}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Media */}
            <div className="lg:w-3/5 bg-black flex items-center justify-center">
              {selectedItem.type === 'video' ? (
                <video 
                  src={selectedItem.fullVideo} 
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img 
                  src={selectedItem.fullImage} 
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Details */}
            <div className="lg:w-2/5 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedItem.title}</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="w-5 h-5 text-piba-gold" />
                    <span className="font-semibold">Artist:</span>
                  </div>
                  <p className="text-gray-700">{selectedItem.artist}</p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-semibold">{selectedItem.likes}</span>
                    </div>
                    <span className="text-gray-600">Likes</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 text-piba-gold mr-2" />
                      <span className="font-semibold">{selectedItem.views}</span>
                    </div>
                    <span className="text-gray-600">Views</span>
                  </div>
                </div>

                {selectedItem.duration && (
                  <div className="flex items-center space-x-3">
                    <VideoIcon className="w-5 h-5 text-piba-gold mr-2" />
                    <span className="font-semibold">{selectedItem.duration}</span>
                    <span className="text-gray-600">Duration</span>
                  </div>
                )}
              </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    Like
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="luxury" className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      {/* Header */}
      <div className="luxury-card-enhanced shadow-lg border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Gallery</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-4 font-medium transition-colors duration-200 border-b-2 ${
                  activeCategory === category.id
                    ? 'text-piba-gold border-piba-gold'
                    : 'text-gray-600 border-transparent hover:text-piba-gold hover:border-piba-gold'
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value as 'grid' | 'list')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
              >
                <option value="grid">Grid View</option>
                <option value="list">List View</option>
              </select>
              <Button variant="outline">
                <Maximize2 className="w-4 h-4 mr-2" />
                Expand
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid/List */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="aspect-square">
                  {renderGalleryItem(item)}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      {renderGalleryItem(item)}
                    </div>
                    <div className="md:w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <ImageIcon className="w-4 h-4 text-piba-gold mr-1" />
                          <span>{item.artist}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 text-red-500 mr-1" />
                            <span>{item.likes}</span>
                          </div>
                          <span className="text-gray-600">Likes</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 text-piba-gold mr-2" />
                            <span>{item.views}</span>
                          </div>
                          <span className="text-gray-600">Views</span>
                        </div>
                      </div>
                      {item.duration && (
                        <div className="flex items-center space-x-3">
                          <VideoIcon className="w-4 h-4 text-piba-gold mr-2" />
                          <span className="font-semibold">{item.duration}</span>
                          <span className="text-gray-600">Duration</span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-3 mr-1" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-3 mr-1" />
                      </Button>
                      <Button variant="luxury" size="sm">
                        <Download className="w-4 h-3 mr-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}

export default Gallery
