import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        source: 'piba-international',
      },
    })

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error('Stripe payment intent creation error:', error)
    throw new Error('Failed to create payment intent')
  }
}

export const createSubscription = async (priceId: string, customerId: string) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    })

    return {
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
    }
  } catch (error) {
    console.error('Stripe subscription creation error:', error)
    throw new Error('Failed to create subscription')
  }
}

export const createCustomer = async (email: string, name?: string) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        source: 'piba-international',
      },
    })

    return customer
  } catch (error) {
    console.error('Stripe customer creation error:', error)
    throw new Error('Failed to create customer')
  }
}

export const getCustomer = async (customerId: string) => {
  try {
    const customer = await stripe.customers.retrieve(customerId)
    return customer
  } catch (error) {
    console.error('Stripe customer retrieval error:', error)
    throw new Error('Failed to retrieve customer')
  }
}

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Stripe subscription cancellation error:', error)
    throw new Error('Failed to cancel subscription')
  }
}

export const retrievePaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return paymentIntent
  } catch (error) {
    console.error('Stripe payment intent retrieval error:', error)
    throw new Error('Failed to retrieve payment intent')
  }
}

// PIBA International pricing plans
export const PRICING_PLANS = {
  professional: {
    name: 'Professional Membership',
    price: 299,
    interval: 'year',
    features: [
      'Professional Certification',
      'Digital Badge & Certificate',
      'Member Directory Listing',
      'Industry Events Access',
      'Professional Resources',
      'Email Support',
    ],
  },
  premium: {
    name: 'Premium Membership',
    price: 599,
    interval: 'year',
    features: [
      'All Professional Features',
      'Advanced Certification Tracks',
      'Priority Event Registration',
      'Premium Member Badge',
      'Advanced Analytics',
      'Priority Support',
      'Exclusive Workshops',
      'Networking Events',
    ],
  },
}

export const getStripePriceId = (plan: 'professional' | 'premium') => {
  const priceMap = {
    professional: process.env.STRIPE_PRICE_PROFESSIONAL,
    premium: process.env.STRIPE_PRICE_PREMIUM,
  }
  
  const priceId = priceMap[plan]
  if (!priceId) {
    throw new Error(`No Stripe price ID configured for ${plan} plan`)
  }
  
  return priceId
}
