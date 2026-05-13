'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Globe, 
  Award, 
  Building, 
  Target, 
  Eye, 
  Heart, 
  Lightbulb,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIntersectionObserver, useCounter } from '@/hooks/use-animation'

const About = () => {
  const { ref, isIntersecting } = useIntersectionObserver()
  
  // Counter hooks for animated statistics
  const { count: certifiedCount, startAnimation: startCertified } = useCounter(50000, 2500)
  const { count: salonsCount, startAnimation: startSalons } = useCounter(12000, 2500)
  const { count: academiesCount, startAnimation: startAcademies } = useCounter(850, 2000)
  const { count: countriesCount, startAnimation: startCountries } = useCounter(120, 2000)

  useEffect(() => {
    if (isIntersecting) {
      startCertified()
      startSalons()
      startAcademies()
      startCountries()
    }
  }, [isIntersecting, startCertified, startSalons, startAcademies, startCountries])

  const stats = [
    { 
      icon: Users, 
      value: certifiedCount, 
      suffix: '+',
      label: 'Certified Professionals',
      color: 'from-blue-500 to-purple-600'
    },
    { 
      icon: Building, 
      value: salonsCount, 
      suffix: '+',
      label: 'Registered Salons',
      color: 'from-piba-gold to-piba-gold-dark'
    },
    { 
      icon: Award, 
      value: academiesCount, 
      suffix: '+',
      label: 'Partner Academies',
      color: 'from-green-500 to-teal-600'
    },
    { 
      icon: Globe, 
      value: countriesCount, 
      suffix: '+',
      label: 'Countries Served',
      color: 'from-red-500 to-pink-600'
    },
  ]

  const values = [
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of professionalism and ethics in all our certifications and partnerships.',
      color: 'text-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'Committed to excellence in beauty education, training, and professional development worldwide.',
      color: 'text-piba-gold'
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a global community of beauty professionals who support and inspire each other.',
      color: 'text-red-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing new technologies and techniques to advance the beauty and boutique industry.',
      color: 'text-purple-600'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      <div className="container-limited section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">
            <span className="gold-text">About PIBA International</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Leading the global beauty and boutique industry with professional certifications, 
            membership programs, and unwavering commitment to excellence since 2020.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="luxury-card-enhanced p-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Our Mission</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              To empower beauty professionals and boutique businesses worldwide with globally 
              recognized certifications, fostering excellence, innovation, and professional growth 
              in the beauty industry.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="luxury-card-enhanced p-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mr-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              To be the world's most trusted authority in beauty and boutique professional 
              certification, creating a global standard of excellence that elevates the entire industry.
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Statistics */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-serif font-bold text-center mb-12 gold-text">
            Our Impact by Numbers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 luxury-card-enhanced flex items-center justify-center mb-4 mx-auto group-hover:shadow-gold">
                  <stat.icon className="w-10 h-10 text-accent-gold" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-3xl font-serif font-bold text-center mb-12 gold-text">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="luxury-card-enhanced p-6 text-center hover:shadow-gold transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 luxury-card-enhanced flex items-center justify-center mb-4 mx-auto">
                  <value.icon className="w-8 h-8 text-accent-gold" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Standards */}
        <motion.div
          className="premium-card p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Star className="w-12 h-12 text-piba-gold mr-4" />
              <h3 className="text-3xl font-serif font-bold text-piba-black">
                Industry Standards & Compliance
              </h3>
              <Star className="w-12 h-12 text-piba-gold ml-4" />
            </div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              PIBA International maintains rigorous standards aligned with global beauty industry 
              regulations. Our certification programs are recognized by leading beauty associations, 
              government bodies, and employers worldwide, ensuring our members receive credentials 
              that truly matter in their professional journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-piba-gold/10 text-piba-gold rounded-full text-sm font-medium">
                ISO 9001:2015 Certified
              </span>
              <span className="px-4 py-2 bg-piba-gold/10 text-piba-gold rounded-full text-sm font-medium">
                Globally Recognized
              </span>
              <span className="px-4 py-2 bg-piba-gold/10 text-piba-gold rounded-full text-sm font-medium">
                Government Approved
              </span>
              <span className="px-4 py-2 bg-piba-gold/10 text-piba-gold rounded-full text-sm font-medium">
                Industry Accredited
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-serif font-bold mb-6 text-piba-black">
            Join Our Global Community
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Become part of a worldwide network of beauty professionals and boutique owners 
            who are shaping the future of the industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="luxury" size="xl">
              Join PIBA Today
            </Button>
            <Button variant="outline" size="xl">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
