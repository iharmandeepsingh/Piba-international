'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  GraduationCap, 
  Users, 
  Store, 
  Briefcase, 
  CheckCircle, 
  Globe, 
  Calendar,
  CreditCard,
  Camera,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver } from '@/hooks/use-animation'

const Services = () => {
  const { ref, isIntersecting } = useIntersectionObserver()

  const services = [
    {
      icon: Award,
      title: 'Professional Certification',
      description: 'Get globally recognized certifications in makeup artistry, hairstyling, nail technology, and spa therapy.',
      features: ['Industry-recognized', 'Valid for 2 years', 'Digital certificates', 'Verification system'],
      price: 'From $299',
      popular: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: GraduationCap,
      title: 'Beauty Academy Recognition',
      description: 'Accredited recognition for beauty academies and training institutions worldwide.',
      features: ['Official accreditation', 'Marketing support', 'Student benefits', 'Global network'],
      price: 'From $999/year',
      popular: false,
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Membership Programs',
      description: 'Join our exclusive community of beauty professionals with premium benefits and networking opportunities.',
      features: ['Professional networking', 'Exclusive events', 'Discounted courses', 'Career support'],
      price: 'From $149/year',
      popular: false,
      color: 'from-piba-gold to-piba-gold-dark'
    },
    {
      icon: Store,
      title: 'Boutique Business Registration',
      description: 'Register your boutique business and gain access to our global marketplace and business resources.',
      features: ['Business verification', 'Marketplace access', 'Business tools', 'Customer trust'],
      price: 'From $399/year',
      popular: false,
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Briefcase,
      title: 'Training & Workshops',
      description: 'Advanced training programs and workshops led by industry experts and master professionals.',
      features: ['Expert instructors', 'Hands-on training', 'Certificate of completion', 'Online & offline'],
      price: 'From $199',
      popular: false,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      icon: CheckCircle,
      title: 'Skill Verification',
      description: 'Verify your skills and expertise with our comprehensive assessment and verification system.',
      features: ['Skill assessment', 'Digital badges', 'Profile verification', 'Employer trust'],
      price: 'From $99',
      popular: false,
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Globe,
      title: 'International Recognition',
      description: 'Get your qualifications and experience recognized across borders and continents.',
      features: ['Global acceptance', 'Document translation', 'Legal verification', 'Career mobility'],
      price: 'From $249',
      popular: false,
      color: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Calendar,
      title: 'Events & Awards',
      description: 'Participate in prestigious beauty events, competitions, and award ceremonies worldwide.',
      features: ['Industry events', 'Awards ceremony', 'Networking opportunities', 'Media exposure'],
      price: 'From $149',
      popular: false,
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: CreditCard,
      title: 'Digital Certificates',
      description: 'Secure, verifiable digital certificates with QR codes and blockchain verification.',
      features: ['QR code verification', 'Blockchain security', 'Instant sharing', 'Lifetime validity'],
      price: 'From $49',
      popular: false,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Camera,
      title: 'Professional ID Cards',
      description: 'Professional identification cards with photo, credentials, and verification features.',
      features: ['Photo ID', 'Credentials display', 'QR verification', 'Premium materials'],
      price: 'From $79',
      popular: false,
      color: 'from-teal-500 to-green-600'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      <div className="container-limited section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
            <span className="gold-text">Our Premium Services</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of services designed to elevate your beauty career 
            and boutique business to international standards.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="gold-gradient text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`luxury-card-enhanced p-8 h-full hover:shadow-gold transition-all duration-300 ${service.popular ? 'ring-2 ring-accent-gold/50' : ''}`}>
                {/* Icon */}
                <div className="w-16 h-16 luxury-card-enhanced flex items-center justify-center mb-6 mx-auto group-hover:shadow-gold">
                  <service.icon className="w-8 h-8 text-accent-gold" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-white/80">
                      <Star className="w-4 h-4 text-accent-gold mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-2xl font-bold text-white">
                    {service.price}
                  </span>
                  <span className="text-sm text-white/60 ml-2">
                    per month
                  </span>
                </div>

                {/* CTA Button */}
                <Button 
                  variant={service.popular ? "luxury" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {service.popular ? 'Get Started Now' : 'Learn More'}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-piba-gold/10 to-piba-gold-light/20 rounded-3xl p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-serif font-bold mb-6 text-piba-black">
            Ready to Elevate Your Career?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of beauty professionals who have transformed their careers 
            with PIBA International certifications and membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              Get Started Today
            </Button>
            <Button variant="outline" size="xl">
              Schedule Consultation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
