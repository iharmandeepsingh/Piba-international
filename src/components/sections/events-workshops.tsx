'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Ticket, 
  ExternalLink, 
  Filter,
  Search,
  ChevronRight,
  Heart,
  Share2,
  Download,
  User,
  Award,
  Video,
  Image,
  DollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const EventsWorkshops = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const upcomingEvents = [
    {
      id: 1,
      title: 'International Beauty Expo 2024',
      description: 'The largest beauty industry gathering featuring latest trends, workshops, and networking opportunities.',
      date: '2024-12-15',
      time: '9:00 AM - 6:00 PM',
      location: 'New York, USA',
      type: 'conference',
      price: 299,
      earlyBird: 199,
      image: '/images/beauty-expo.jpg',
      speakers: ['Sarah Johnson', 'Michael Chen', 'Emma Wilson'],
      capacity: 5000,
      registered: 1247
    },
    {
      id: 2,
      title: 'Advanced Makeup Techniques Masterclass',
      description: 'Learn cutting-edge makeup techniques from industry professionals.',
      date: '2024-11-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      type: 'workshop',
      price: 149,
      image: '/images/makeup-workshop.jpg',
      instructor: 'David Brown',
      capacity: 100,
      registered: 89
    },
    {
      id: 3,
      title: 'Bridal Beauty Excellence Workshop',
      description: 'Specialized training for bridal makeup and hairstyling.',
      date: '2024-10-25',
      time: '10:00 AM - 4:00 PM',
      location: 'London, UK',
      type: 'workshop',
      price: 249,
      image: '/images/bridal-workshop.jpg',
      instructor: 'Lisa Anderson',
      capacity: 50,
      registered: 45
    },
    {
      id: 4,
      title: 'Nail Art Competition 2024',
      description: 'Showcase your talent and compete with the best nail artists.',
      date: '2024-11-10',
      time: '1:00 PM - 6:00 PM',
      location: 'Paris, France',
      type: 'competition',
      price: 79,
      image: '/images/nail-competition.jpg',
      prizes: ['$5000 Grand Prize', 'Professional Products', 'Magazine Feature'],
      capacity: 200,
      registered: 156
    }
  ]

  const pastEvents = [
    {
      id: 5,
      title: 'Global Beauty Summit 2023',
      description: 'Annual summit connecting beauty professionals worldwide.',
      date: '2023-09-15',
      location: 'Dubai, UAE',
      type: 'conference',
      attendees: 3000,
      gallery: true
    },
    {
      id: 6,
      title: 'Sustainable Beauty Practices Workshop',
      description: 'Eco-friendly beauty techniques and products.',
      date: '2023-08-20',
      location: 'Berlin, Germany',
      type: 'workshop',
      attendees: 75,
      gallery: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'conference', name: 'Conferences', icon: Users },
    { id: 'workshop', name: 'Workshops', icon: Award },
    { id: 'competition', name: 'Competitions', icon: Star },
    { id: 'online', name: 'Online Events', icon: ExternalLink }
  ]

  const filteredEvents = upcomingEvents.filter(event => {
    if (selectedCategory === 'all') return true
    return event.type === selectedCategory
  })

  const handleRegister = (eventId: number) => {
    console.log('Registering for event:', eventId)
    // In real implementation, this would open registration modal or navigate to registration page
  }

  const renderEventCard = (event: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          {/* Event Image */}
          <div className="h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/70 z-10"></div>
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Event Badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              event.type === 'conference' ? 'bg-blue-500 text-white' :
              event.type === 'workshop' ? 'bg-green-500 text-white' :
              event.type === 'competition' ? 'bg-red-500 text-white' :
              'bg-purple-500 text-white'
            }`}>
              {event.type === 'conference' && 'Conference'}
              {event.type === 'workshop' && 'Workshop'}
              {event.type === 'competition' && 'Competition'}
              {event.type === 'online' && 'Online'}
            </span>
          </div>

          <CardContent className="p-6">
            {/* Date and Location */}
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {event.time}
              </div>
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-piba-gold transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-6 line-clamp-3">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Capacity</p>
                  <p className="font-semibold">{event.capacity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Ticket className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Registered</p>
                  <p className="font-semibold">{event.registered || 0}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            {event.price && (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-2xl font-bold text-white">
                    ${event.earlyBird ? event.earlyBird : event.price}
                  </p>
                  {event.earlyBird && (
                    <p className="text-sm text-green-600">Early Bird Available</p>
                  )}
                </div>
                <Button 
                  variant="luxury"
                  onClick={() => handleRegister(event.id)}
                  className="group-hover:scale-105 transition-transform duration-300"
                >
                  Register Now
                </Button>
              </div>
            )}

            {/* Additional Info */}
            {event.speakers && (
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Featured Speakers</h4>
                <div className="flex flex-wrap gap-2">
                  {event.speakers.map((speaker: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                      <User className="w-6 h-6 text-piba-gold" />
                      <span className="text-sm font-medium">{speaker}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.prizes && (
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Prizes</h4>
                <div className="space-y-1">
                  {event.prizes.map((prize: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <Award className="w-4 h-4 text-piba-gold" />
                      <span>{prize}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Heart className="w-3 h-3" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share2 className="w-3 h-3" />
                Share
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => renderEventCard(event))}
            </div>
          </div>
        )

      case 'past':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Past Events</h2>
            
            <div className="grid gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                        {event.type === 'conference' && <Users className="w-8 h-8 text-piba-gold" />}
                        {event.type === 'workshop' && <Award className="w-8 h-8 text-piba-gold" />}
                        {event.type === 'competition' && <Star className="w-8 h-8 text-piba-gold" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                          {event.attendees && (
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2" />
                              {event.attendees} Attendees
                            </div>
                          )}
                        </div>
                        {event.gallery && (
                          <Button variant="outline" size="sm" className="flex items-center space-x-2">
                            <Image className="w-3 h-3 mr-1" />
                            View Gallery
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <p>No events found</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      {/* Header */}
      <div className="luxury-card-enhanced shadow-lg border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Events & Workshops</h1>
            <div className="flex items-center space-x-4">
              <Button variant="luxury">
                <Ticket className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {['upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab
                    ? 'text-piba-gold border-piba-gold'
                    : 'text-gray-600 border-transparent hover:text-piba-gold hover:border-piba-gold'
                }`}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default EventsWorkshops
