'use client'

import React, { useState } from 'react'
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
  Heart,
  Share2,
  User,
  Award,
  Image,
  Layout,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const EventsWorkshops = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

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
  }

  const renderEventCard = (event: any) => (
    <Card key={event.id} className="border-slate-600 bg-slate-900 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        {/* Event Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <Calendar className="w-16 h-16 text-blue-500/50" />
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
          <div className="flex items-center space-x-4 mb-4 text-sm text-white">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              {event.location}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-500" />
              {event.time}
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {event.title}
          </h3>
          <p className="text-gray-100 mb-6 line-clamp-3">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2 p-3 bg-slate-700 rounded-lg">
              <Users className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-white">Capacity</p>
                <p className="font-semibold text-white">{event.capacity}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-slate-700 rounded-lg">
              <Ticket className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-xs text-white">Registered</p>
                <p className="font-semibold text-white">{event.registered || 0}</p>
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
                  <p className="text-sm text-green-400">Early Bird Available</p>
                )}
              </div>
              <Button 
                onClick={() => handleRegister(event.id)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Register Now
              </Button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
              <Heart className="w-3 h-3" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
              <Share2 className="w-3 h-3" />
              Share
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
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
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Past Events</h2>
              <p className="text-gray-400">View previously held events and their outcomes</p>
            </div>
            
            <div className="grid gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="border-slate-600 bg-slate-900 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                        {event.type === 'conference' && <Users className="w-8 h-8 text-blue-500" />}
                        {event.type === 'workshop' && <Award className="w-8 h-8 text-blue-500" />}
                        {event.type === 'competition' && <Star className="w-8 h-8 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                        <p className="text-gray-100 mb-4">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            {event.location}
                          </div>
                          {event.attendees && (
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-2 text-blue-500" />
                              {event.attendees} Attendees
                            </div>
                          )}
                        </div>
                        {event.gallery && (
                          <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
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
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400">Check back later for upcoming events</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Events & Workshops</h1>
                <p className="text-sm text-gray-400">Discover and join beauty industry events</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1">
            {[
              { id: 'upcoming', label: 'Upcoming', icon: Layout },
              { id: 'past', label: 'Past Events', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCreateModal(false)}></div>
          <Card className="relative z-10 w-full max-w-2xl border-slate-800 bg-slate-900">
            <CardHeader>
              <CardTitle className="text-white">Create New Event</CardTitle>
              <CardDescription className="text-gray-400">Fill in the details to create a new event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
                <Input placeholder="Enter event title" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea placeholder="Enter event description" rows={3} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <Input type="date" className="bg-slate-800 border-slate-700 text-white focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                  <Input placeholder="9:00 AM - 6:00 PM" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <Input placeholder="Enter location" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
                  <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="competition">Competition</option>
                    <option value="online">Online Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                  <Input type="number" placeholder="0" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                  className="border-slate-700 text-white hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setShowCreateModal(false)
                    console.log('Creating event...')
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Create Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default EventsWorkshops
