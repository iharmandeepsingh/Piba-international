'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Lock,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Crown,
  Star,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createPaymentIntent, createCustomer, PRICING_PLANS, getStripePriceId } from '@/lib/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  clientSecret: string
  plan: 'professional' | 'premium'
  onSuccess: () => void
  onCancel: () => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  clientSecret, 
  plan, 
  onSuccess, 
  onCancel 
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: '',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setMessage('')

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          payment_method_data: {
            billing_details: {
              name: billingDetails.name,
              email: billingDetails.email,
              phone: billingDetails.phone,
              address: billingDetails.address,
            },
          },
        },
      })

      if (error) {
        setMessage(error.message || 'An unexpected error occurred.')
      } else if (paymentIntent?.status === 'succeeded') {
        setMessage('Payment successful! Redirecting...')
        setTimeout(() => onSuccess(), 2000)
      }
    } catch (error) {
      setMessage('An unexpected error occurred.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Billing Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Full Name
            </label>
            <Input
              placeholder="John Doe"
              value={billingDetails.name}
              onChange={(e) => setBillingDetails(prev => ({ ...prev, name: e.target.value }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={billingDetails.email}
              onChange={(e) => setBillingDetails(prev => ({ ...prev, email: e.target.value }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Phone Number
            </label>
            <Input
              placeholder="+1 (555) 123-4567"
              value={billingDetails.phone}
              onChange={(e) => setBillingDetails(prev => ({ ...prev, phone: e.target.value }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Country
            </label>
            <Input
              placeholder="United States"
              value={billingDetails.address.country}
              onChange={(e) => setBillingDetails(prev => ({ 
                ...prev, 
                address: { ...prev.address, country: e.target.value }
              }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Street Address
            </label>
            <Input
              placeholder="123 Main St"
              value={billingDetails.address.line1}
              onChange={(e) => setBillingDetails(prev => ({ 
                ...prev, 
                address: { ...prev.address, line1: e.target.value }
              }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              City
            </label>
            <Input
              placeholder="New York"
              value={billingDetails.address.city}
              onChange={(e) => setBillingDetails(prev => ({ 
                ...prev, 
                address: { ...prev.address, city: e.target.value }
              }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              State/Province
            </label>
            <Input
              placeholder="NY"
              value={billingDetails.address.state}
              onChange={(e) => setBillingDetails(prev => ({ 
                ...prev, 
                address: { ...prev.address, state: e.target.value }
              }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              ZIP/Postal Code
            </label>
            <Input
              placeholder="10001"
              value={billingDetails.address.postal_code}
              onChange={(e) => setBillingDetails(prev => ({ 
                ...prev, 
                address: { ...prev.address, postal_code: e.target.value }
              }))}
              className="bg-primary-bg/50 border-accent-gold/20 text-white placeholder-white/50"
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Element */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Payment Information</h3>
        <div className="luxury-card-enhanced p-4">
          <PaymentElement 
            options={{
              appearance: {
                theme: 'night',
                variables: {
                  colorBackground: '#1A1A1A',
                  colorText: '#FFFFFF',
                  colorDanger: '#EF4444',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center space-x-2 text-sm text-white/60">
        <Lock className="w-4 h-4" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      {/* Error Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successful') 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          <div className="flex items-center space-x-2">
            {message.includes('successful') ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="luxury"
          className="flex-1"
          disabled={isProcessing || !stripe || !elements}
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Complete Payment</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  )
}

const PaymentCheckout: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'professional' | 'premium'>('professional')
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    initializePayment()
  }, [selectedPlan])

  const initializePayment = async () => {
    setIsLoading(true)
    setError('')

    try {
      const plan = PRICING_PLANS[selectedPlan]
      const { clientSecret } = await createPaymentIntent(plan.price)
      setClientSecret(clientSecret)
    } catch (err) {
      setError('Failed to initialize payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = () => {
    setIsComplete(true)
  }

  const handlePaymentCancel = () => {
    // Navigate back to plan selection or home
    window.history.back()
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <Card className="luxury-card-enhanced text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
              <p className="text-white/80 mb-6">
                Thank you for your {PRICING_PLANS[selectedPlan].name} subscription. 
                You'll receive a confirmation email shortly.
              </p>
              <div className="space-y-3">
                <Button variant="luxury" className="w-full">
                  Go to Dashboard
                </Button>
                <Button variant="outline" className="w-full">
                  View Receipt
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full"
        >
          {/* Plan Selection */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Choose Your Membership</h1>
            <p className="text-white/80">Select the plan that best fits your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {Object.entries(PRICING_PLANS).map(([key, plan]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer ${
                  selectedPlan === key ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedPlan(key as 'professional' | 'premium')}
              >
                <Card className={`luxury-card-enhanced hover:shadow-gold transition-all duration-300 ${
                  selectedPlan === key ? 'border-accent-gold shadow-gold' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      {key === 'premium' && (
                        <div className="inline-flex items-center px-3 py-1 bg-accent-gold text-primary-bg text-xs font-semibold rounded-full mb-4">
                          <Crown className="w-3 h-3 mr-1" />
                          MOST POPULAR
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-accent-gold mb-2">
                        ${plan.price}
                        <span className="text-lg text-white/60">/{plan.interval}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-accent-gold flex-shrink-0" />
                          <span className="text-white/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant={selectedPlan === key ? 'luxury' : 'outline'}
                      className="w-full"
                    >
                      {selectedPlan === key ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-400 border border-red-500/30 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button 
              variant="luxury"
              onClick={initializePayment}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Initializing...</span>
                </div>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>Continue to Payment</span>
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      <div className="container-limited section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Complete Your Purchase</h1>
            <p className="text-white/80">
              You're upgrading to {PRICING_PLANS[selectedPlan].name}
            </p>
          </div>

          {/* Selected Plan Summary */}
          <Card className="luxury-card-enhanced mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {PRICING_PLANS[selectedPlan].name}
                  </h3>
                  <p className="text-white/60">Annual subscription</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-gold">
                    ${PRICING_PLANS[selectedPlan].price}
                  </div>
                  <p className="text-white/60">per year</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Form */}
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              plan={selectedPlan}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </Elements>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentCheckout
