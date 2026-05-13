'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  Clock, 
  Users, 
  ExternalLink, 
  CheckCircle,
  AlertCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const contactMethods = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get assistance from our support team via email',
      icon: Mail,
      contact: 'support@piba-international.com',
      action: 'mailto:support@piba-international.com'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Speak directly with our support team during business hours',
      icon: Phone,
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      description: 'Quick assistance via WhatsApp messaging',
      icon: MessageSquare,
      contact: '+1 (555) 987-6543',
      action: 'https://wa.me/15559876543'
    },
    {
      id: 'office',
      title: 'Head Office',
      description: 'Visit our main office for in-person consultations',
      icon: MapPin,
      contact: '123 Beauty Avenue, New York, NY 10001',
      action: 'https://maps.google.com/?q=123+Beauty+Avenue+New+York+NY+10001'
    }
  ]

  const officeLocations = [
    {
      city: 'New York',
      address: '123 Beauty Avenue, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      email: 'newyork@piba-international.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
    },
    {
      city: 'London',
      address: '456 Style Street, London, UK W1A 1AB',
      phone: '+44 20 7946 1234',
      email: 'london@piba-international.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Tokyo',
      address: '789 Beauty Boulevard, Tokyo, Japan 100-0001',
      phone: '+81 3 1234 5678',
      email: 'tokyo@piba-international.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM (JST)'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      {/* Header */}
      <div className="luxury-card-enhanced shadow-lg border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Contact Us</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                Global Network
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-piba-gold/10 via-piba-gold/5 to-piba-gold/10 py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Get in Touch with PIBA International
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're here to help you succeed in your beauty career journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                className="bg-white text-piba-gold border-piba-gold hover:bg-piba-gold hover:text-white"
                size="xl"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </Button>
              <Button 
                variant="outline" 
                className="bg-white text-piba-gold border-piba-gold hover:bg-piba-gold hover:text-white"
                size="xl"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{method.contact}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      asChild
                      className="w-full"
                    >
                      <a href={method.action} className="flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {method.id === 'email' ? 'Send Email' : 
                         method.id === 'phone' ? 'Call Now' : 
                         method.id === 'whatsapp' ? 'Message on WhatsApp' : 'Get Directions'}
                      </a>
                    </Button>
                  </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="certification">Certification Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    required
                    />
                  </div>
                </div>

                {/* Submit Status */}
                {submitStatus !== 'idle' && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mr-2" />
                      )}
                      <span className="font-medium">
                        {submitStatus === 'success' 
                          ? 'Your message has been sent successfully! We\'ll respond within 24 hours.'
                          : 'There was an error sending your message. Please try again or contact us directly.'}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="luxury"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-piba-gold border-t-transparent"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Our Offices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {officeLocations.map((location, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-5 h-5 text-piba-gold mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">{location.city}</h4>
                        <p className="text-gray-600 mb-2">{location.address}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-500" />
                            {location.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-gray-500" />
                            {location.email}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {location.hours}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Connect With Us</h2>
            <p className="text-gray-600 mb-8">Follow us for updates, tips, and industry news</p>
            <div className="flex justify-center space-x-6">
              <Button variant="outline" className="flex items-center space-x-2">
                <Facebook className="w-5 h-4" />
                Facebook
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Twitter className="w-5 h-4" />
                Twitter
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Instagram className="w-5 h-4" />
                Instagram
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Linkedin className="w-5 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Youtube className="w-5 h-4" />
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
