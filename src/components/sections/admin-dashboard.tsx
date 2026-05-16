'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard,
  Users,
  Award,
  FileText,
  Calendar,
  CreditCard,
  Settings,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  DollarSign,
  LogOut,
  Shield,
  Menu,
  X,
  Home,
  BarChart3,
  Package,
  MessageSquare,
  HelpCircle,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const AdminDashboard = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'admin') {
    return null
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const quickStats = [
    { label: 'Total Users', value: '12,547', change: '+12%', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Active Certifications', value: '3,892', change: '+8%', icon: Award, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { label: 'Revenue', value: '$124,750', change: '+23%', icon: DollarSign, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Pending', value: '486', change: '-5%', icon: FileText, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  ]

  const recentActivity = [
    { id: 1, user: 'Sarah Johnson', action: 'Applied for Makeup Certification', time: '2h ago', type: 'certification' },
    { id: 2, user: 'Michael Chen', action: 'Certificate verified', time: '3h ago', type: 'success' },
    { id: 3, user: 'Emma Wilson', action: 'New member registered', time: '5h ago', type: 'user' },
    { id: 4, user: 'David Brown', action: 'Payment received', time: '6h ago', type: 'payment' },
    { id: 5, user: 'Lisa Garcia', action: 'Event registration', time: '8h ago', type: 'event' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => (
                <Card key={index} className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Revenue Overview</CardTitle>
                  <CardDescription className="text-gray-400">Monthly revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <TrendingUp className="w-16 h-16 mb-2" />
                    <p className="text-sm">Chart visualization coming soon</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-800 bg-slate-900/50">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-400">Latest system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'certification' ? 'bg-blue-500' :
                          activity.type === 'payment' ? 'bg-purple-500' :
                          activity.type === 'event' ? 'bg-orange-500' :
                          'bg-gray-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{activity.user}</p>
                          <p className="text-xs text-gray-400">{activity.action}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-gray-400">Frequently used operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-24 flex flex-col items-center justify-center space-y-2">
                    <Plus className="w-6 h-6" />
                    <span className="text-sm">Add User</span>
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 h-24 flex flex-col items-center justify-center space-y-2">
                    <Award className="w-6 h-6" />
                    <span className="text-sm">Issue Certificate</span>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 h-24 flex flex-col items-center justify-center space-y-2">
                    <Calendar className="w-6 h-6" />
                    <span className="text-sm">Create Event</span>
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 h-24 flex flex-col items-center justify-center space-y-2">
                    <FileText className="w-6 h-6" />
                    <span className="text-sm">View Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Users Management</h2>
                <p className="text-gray-400">Manage all platform users</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left p-4 font-semibold text-gray-300">User</th>
                        <th className="text-left p-4 font-semibold text-gray-300">Email</th>
                        <th className="text-left p-4 font-semibold text-gray-300">Role</th>
                        <th className="text-left p-4 font-semibold text-gray-300">Status</th>
                        <th className="text-left p-4 font-semibold text-gray-300">Joined</th>
                        <th className="text-left p-4 font-semibold text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Professional Member', status: 'Active', joined: '2024-01-15' },
                        { name: 'Michael Chen', email: 'michael@example.com', role: 'Student', status: 'Active', joined: '2024-02-20' },
                        { name: 'Emma Wilson', email: 'emma@example.com', role: 'Professional Member', status: 'Inactive', joined: '2024-03-10' },
                      ].map((user, index) => (
                        <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                              </div>
                              <span className="text-white font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-400">{user.email}</td>
                          <td className="p-4 text-gray-400">{user.role}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 text-gray-400">{user.joined}</td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-slate-800">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-slate-800">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 hover:bg-slate-800">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Certifications</h2>
                <p className="text-gray-400">Manage professional certifications</p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Issue Certificate
              </Button>
            </div>

            <Card className="border-slate-800 bg-slate-900/50">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 'PIBA-2024-001', name: 'Professional Makeup Artistry', holder: 'Sarah Johnson', status: 'Active', issued: '2024-01-15' },
                    { id: 'PIBA-2024-002', name: 'Advanced Hairstyling', holder: 'Michael Chen', status: 'Active', issued: '2024-02-20' },
                    { id: 'PIBA-2024-003', name: 'Skincare Specialist', holder: 'Emma Wilson', status: 'Expired', issued: '2023-11-10' },
                  ].map((cert, index) => (
                    <div key={index} className="p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <Award className={`w-8 h-8 ${cert.status === 'Active' ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cert.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {cert.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                      <p className="text-sm text-gray-400 mb-1">ID: {cert.id}</p>
                      <p className="text-sm text-gray-400 mb-3">Holder: {cert.holder}</p>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-700">
                        <span className="text-xs text-gray-500">Issued: {cert.issued}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Coming Soon</h3>
              <p className="text-gray-400">This section is under development</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white hidden sm:block">PIBA Admin</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {session?.user?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{session?.user?.name || 'Admin'}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="text-gray-400 hover:text-red-400"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-800">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:text-white hover:bg-slate-800"
                onClick={() => router.push('/')}
              >
                <Home className="w-5 h-5 mr-3" />
                Back to Site
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminDashboard
