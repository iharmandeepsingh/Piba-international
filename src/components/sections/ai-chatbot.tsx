'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User,
  Sparkles,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  Calendar,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  typing?: boolean
}

interface QuickReply {
  text: string
  action: string
  icon?: React.ReactNode
}

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const beautyKnowledgeBase = {
    certifications: [
      'Professional Makeup Artistry Certification',
      'Skincare Specialist Certification',
      'Beauty Business Management',
      'Advanced Makeup Techniques',
      'Bridal & Special Event Makeup',
      'Special Effects Makeup'
    ],
    benefits: [
      'Industry-recognized credentials',
      'Professional networking opportunities',
      'Access to exclusive events',
      'Business growth resources',
      'Member directory listing',
      'Continuing education credits'
    ],
    requirements: [
      'High school diploma or equivalent',
      'Basic makeup experience (for advanced courses)',
      'Portfolio submission',
      'Written examination',
      'Practical demonstration'
    ],
    careers: [
      'Freelance Makeup Artist',
      'Salon/Spa Professional',
      'Beauty Consultant',
      'Makeup Educator',
      'Product Development',
      'Fashion/Runway Artist'
    ],
    trends: [
      'Clean beauty products',
      'Sustainable practices',
      'Inclusive beauty',
      'AI-powered tools',
      'Virtual try-on technology',
      'Personalized skincare'
    ]
  }

  const quickReplies: QuickReply[] = [
    {
      text: 'About Certifications',
      action: 'certifications',
      icon: <Award className="w-4 h-4" />
    },
    {
      text: 'Membership Benefits',
      action: 'benefits',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      text: 'Career Opportunities',
      action: 'careers',
      icon: <Users className="w-4 h-4" />
    },
    {
      text: 'Industry Trends',
      action: 'trends',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      text: 'Requirements',
      action: 'requirements',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      text: 'Upcoming Events',
      action: 'events',
      icon: <Calendar className="w-4 h-4" />
    }
  ]

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check for specific topics
    if (lowerMessage.includes('certification') || lowerMessage.includes('cert')) {
      return `PIBA International offers several professional certifications:\n\n${beautyKnowledgeBase.certifications.map(cert => `• ${cert}`).join('\n')}\n\nEach certification includes comprehensive training, hands-on practice, and industry recognition. Which certification interests you most?`
    }

    if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage')) {
      return `PIBA International membership provides numerous benefits:\n\n${beautyKnowledgeBase.benefits.map(benefit => `• ${benefit}`).join('\n')}\n\nOur members also get access to our exclusive job board and networking events. Would you like to know more about specific benefits?`
    }

    if (lowerMessage.includes('requirement') || lowerMessage.includes('qualif')) {
      return `To join PIBA International, you'll need:\n\n${beautyKnowledgeBase.requirements.map(req => `• ${req}`).join('\n')}\n\nDon't worry if you're just starting - we have beginner-friendly options too! What's your current experience level?`
    }

    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `PIBA certification opens doors to exciting careers:\n\n${beautyKnowledgeBase.careers.map(career => `• ${career}`).join('\n')}\n\nOur members have an average salary increase of 35% after certification. What career path interests you?`
    }

    if (lowerMessage.includes('trend') || lowerMessage.includes('latest')) {
      return `The beauty industry is evolving rapidly! Current trends include:\n\n${beautyKnowledgeBase.trends.map(trend => `• ${trend}`).join('\n')}\n\nPIBA members get early access to trend reports and training. Which trend would you like to explore?`
    }

    if (lowerMessage.includes('event') || lowerMessage.includes('workshop')) {
      return `PIBA International hosts regular events:\n\n• Monthly workshops (online & in-person)\n• Annual Beauty Expo\n• Networking mixers\n• Masterclass sessions\n• Certification ceremonies\n\nMembers get priority registration and discounted rates. Interested in any specific event type?`
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return `PIBA International offers flexible membership options:\n\n• Professional Membership: $299/year\n• Premium Membership: $599/year\n• Student discounts available\n• Payment plans offered\n\nBoth include certification access. Would you like to compare the plans?`
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! 👋 Welcome to PIBA International! I'm your beauty industry assistant. I can help you with:\n\n• Certification information\n• Membership benefits\n• Career guidance\n• Industry trends\n• Event details\n\nWhat would you like to know about?`
    }

    // Default response
    return `I'd be happy to help you with PIBA International! I can provide information about:\n\n• Professional certifications\n• Membership benefits\n• Career opportunities\n• Industry trends\n• Requirements\n• Upcoming events\n\nTry asking about any of these topics, or type "hello" to get started!`
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(message),
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `Hello! 👋 Welcome to PIBA International! I'm your beauty industry assistant. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [])

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="luxury"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-gold transition-all duration-300 relative group"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          
          {/* Hover tooltip */}
          <div className="absolute bottom-full mb-2 right-0 bg-primary-bg text-white px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            <div className="text-sm">Chat with AI Assistant</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary-bg"></div>
          </div>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <Card className={`luxury-card-enhanced shadow-2xl border border-accent-gold/20 ${
        isMinimized ? 'w-80' : 'w-96 h-[600px]'
      } flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-accent-gold/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-gold to-accent-gold/70 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-bg" />
            </div>
            <div>
              <h3 className="font-semibold text-white">PIBA Assistant</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-white/60">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/60 hover:text-white"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-accent-gold text-primary-bg' 
                          : 'bg-gradient-to-r from-accent-gold to-accent-gold/70 text-primary-bg'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className={`rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-accent-gold text-primary-bg'
                          : 'bg-primary-bg/50 text-white border border-accent-gold/20'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-primary-bg/70' : 'text-white/60'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent-gold to-accent-gold/70 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-bg" />
                    </div>
                    <div className="bg-primary-bg/50 text-white border border-accent-gold/20 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-accent-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, isTyping ? 3 : 6).map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs border-accent-gold/20 text-white/80 hover:text-accent-gold hover:border-accent-gold/40"
                    disabled={isTyping}
                  >
                    {reply.icon && <span className="mr-1">{reply.icon}</span>}
                    {reply.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-accent-gold/20">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about certifications, careers, trends..."
                  className="flex-1 bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  variant="luxury"
                  size="sm"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  )
}

export default AIChatbot
