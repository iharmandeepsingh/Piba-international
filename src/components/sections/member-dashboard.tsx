'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Award, 
  Calendar, 
  Download, 
  Upload, 
  CreditCard, 
  Settings, 
  Bell, 
  FileText,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Edit,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const memberData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    memberSince: '2024-01-15',
    membershipType: 'Professional',
    membershipExpiry: '2025-01-14',
    avatar: '/images/avatar-placeholder.jpg'
  }

  const stats = [
    { label: 'Active Certifications', value: '3', icon: Award, color: 'from-blue-500 to-purple-600' },
    { label: 'Completed Courses', value: '12', icon: FileText, color: 'from-green-500 to-teal-600' },
    { label: 'Events Attended', value: '8', icon: Calendar, color: 'from-piba-gold to-piba-gold-dark' },
    { label: 'Profile Views', value: '1,247', icon: Eye, color: 'from-red-500 to-pink-600' }
  ]

  const certifications = [
    {
      id: 'PIBA-2024-001',
      type: 'Professional Makeup Artistry',
      issueDate: '2024-01-15',
      expiryDate: '2026-01-14',
      status: 'active',
      score: '95/100'
    },
    {
      id: 'PIBA-2024-002',
      type: 'Advanced Hairstyling',
      issueDate: '2024-03-20',
      expiryDate: '2026-03-19',
      status: 'active',
      score: '88/100'
    },
    {
      id: 'PIBA-2024-003',
      type: 'Nail Technology',
      issueDate: '2024-06-10',
      expiryDate: '2026-06-09',
      status: 'active',
      score: '92/100'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'International Beauty Expo 2024',
      date: '2024-12-15',
      location: 'New York, USA',
      type: 'conference'
    },
    {
      id: 2,
      title: 'Advanced Makeup Workshop',
      date: '2024-11-20',
      location: 'Online',
      type: 'workshop'
    }
  ]

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'profile', label: 'Profile', icon: Edit },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="gold-gradient text-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">Welcome back, {memberData.name}!</h2>
                      <p className="text-white/90">
                        Your membership expires on {new Date(memberData.membershipExpiry).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{memberData.membershipType}</div>
                      <div className="text-sm text-white/80">Member</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full mb-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-piba-black mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Certificate Verified</p>
                        <p className="text-sm text-gray-600">Professional Makeup Artistry - 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Event Registered</p>
                        <p className="text-sm text-gray-600">International Beauty Expo 2024 - 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-piba-gold/10 rounded-lg">
                      <Award className="w-5 h-5 text-piba-gold" />
                      <div>
                        <p className="font-medium">New Certification Earned</p>
                        <p className="text-sm text-gray-600">Nail Technology - 2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )

      case 'certifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-piba-black">My Certifications</h2>
            <div className="grid gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-piba-black mb-2">{cert.type}</h3>
                        <p className="text-sm text-gray-600 mb-1">Certificate ID: {cert.id}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                          <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                          <span>Score: {cert.score}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cert.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {cert.status}
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'events':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-piba-black">Upcoming Events</h2>
            <div className="grid gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-piba-black mb-2">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <Button variant="luxury">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-piba-black">Profile Settings</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                    <Input defaultValue={memberData.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                    <Input defaultValue={memberData.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Bio</label>
                    <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Portfolio URL</label>
                    <Input placeholder="https://yourportfolio.com" />
                  </div>
                  <Button variant="luxury">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Settings className="w-12 h-12 mx-auto mb-4" />
              <p>This section is coming soon</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 luxury-card-enhanced shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{memberData.name}</h3>
                <p className="text-sm text-white/80">{memberData.membershipType} Member</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-piba-gold text-white'
                      : 'hover:bg-gray-100 text-white/90'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Button variant="outline" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MemberDashboard
