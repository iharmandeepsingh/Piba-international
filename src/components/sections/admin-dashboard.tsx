'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Award, 
  FileText, 
  Calendar, 
  CreditCard, 
  X,
  Settings, 
  Bell, 
  TrendingUp, 
  Eye,
  Download,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  DollarSign,
  UserCheck,
  Mail,
  Globe,
  Menu,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { label: 'Total Users', value: '12,547', change: '+12.5%', icon: Users, color: 'from-blue-500 to-purple-600' },
    { label: 'Active Certifications', value: '3,892', change: '+8.2%', icon: Award, color: 'from-green-500 to-teal-600' },
    { label: 'Total Revenue', value: '$124,750', change: '+23.1%', icon: DollarSign, color: 'from-piba-gold to-piba-gold-dark' },
    { label: 'Pending Applications', value: '486', change: '-5.4%', icon: FileText, color: 'from-orange-500 to-red-600' }
  ]

  const recentActivity = [
    { id: 1, user: 'Sarah Johnson', action: 'Applied for Makeup Certification', time: '2 hours ago', status: 'pending' },
    { id: 2, user: 'Michael Chen', action: 'Certificate Verified', time: '3 hours ago', status: 'completed' },
    { id: 3, user: 'Emma Wilson', action: 'New Member Registration', time: '5 hours ago', status: 'completed' },
    { id: 4, user: 'David Brown', action: 'Payment Received', time: '6 hours ago', status: 'completed' }
  ]

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users Management', icon: Users },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="luxury-card-enhanced text-center">
                    <CardContent className="p-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full mb-4`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-piba-black mb-1">{stat.value}</div>
                      <div className="text-sm text-white mb-2">{stat.label}</div>
                      <div className={`text-sm font-medium ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'completed' ? 'bg-green-500' :
                          activity.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                        <div>
                          <p className="font-medium text-piba-black">{activity.user}</p>
                          <p className="text-sm text-white">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-piba-black">Users Management</h2>
              <Button variant="luxury">
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Input placeholder="Search users..." className="flex-1" />
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-3 font-semibold text-piba-black">Name</th>
                        <th className="text-left p-3 font-semibold text-piba-black">Email</th>
                        <th className="text-left p-3 font-semibold text-piba-black">Role</th>
                        <th className="text-left p-3 font-semibold text-piba-black">Status</th>
                        <th className="text-left p-3 font-semibold text-piba-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3">Sarah Johnson</td>
                        <td className="p-3">sarah.johnson@email.com</td>
                        <td className="p-3">Professional Member</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'certifications':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-piba-black">Certifications</h2>
              <Button variant="luxury">
                <Plus className="w-4 h-4 mr-2" />
                Issue Certificate
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Input placeholder="Search certifications..." className="flex-1" />
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <div className="grid gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-piba-black">PIBA-2024-001</h3>
                        <p className="text-sm text-white">Professional Makeup Artistry</p>
                        <p className="text-sm text-white">Sarah Johnson</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'applications':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-piba-black">Applications</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Pending</Button>
                <Button variant="outline">Approved</Button>
                <Button variant="outline">Rejected</Button>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-piba-black">APP-2024-1234</h3>
                        <p className="text-sm text-white">Makeup Artistry Certification</p>
                        <p className="text-sm text-white">Michael Chen</p>
                      </div>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending Review</span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="luxury" size="sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'payments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-piba-black">Payment Management</h2>
              <Button variant="luxury">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white">This Month</span>
                      <span className="font-bold text-piba-black">$24,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Last Month</span>
                      <span className="font-bold text-piba-black">$18,320</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Total</span>
                      <span className="font-bold text-piba-black">$124,750</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border-b border-gray-100">
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-white">Professional Membership</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-piba-black">$299.00</p>
                        <p className="text-sm text-green-600">Completed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-piba-black mb-6">Analytics Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white">New Users</span>
                      <span className="font-bold text-piba-black">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Active Users</span>
                      <span className="font-bold text-piba-black">12,547</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Retention Rate</span>
                      <span className="font-bold text-piba-black">87.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Certification Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white">Total Issued</span>
                      <span className="font-bold text-piba-black">3,892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">This Month</span>
                      <span className="font-bold text-piba-black">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white">Success Rate</span>
                      <span className="font-bold text-piba-black">94.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 luxury-card-enhanced shadow-xl transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-piba-black">Admin Panel</h3>
                <p className="text-sm text-white">PIBA International</p>
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
                      : 'hover:bg-gray-100 text-gray-700'
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
        <main className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-piba-black">
                {sidebarItems.find(item => item.id === activeTab)?.label}
              </h1>
              <div className="flex items-center space-x-2">
                <Button variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
