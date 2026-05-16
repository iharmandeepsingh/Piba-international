'use client'

import React, { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter, 
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Tag,
  Eye,
  ArrowRight,
  FileText,
  Layout,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  category: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  featured: boolean;
  image: string;
  likes: number;
  comments: number;
  views: number;
  content: string;
}

const BlogNews = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const categories = [
    { id: 'all', name: 'All Posts', count: 48 },
    { id: 'news', name: 'News', count: 12 },
    { id: 'tutorials', name: 'Tutorials', count: 15 },
    { id: 'industry', name: 'Industry Insights', count: 8 },
    { id: 'events', name: 'Events', count: 6 },
    { id: 'certification', name: 'Certification', count: 7 }
  ]

  const blogPosts = [
    {
      id: 1,
      title: 'Latest Trends in Professional Makeup Artistry',
      excerpt: 'Discover the cutting-edge techniques and products that are transforming the beauty industry in 2024.',
      author: 'Sarah Johnson',
      authorAvatar: '/images/avatars/sarah.jpg',
      category: 'tutorials',
      tags: ['makeup', 'trends', '2024'],
      readTime: '5 min read',
      publishDate: '2024-01-15',
      featured: true,
      image: '/images/blog/makeup-trends.jpg',
      likes: 234,
      comments: 45,
      views: 1520,
      content: `<p>The beauty industry is constantly evolving, and 2024 brings exciting new trends that every professional makeup artist should know about.</p><h3>Key Trends This Year</h3><ul><li>Natural-looking makeup with enhanced features</li><li>Sustainable and eco-friendly products</li><li>AI-powered makeup application tools</li><li>Inclusive shade ranges for all skin tones</li></ul><p>Stay ahead of the curve by incorporating these trends into your professional toolkit...</p>`
    },
    {
      id: 2,
      title: 'PIBA International Announces New Certification Standards',
      excerpt: 'Exciting changes to our certification process will make it easier for professionals to validate their skills and advance their careers.',
      author: 'Michael Chen',
      authorAvatar: '/images/avatars/michael.jpg',
      category: 'news',
      tags: ['certification', 'announcement', 'standards'],
      readTime: '3 min read',
      publishDate: '2024-01-12',
      featured: true,
      image: '/images/blog/certification-standards.jpg',
      likes: 189,
      comments: 32,
      views: 980,
      content: `<p>We're thrilled to announce significant updates to our certification standards that reflect the evolving needs of the beauty industry.</p><h3>What's New?</h3><ul><li>Streamlined application process</li><li>Digital portfolio submissions</li><li>Expanded certification categories</li><li>International recognition</li></ul><p>These changes will take effect on March 1, 2024...</p>`
    },
    {
      id: 3,
      title: 'Building Your Beauty Business: A Complete Guide',
      excerpt: 'Learn how to turn your passion for beauty into a successful business with our comprehensive guide.',
      author: 'Emily Rodriguez',
      authorAvatar: '/images/avatars/emily.jpg',
      category: 'industry',
      tags: ['business', 'entrepreneurship', 'guide'],
      readTime: '8 min read',
      publishDate: '2024-01-10',
      featured: false,
      image: '/images/blog/beauty-business.jpg',
      likes: 156,
      comments: 28,
      views: 780,
      content: `<p>Starting your own beauty business can be both exciting and challenging. Here's everything you need to know to succeed.</p><h3>Essential Steps</h3><ul><li>Business planning and strategy</li><li>Legal requirements and licensing</li><li>Marketing and branding</li><li>Client acquisition and retention</li></ul><p>Let's dive deep into each of these areas...</p>`
    },
    {
      id: 4,
      title: 'Upcoming Beauty Expo 2024: What to Expect',
      excerpt: 'Get ready for the biggest beauty industry event of the year with our comprehensive preview.',
      author: 'David Kim',
      authorAvatar: '/images/avatars/david.jpg',
      category: 'events',
      tags: ['events', 'expo', '2024'],
      readTime: '4 min read',
      publishDate: '2024-01-08',
      featured: false,
      image: '/images/blog/beauty-expo.jpg',
      likes: 201,
      comments: 41,
      views: 1200,
      content: `<p>The Beauty Expo 2024 is just around the corner, and we're here to give you an exclusive preview of what to expect.</p><h3>Highlights Include</h3><ul><li>Latest product launches</li><li>Expert workshops and demonstrations</li><li>Networking opportunities</li><li>Career development sessions</li></ul><p>Don't miss this opportunity to connect with industry leaders...</p>`
    },
    {
      id: 5,
      title: 'Advanced Skincare Techniques for Professionals',
      excerpt: 'Master the latest skincare techniques that will set you apart from the competition.',
      author: 'Lisa Thompson',
      authorAvatar: '/images/avatars/lisa.jpg',
      category: 'tutorials',
      tags: ['skincare', 'techniques', 'advanced'],
      readTime: '6 min read',
      publishDate: '2024-01-05',
      featured: false,
      image: '/images/blog/skincare-techniques.jpg',
      likes: 178,
      comments: 35,
      views: 920,
      content: `<p>Advanced skincare techniques are essential for any beauty professional looking to expand their services.</p><h3>Techniques Covered</h3><ul><li>Chemical peel applications</li><li>Microdermabrasion</li><li>LED therapy treatments</li><li>Customized skincare protocols</li></ul><p>These advanced techniques will help you deliver exceptional results...</p>`
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  const renderBlogCard = (post: BlogPost) => (
    <Card key={post.id} className="border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => setSelectedPost(post)}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          <FileText className="w-16 h-16 text-blue-500/50" />
        </div>
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>
        {post.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center space-x-1 bg-slate-900/90 px-2 py-1 rounded-full">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="text-xs text-blue-500 font-semibold">Featured</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        {/* Title and Excerpt */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{post.author}</p>
              <p className="text-xs text-gray-400">Professional Member</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
            <Bookmark className="w-3 h-3" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
            <Share2 className="w-3 h-3" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderFeaturedPost = (post: BlogPost) => (
    <Card key={post.id} className="border-slate-700 bg-slate-900 hover:bg-slate-800 transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="relative h-64 md:h-auto overflow-hidden">
          <div className="h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <FileText className="w-16 h-16 text-blue-500/50" />
          </div>
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Calendar className="w-3 h-3 text-blue-500" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
            <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string, index: number) => (
                <span key={index} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author and Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{post.author}</p>
                <p className="text-xs text-gray-400">{post.readTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  const renderPostModal = () => {
    if (!selectedPost) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedPost(null)}>
        <div className="relative max-w-4xl max-h-[90vh] w-full border-slate-700 bg-slate-900 rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 text-white"
          >
            ×
          </Button>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  {selectedPost.category}
                </span>
                {selectedPost.featured && (
                  <div className="flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-blue-500 font-semibold">Featured</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
              
              {/* Meta */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{selectedPost.author}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(selectedPost.publishDate).toLocaleDateString()} • {selectedPost.readTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{selectedPost.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{selectedPost.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedPost.comments}</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <div className="h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-blue-500/50" />
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  Like ({selectedPost.likes})
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  Comment ({selectedPost.comments})
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  Save
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
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Blog & News</h1>
                <p className="text-sm text-gray-400">Latest beauty industry insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Post
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
              { id: 'all', label: 'All Posts', icon: Layout },
              { id: 'featured', label: 'Featured', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 flex items-center space-x-2 ${
                  (tab.id === 'all' && activeCategory === 'all') || (tab.id === 'featured' && featuredPosts.length > 0)
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
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name} ({category.count})</option>
              ))}
            </select>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Featured Posts</h2>
            <div className="grid gap-6">
              {featuredPosts.map(renderFeaturedPost)}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(renderBlogCard)}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Post Modal */}
      {renderPostModal()}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setShowCreateModal(false)}>
          <div className="relative z-10 w-full max-w-2xl border-slate-700 bg-slate-900 rounded-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="border-b border-slate-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create New Post</h2>
              <p className="text-gray-400">Share your beauty industry insights</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Post Title</label>
                <Input placeholder="Enter post title" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                <textarea placeholder="Brief description of your post" rows={3} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white">
                    <option value="news">News</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="industry">Industry Insights</option>
                    <option value="events">Events</option>
                    <option value="certification">Certification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Read Time</label>
                  <Input placeholder="5 min read" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content</label>
                <textarea placeholder="Write your post content..." rows={8} className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tags (comma separated)</label>
                <Input placeholder="makeup, trends, 2024" className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500" />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 p-6 flex justify-end space-x-3">
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
                  console.log('Creating post...')
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Publish Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogNews
