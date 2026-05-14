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
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  const { language, setLanguage, t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('nav.home'), href: '/', icon: Globe },
    { name: t('nav.about'), href: '/about', icon: User },
    { name: t('nav.services'), href: '/services', icon: Award },
    { name: t('nav.certifications'), href: '/certifications', icon: Settings },
    { name: t('nav.events'), href: '/events', icon: Calendar },
    { name: t('nav.gallery'), href: '/gallery', icon: Camera },
    { name: t('nav.blog'), href: '/blog', icon: FileText },
    { name: t('nav.contact'), href: '/contact', icon: Mail },
    { name: t('nav.admin'), href: '/admin', icon: Users },
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
                {t('header.title')}
              </h1>

              <p className="text-xs text-white/80">
                {t('header.subtitle')}
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

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="outline"
                className="border-accent-gold text-white hover:bg-accent-gold hover:text-primary-bg"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'en' ? 'EN' : language === 'pa' ? 'ਪੰ' : 'हि'}
              </Button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-yellow-500 rounded-xl shadow-xl border border-black/20 overflow-hidden">
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setIsLanguageMenuOpen(false)
                    }}
                    className="w-full flex items-center px-4 py-3 text-black hover:bg-black hover:text-yellow-500 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('pa')
                      setIsLanguageMenuOpen(false)
                    }}
                    className="w-full flex items-center px-4 py-3 text-black hover:bg-black hover:text-yellow-500 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    ਪੰਜਾਬੀ
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('hi')
                      setIsLanguageMenuOpen(false)
                    }}
                    className="w-full flex items-center px-4 py-3 text-black hover:bg-black hover:text-yellow-500 transition-colors duration-200"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    हिंदी
                  </button>
                </div>
              )}
            </div>

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

