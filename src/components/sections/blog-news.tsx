'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  User, 
  Search, 
  Filter, 
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Tag,
  Eye,
  ArrowRight,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      content: `
        <p>The beauty industry is constantly evolving, and 2024 brings exciting new trends that every professional makeup artist should know about.</p>
        <h3>Key Trends This Year</h3>
        <ul>
          <li>Natural-looking makeup with enhanced features</li>
          <li>Sustainable and eco-friendly products</li>
          <li>AI-powered makeup application tools</li>
          <li>Inclusive shade ranges for all skin tones</li>
        </ul>
        <p>Stay ahead of the curve by incorporating these trends into your professional toolkit...</p>
      `
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
      content: `
        <p>We're thrilled to announce significant updates to our certification standards that reflect the evolving needs of the beauty industry.</p>
        <h3>What's New?</h3>
        <ul>
          <li>Streamlined application process</li>
          <li>Digital portfolio submissions</li>
          <li>Expanded certification categories</li>
          <li>International recognition</li>
        </ul>
        <p>These changes will take effect on March 1, 2024...</p>
      `
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
      content: `
        <p>Starting your own beauty business can be both exciting and challenging. Here's everything you need to know to succeed.</p>
        <h3>Essential Steps</h3>
        <ul>
          <li>Business planning and strategy</li>
          <li>Legal requirements and licensing</li>
          <li>Marketing and branding</li>
          <li>Client acquisition and retention</li>
        </ul>
        <p>Let's dive deep into each of these areas...</p>
      `
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
      content: `
        <p>The Beauty Expo 2024 is just around the corner, and we're here to give you an exclusive preview of what to expect.</p>
        <h3>Highlights Include</h3>
        <ul>
          <li>Latest product launches</li>
          <li>Expert workshops and demonstrations</li>
          <li>Networking opportunities</li>
          <li>Career development sessions</li>
        </ul>
        <p>Don't miss this opportunity to connect with industry leaders...</p>
      `
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
      content: `
        <p>Advanced skincare techniques are essential for any beauty professional looking to expand their services.</p>
        <h3>Techniques Covered</h3>
        <ul>
          <li>Chemical peel applications</li>
          <li>Microdermabrasion</li>
          <li>LED therapy treatments</li>
          <li>Customized skincare protocols</li>
        </ul>
        <p>These advanced techniques will help you deliver exceptional results...</p>
      `
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
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="cursor-pointer"
      onClick={() => setSelectedPost(post)}
    >
      <Card className="luxury-card-enhanced hover:shadow-gold transition-all duration-300 overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-gold/40 z-10"></div>
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-accent-gold text-primary-bg text-xs font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          {post.featured && (
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center space-x-1 bg-primary-bg/90 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3 text-accent-gold" />
                <span className="text-xs text-accent-gold font-semibold">Featured</span>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Title and Excerpt */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-gold transition-colors duration-300">
            {post.title}
          </h3>
          <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-accent-gold/10 text-accent-gold rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-white/60 mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={post.authorAvatar} 
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-white">{post.author}</p>
                <p className="text-xs text-white/60">Professional Member</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-white/60">
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
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Bookmark className="w-3 h-3" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Share2 className="w-3 h-3" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderFeaturedPost = (post: BlogPost) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="cursor-pointer"
      onClick={() => setSelectedPost(post)}
    >
      <Card className="luxury-card-enhanced hover:shadow-gold transition-all duration-300 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-gold/40 z-10"></div>
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 bg-accent-gold text-primary-bg text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs px-2 py-1 bg-accent-gold/10 text-accent-gold rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center space-x-1 text-xs text-white/60">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
              <p className="text-white/80 mb-4 line-clamp-3">{post.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="text-xs px-2 py-1 bg-accent-gold/10 text-accent-gold rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author and Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.authorAvatar} 
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-white">{post.author}</p>
                  <p className="text-xs text-white/60">{post.readTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/60">
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
    </motion.div>
  )

  const renderPostModal = () => {
    if (!selectedPost) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedPost(null)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl max-h-[90vh] w-full luxury-card-enhanced rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPost(null)}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
          >
            ×
          </Button>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-accent-gold text-primary-bg text-xs font-semibold rounded-full">
                  {selectedPost.category}
                </span>
                {selectedPost.featured && (
                  <div className="flex items-center space-x-1 bg-primary-bg/90 px-2 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 text-accent-gold" />
                    <span className="text-xs text-accent-gold font-semibold">Featured</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
              
              {/* Meta */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedPost.authorAvatar} 
                    alt={selectedPost.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{selectedPost.author}</p>
                    <p className="text-sm text-white/60">
                      {new Date(selectedPost.publishDate).toLocaleDateString()} • {selectedPost.readTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/60">
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
                <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/20 to-accent-gold/40 z-10"></div>
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div 
                className="prose prose-invert max-w-none text-white/90"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="text-xs px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  Like ({selectedPost.likes})
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  Comment ({selectedPost.comments})
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
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
            <h1 className="text-2xl font-bold text-white">Blog & News</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Latest <span className="gold-text">Beauty Industry</span> Insights
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Stay updated with the latest trends, news, and expert insights from the beauty industry
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">Featured Posts</h3>
        <div className="grid gap-6">
          {featuredPosts.map(renderFeaturedPost)}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="luxury-card-enhanced border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-accent-gold text-primary-bg'
                    : 'text-white hover:text-accent-gold'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="luxury-card-enhanced border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              />
            </div>
            <Button variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(renderBlogCard)}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="luxury-card-enhanced mx-4 mb-8">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter for the latest beauty industry insights and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
            />
            <Button variant="luxury" className="flex items-center space-x-2">
              <ArrowRight className="w-4 h-4" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {renderPostModal()}
    </div>
  )
}

export default BlogNews
