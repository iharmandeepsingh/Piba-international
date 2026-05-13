'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Share2, 
  Camera, 
  Briefcase, 
  Play, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Professional Certification', href: '/services/certification' },
      { name: 'Membership Programs', href: '/services/membership' },
      { name: 'Training & Workshops', href: '/services/training' },
      { name: 'Business Registration', href: '/services/registration' },
      { name: 'Skill Verification', href: '/services/verification' },
      { name: 'International Recognition', href: '/services/recognition' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Leadership Team', href: '/about/team' },
      { name: 'Partners', href: '/partners' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press & Media', href: '/press' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Events', href: '/events' },
      { name: 'Gallery', href: '/gallery' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Support Center', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refund' },
      { name: 'Code of Conduct', href: '/conduct' },
      { name: 'Compliance', href: '/compliance' },
    ],
  }

  const socialLinks = [
    { icon: MessageCircle, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Share2, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Briefcase, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Play, href: 'https://youtube.com', label: 'YouTube' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'info@pibainternational.org', href: 'mailto:info@pibainternational.org' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: '123 Beauty Boulevard, Suite 100, New York, NY 10001', href: '#' },
  ]

  return (
   <footer className=" text-black">
  {/* Newsletter Section */}
  <div className="bg-yellow-500 py-16">
    <div className="container-limited section-padding">
      <div className="text-center max-w-3xl mx-auto">
        
        <motion.h2 
          className="text-3xl md:text-4xl font-serif font-bold mb-4 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Stay Connected with PIBA International
        </motion.h2>

        <motion.p 
          className="text-lg mb-8 text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get the latest updates on certifications, events, and industry insights
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 bg-white text-black border-black"
          />

          <Button 
            variant="luxury" 
            className="bg-black text-yellow-500 hover:bg-gray-800"
          >
            Subscribe
          </Button>

        </motion.div>
      </div>
    </div>
  </div>


      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container-limited section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-2 mb-6">
                      <img 
                        src="/images/logo.jpeg"
                        alt="PIBA International Logo"
                        className="w-6 h-6 object-contain"
                      />
                  <div>
                    <h3 className="text-xl font-serif font-bold gold-text">PIBA International</h3>
                    <p className="text-sm text-white/80">Professionals in Beauty & Boutique</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Empowering the global beauty and boutique industry with professional certifications, 
                  membership programs, and industry recognition since 2020.
                </p>

                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-piba-gold transition-colors duration-200"
                    >
                      <item.icon className="w-5 h-5 text-piba-gold" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 mt-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-piba-gold/10 rounded-full flex items-center justify-center hover:bg-piba-gold hover:text-piba-black transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 gold-text">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-piba-gold transition-colors duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 gold-text">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-piba-gold transition-colors duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 gold-text">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-piba-gold transition-colors duration-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span className="text-sm">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-piba-gold/20 py-8">
        <div className="container-limited section-padding">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p 
              className="text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              © {currentYear} PIBA International. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-piba-gold transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-piba-gray py-6">
        <div className="container-limited">
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            <span className="text-xs text-gray-400">ISO 9001:2015 Certified</span>
            <span className="text-xs text-gray-400">Globally Recognized</span>
            <span className="text-xs text-gray-400">SSL Secured</span>
            <span className="text-xs text-gray-400">GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
