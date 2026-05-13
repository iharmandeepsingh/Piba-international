'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  X, 
  Smartphone, 
  Monitor, 
  Wifi, 
  WifiOff,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const PWAInstall: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [showOfflineBanner, setShowOfflineBanner] = useState(false)
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Check if app is already installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInWebAppiOS = (window.navigator as any).standalone === true
      const isInWebAppChrome = window.matchMedia('(display-mode: minimal-ui)').matches
      
      setIsInstalled(isStandalone || isInWebAppiOS || isInWebAppChrome)
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show install prompt after a delay
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true)
        }
      }, 5000)
    }

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      setInstallStatus('success')
      
      setTimeout(() => {
        setInstallStatus('idle')
      }, 3000)
    }

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineBanner(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineBanner(true)
    }

    // Check initial online status
    setIsOnline(navigator.onLine)

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if already installed
    checkInstalled()

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    setInstallStatus('installing')
    
    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setInstallStatus('success')
        setTimeout(() => {
          setInstallStatus('idle')
        }, 3000)
      } else {
        setInstallStatus('idle')
      }
      
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error('PWA install error:', error)
      setInstallStatus('error')
      setTimeout(() => {
        setInstallStatus('idle')
      }, 3000)
    }
  }

  const handleDismissPrompt = () => {
    setShowInstallPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  const getInstallInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      return {
        title: 'Install on Safari',
        steps: [
          'Tap the Share button in Safari',
          'Scroll down and tap "Add to Home Screen"',
          'Tap "Add" to confirm installation'
        ],
        icon: <Smartphone className="w-5 h-5" />
      }
    }
    
    if (userAgent.includes('chrome') || userAgent.includes('firefox')) {
      return {
        title: 'Install on Desktop',
        steps: [
          'Click the install button below',
          'Click "Install" in the prompt',
          'The app will be added to your desktop'
        ],
        icon: <Monitor className="w-5 h-5" />
      }
    }
    
    return {
      title: 'Install PWA',
      steps: [
        'Look for the install icon in your browser',
        'Follow the on-screen instructions',
        'Enjoy the app experience!'
      ],
      icon: <Download className="w-5 h-5" />
    }
  }

  const instructions = getInstallInstructions()

  if (isInstalled) {
    return null
  }

  return (
    <>
      {/* Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && !sessionStorage.getItem('pwa-install-dismissed') && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-40 max-w-sm"
          >
            <Card className="luxury-card-enhanced shadow-2xl border border-accent-gold/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Download className="w-5 h-5 text-accent-gold" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">Install PIBA App</h3>
                    <p className="text-sm text-white/80 mb-3">
                      Get the full app experience with offline access and push notifications
                    </p>
                    
                    {deferredPrompt ? (
                      <div className="flex space-x-2">
                        <Button
                          variant="luxury"
                          size="sm"
                          onClick={handleInstallClick}
                          disabled={installStatus === 'installing'}
                          className="flex items-center space-x-2"
                        >
                          {installStatus === 'installing' ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Installing...</span>
                            </>
                          ) : installStatus === 'success' ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              <span>Installed!</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3 h-3" />
                              <span>Install</span>
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDismissPrompt}
                          className="text-white/60 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-xs text-white/60">
                          {instructions.icon}
                          <span>{instructions.title}</span>
                        </div>
                        <div className="space-y-1">
                          {instructions.steps.map((step, index) => (
                            <div key={index} className="text-xs text-white/60 flex items-start space-x-2">
                              <span className="text-accent-gold">{index + 1}.</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDismissPrompt}
                          className="text-xs"
                        >
                          Got it
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Banner */}
      <AnimatePresence>
        {showOfflineBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <div className="bg-yellow-500/20 border-b border-yellow-500/30 backdrop-blur-sm">
              <div className="container-limited section-padding">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <WifiOff className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">You're offline</p>
                      <p className="text-white/60 text-sm">Some features may be limited</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    className="border-yellow-500/30 text-white/80 hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Status Indicator */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-xs transition-all duration-300 ${
          isOnline 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
        }`}>
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3" />
              <span>Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Install Status Toast */}
      <AnimatePresence>
        {installStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 right-4 z-50"
          >
            <Card className="luxury-card-enhanced border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">App Installed Successfully!</p>
                    <p className="text-white/60 text-sm">You can now access PIBA from your home screen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {installStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-20 right-4 z-50"
          >
            <Card className="luxury-card-enhanced border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Installation Failed</p>
                    <p className="text-white/60 text-sm">Please try again or follow the manual instructions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PWAInstall
