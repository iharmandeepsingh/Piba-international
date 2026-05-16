'use client'

import React, { useState } from 'react'
import {
  Filter,
  Grid3X3,
  Heart,
  Eye,
  Download,
  Share2,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  Maximize2,
  X,
  Layout,
  Plus
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showUploadModal, setShowUploadModal] = useState(false)

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

  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setSelectedItem(null)
  }

  const renderGalleryItem = (item: any) => (
    <div
      className="relative group cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      <Card className="border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all duration-300 overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <div className="h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            {item.type === 'video' ? (
              <div className="relative">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-900/90 text-blue-400 px-2 py-1 rounded text-xs">
                  {item.duration}
                </div>
              </div>
            ) : (
              <ImageIcon className="w-16 h-16 text-blue-500/50" />
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-white mb-2 line-clamp-1">{item.title}</h3>
          <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{item.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{item.views}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">{item.artist}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderModal = () => {
    if (!selectedItem) return null

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={handleCloseModal}
      >
        <div
          className="relative max-w-4xl max-h-[90vh] w-full border-slate-700 bg-slate-900 rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="flex flex-col lg:flex-row h-full">
            {/* Media */}
            <div className="lg:w-3/5 bg-slate-950 flex items-center justify-center min-h-[300px]">
              <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                {selectedItem.type === 'video' ? (
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-12 h-12 text-blue-500" />
                    </div>
                    <p className="text-gray-400">Video Player</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-24 h-24 text-blue-500/50 mx-auto mb-4" />
                    <p className="text-gray-400">Image Preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="lg:w-2/5 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {selectedItem.title}
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-white">Artist:</span>
                  </div>

                  <p className="text-gray-300">
                    {selectedItem.artist}
                  </p>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-semibold text-white">
                        {selectedItem.likes}
                      </span>
                    </div>

                    <span className="text-gray-400">Likes</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Eye className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-semibold text-white">
                        {selectedItem.views}
                      </span>
                    </div>

                    <span className="text-gray-400">Views</span>
                  </div>
                </div>

                {selectedItem.duration && (
                  <div className="flex items-center space-x-3 mb-6">
                    <VideoIcon className="w-5 h-5 text-blue-500 mr-2" />

                    <span className="font-semibold text-white">
                      {selectedItem.duration}
                    </span>

                    <span className="text-gray-400">Duration</span>
                  </div>
                )}

                {/* Description */}
                <div className="mt-6">
                  <h3 className="font-semibold text-white mb-2">
                    Description
                  </h3>

                  <p className="text-gray-300 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>Like</span>
                </Button>

                <Button
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>

                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gallery</h1>
                <p className="text-sm text-gray-400">Beauty industry showcase</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 flex items-center space-x-2 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-slate-700'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search gallery..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={viewMode}
              onChange={(e) =>
                setViewMode(e.target.value as 'grid' | 'list')
              }
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
            </select>

            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
              <Maximize2 className="w-4 h-4 mr-2" />
              Expand
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id}>{renderGalleryItem(item)}</div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center cursor-pointer" onClick={() => handleItemClick(item)}>
                        {item.type === 'video' ? (
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Play className="w-6 h-6 text-blue-500" />
                            </div>
                            <p className="text-xs text-gray-400">{item.duration}</p>
                          </div>
                        ) : (
                          <ImageIcon className="w-12 h-12 text-blue-500/50" />
                        )}
                      </div>
                    </div>

                    <div className="md:w-2/3 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-4">
                          {item.description}
                        </p>

                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <ImageIcon className="w-4 h-4 text-blue-500 mr-1" />
                            <span>{item.artist}</span>
                          </div>

                          <div className="flex items-center">
                            <Heart className="w-4 h-4 text-red-500 mr-1" />
                            <span>{item.likes}</span>
                          </div>

                          <div className="flex items-center">
                            <Eye className="w-4 h-4 text-blue-500 mr-1" />
                            <span>{item.views}</span>
                          </div>
                        </div>

                        {item.duration && (
                          <div className="flex items-center space-x-3 mb-4">
                            <VideoIcon className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="font-semibold text-white">
                              {item.duration}
                            </span>
                            <span className="text-gray-400">Duration</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                          <Heart className="w-4 h-4" />
                        </Button>

                        <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                          <Share2 className="w-4 h-4" />
                        </Button>

                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {renderModal()}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setShowUploadModal(false)}>
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] border-slate-700 bg-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="border-b border-slate-800 p-6 flex-shrink-0">
              <h2 className="text-2xl font-bold text-white mb-2">Upload to Gallery</h2>
              <p className="text-gray-400">Share your beauty industry work</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <Input placeholder="Enter title" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea placeholder="Describe your work" rows={3} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option value="makeup">Makeup</option>
                    <option value="hairstyle">Hairstyle</option>
                    <option value="nails">Nails</option>
                    <option value="skincare">Skincare</option>
                    <option value="bridal">Bridal</option>
                    <option value="events">Events</option>
                    <option value="competitions">Competitions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                  <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Artist Name</label>
                <Input placeholder="Your name" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">File Upload</label>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input type="file" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Drag and drop your file here, or click to browse</p>
                    <p className="text-xs text-gray-500">Supports: JPG, PNG, MP4 (max 50MB)</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 p-6 flex justify-end space-x-3 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setShowUploadModal(false)}
                className="border-slate-700 text-white hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  setShowUploadModal(false)
                  console.log('Uploading...')
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery