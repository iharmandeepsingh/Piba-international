'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  Quote, 
  Users, 
  Award, 
  Globe, 
  ExternalLink, 
  Building2, 
  Briefcase, 
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TestimonialsPartners = () => {
  const [activeTab, setActiveTab] = useState('testimonials')

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Professional Makeup Artist',
      location: 'New York, USA',
      image: '/images/testimonials/sarah.jpg',
      rating: 5,
      testimonial: 'PIBA International certification completely transformed my career. The training was comprehensive, the community is incredibly supportive, and the recognition has opened doors I never imagined possible. I highly recommend PIBA to any beauty professional serious about advancing their skills and global career.',
      achievements: ['Certified Makeup Artist', 'International Recognition', 'Featured Artist']
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Hairstylist & Salon Owner',
      location: 'Los Angeles, CA',
      image: '/images/testimonials/michael.jpg',
      rating: 5,
      testimonial: 'The business management courses through PIBA were game-changing. I learned not just advanced techniques but also how to run a successful salon. The networking opportunities alone are worth the investment.',
      achievements: ['Salon Owner', 'Business Excellence Award', 'Mentor Recognition']
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Nail Technician',
      location: 'London, UK',
      image: '/images/testimonials/emma.jpg',
      rating: 5,
      testimonial: 'PIBA\'s nail technology certification gave me the confidence to start my own business. The practical skills and industry connections I gained have been invaluable. The ongoing support from the PIBA community helps me stay current with trends and techniques.',
      achievements: ['Business Owner', 'Certification Excellence', 'Community Leader']
    },
    {
      id: 4,
      name: 'David Brown',
      role: 'Beauty Educator',
      location: 'Toronto, Canada',
      image: '/images/testimonials/david.jpg',
      rating: 5,
      testimonial: 'As an educator, PIBA International provides the most comprehensive curriculum and teaching resources. My students consistently achieve higher certification rates and job placement success. The professional development opportunities have helped me become a better instructor and leader in the beauty education community.',
      achievements: ['Master Educator', 'Curriculum Developer', 'Student Success Rate: 95%']
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Esthetician & Spa Owner',
      location: 'Sydney, Australia',
      image: '/images/testimonials/lisa.jpg',
      rating: 5,
      testimonial: 'The spa management certification through PIBA enabled me to expand my business internationally. The quality standards and operational excellence principles have elevated my spa to world-class status. PIBA\'s global network provides unparalleled business opportunities.',
      achievements: ['International Spa Owner', 'Quality Excellence Award', 'Global Expansion']
    },
    {
      id: 6,
      name: 'James Martinez',
      role: 'Fashion Stylist',
      location: 'Paris, France',
      image: '/images/testimonials/james.jpg',
      rating: 4,
      testimonial: 'PIBA International\'s fashion styling certification connected me with major fashion weeks and celebrity clients. The industry recognition and portfolio development guidance have been instrumental in building my international career.',
      achievements: ['Fashion Week Participation', 'Celebrity Stylist', 'International Recognition']
    }
  ]

  const partners = [
    {
      id: 1,
      name: 'L\'Oréal Professional',
      logo: '/images/partners/loreal.jpg',
      category: 'Cosmetics',
      description: 'Global leader in professional cosmetics and beauty products, supporting PIBA members with exclusive discounts and professional development opportunities.',
      website: 'https://www.loreal.com',
      tier: 'Platinum Partner'
    },
    {
      id: 2,
      name: 'Sephora Professional',
      logo: '/images/partners/sephora.jpg',
      category: 'Retail',
      description: 'Premier beauty retailer offering PIBA-certified professionals priority access to new products, training opportunities, and career advancement programs.',
      website: 'https://www.sephora.com',
      tier: 'Gold Partner'
    },
    {
      id: 3,
      name: 'Wella Professionals',
      logo: '/images/partners/wella.jpg',
      category: 'Hair Care',
      description: 'Innovative hair care and styling solutions provider offering advanced education and product access to PIBA members worldwide.',
      website: 'https://www.wella.com',
      tier: 'Gold Partner'
    },
    {
      id: 4,
      name: 'Dermalogica',
      logo: '/images/partners/dermalogica.jpg',
      category: 'Skincare',
      description: 'Medical-grade skincare solutions provider supporting PIBA estheticians with professional products, education, and clinical research partnerships.',
      website: 'https://www.dermalogica.com',
      tier: 'Silver Partner'
    },
    {
      id: 5,
      name: 'Beauty Schools Association',
      logo: '/images/partners/bsa.jpg',
      category: 'Education',
      description: 'International association representing beauty education institutions, providing accreditation and curriculum development support to PIBA member schools.',
      website: 'https://www.beautyschools.org',
      tier: 'Education Partner'
    },
    {
      id: 6,
      name: 'International Spa Association',
      logo: '/images/partners/isa.jpg',
      category: 'Spa & Wellness',
      description: 'Global organization representing spa and wellness establishments, offering industry standards, certification, and networking opportunities to PIBA members.',
      website: 'https://www.internationalspa.org',
      tier: 'Industry Partner'
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-piba-gold fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderTestimonialCard = (testimonial: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-start space-x-4 mb-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                <p className="text-sm text-piba-gold font-medium">{testimonial.role}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {testimonial.location}
                </div>
              </div>
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
            </div>
            
            <blockquote className="flex-1 italic text-gray-700 leading-relaxed">
              "{testimonial.testimonial}"
            </blockquote>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {testimonial.achievements.map((achievement: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2 bg-piba-gold/10 text-piba-gold px-3 py-1 rounded-full text-xs">
                    <Award className="w-3 h-3" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderPartnerCard = (partner: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 group">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-piba-gold transition-colors duration-300">
                {partner.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{partner.description}</p>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  partner.tier === 'Platinum Partner' ? 'bg-purple-100 text-purple-800' :
                  partner.tier === 'Gold Partner' ? 'bg-piba-gold text-white' :
                  partner.tier === 'Silver Partner' ? 'bg-gray-100 text-gray-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {partner.tier}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </Button>
              <Button variant="luxury" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                Partner Benefits
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'testimonials':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">What Our Members Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Success stories from beauty professionals worldwide who have transformed their careers with PIBA International certification
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => renderTestimonialCard(testimonial))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="luxury" className="inline-flex items-center space-x-2">
                <Star className="w-4 h-4" />
                Share Your Success Story
              </Button>
            </div>
          </div>
        )

      case 'partners':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Industry leaders who trust and support PIBA International members worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => renderPartnerCard(partner))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="luxury" className="inline-flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                Become a Partner
              </Button>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Quote className="w-12 h-12 mx-auto mb-4" />
              <p>Select a tab to view testimonials or partners</p>
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
            <h1 className="text-2xl font-bold text-white">Testimonials & Partners</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {['testimonials', 'partners'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab
                    ? 'text-piba-gold border-piba-gold'
                    : 'text-gray-600 border-transparent hover:text-piba-gold hover:border-piba-gold'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
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

export default TestimonialsPartners
