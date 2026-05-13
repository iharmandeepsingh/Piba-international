'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  User,
  LogOut,
  Settings,
  Globe,
  Users,
  Award,
  Calendar,
  Camera,
  FileText,
  Mail
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'About', href: '/about', icon: User },
    { name: 'Services', href: '/services', icon: Award },
    { name: 'Certifications', href: '/certifications', icon: Settings },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Gallery', href: '/gallery', icon: Camera },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  return (
    <motion.header
      className={cn(
        'glass-effect top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'luxury-card-enhanced shadow-lg border-b border-accent-gold/20'
          : 'bg-primary-bg/80 backdrop-blur-sm'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-limited section-padding">
        <div className="flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="relative">
              <img 
                  src="/images/logo.jpeg"
                  alt="PIBA International Logo"
                  className="w-10 h-10 object-contain"
                />
            </div>

            <div className="hidden md:block">
              <h1 className="text-xl font-serif font-bold text-white">
                PIBA International
              </h1>

              <p className="text-xs text-white/80">
                Professionals in Beauty & Boutique
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="text-white hover:text-accent-gold transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">

            <Button
              variant="outline"
              className="border-accent-gold text-white hover:bg-accent-gold hover:text-primary-bg"
            >
              <Globe className="w-4 h-4 mr-2" />
              EN
            </Button>

            {/* Profile Menu */}
            <div className="relative">

              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setIsProfileMenuOpen(!isProfileMenuOpen)
                }
                className="text-white hover:text-accent-gold"
              >
                <User className="w-5 h-5" />
              </Button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-yellow-500 rounded-xl shadow-xl border border-black/20 overflow-hidden">

                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-3 text-black hover:bg-black hover:text-yellow-500 transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>

                  <button
                    className="w-full flex items-center text-left px-4 py-3 text-black hover:bg-black hover:text-yellow-500 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>

                </div>
              )}

            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-accent-gold"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 bg-yellow-500 rounded-xl shadow-2xl border border-black/20 overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="p-6 space-y-2">

              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-black hover:bg-black hover:text-yellow-500 transition-all duration-300 font-medium rounded-lg"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

            </nav>
          </motion.div>
        )}

      </div>
    </motion.header>
  )
}

export default Header

