export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  role: 'user' | 'admin' | 'member'
  membershipStatus?: 'active' | 'inactive' | 'pending'
  membershipExpiry?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Certification {
  id: string
  userId: string
  certificateNumber: string
  type: CertificationType
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  issueDate?: Date
  expiryDate?: Date
  documents: Document[]
  photos: string[]
  notes?: string
  adminNotes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CertificationType {
  id: string
  name: string
  description: string
  category: string
  duration: string
  price: number
  requirements: string[]
  validityPeriod: number // in months
  isActive: boolean
}

export interface Document {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: Date
}

export interface MembershipPlan {
  id: string
  name: string
  description: string
  price: number
  duration: number // in months
  features: string[]
  isActive: boolean
  popular?: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'workshop' | 'seminar' | 'competition' | 'award' | 'expo'
  startDate: Date
  endDate: Date
  location: string
  price: number
  maxAttendees?: number
  currentAttendees: number
  images: string[]
  speakers: Speaker[]
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  createdAt: Date
}

export interface Speaker {
  id: string
  name: string
  bio: string
  avatar: string
  title: string
  company: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  thumbnailUrl: string
  tags: string[]
  featured: boolean
  createdAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorAvatar?: string
  coverImage?: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  content: string
  rating: number
  featured: boolean
  createdAt: Date
}

export interface Partner {
  id: string
  name: string
  logo: string
  website: string
  category: string
  featured: boolean
  createdAt: Date
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ApplicationForm {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    city: string
    country: string
  }
  professionalInfo: {
    experience: string
    qualifications: string[]
    specialization: string[]
    currentEmployer?: string
    portfolio?: string
  }
  certification: {
    type: string
    documents: File[]
    photos: File[]
    additionalInfo?: string
  }
}

export interface CertificateTemplate {
  id: string
  name: string
  design: CertificateDesign
  isActive: boolean
}

export interface CertificateDesign {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  fontFamily: string
  titleColor: string
  textColor: string
  logoPosition: 'top-left' | 'top-center' | 'top-right'
  signaturePosition: 'bottom-left' | 'bottom-center' | 'bottom-right'
}

export interface Payment {
  id: string
  userId: string
  type: 'membership' | 'certification' | 'event' | 'donation'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  method: 'stripe' | 'razorpay' | 'paypal' | 'bank'
  transactionId?: string
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

export interface Analytics {
  totalUsers: number
  totalCertifications: number
  totalRevenue: number
  activeMembers: number
  monthlyGrowth: number
  popularCertifications: Array<{
    type: string
    count: number
  }>
  recentActivity: Array<{
    type: string
    description: string
    timestamp: Date
  }>
}
