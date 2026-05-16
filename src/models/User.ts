import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user',
  },
  membershipType: {
    type: String,
    enum: ['free', 'professional', 'premium'],
    default: 'free',
  },
  membershipExpiresAt: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    bio: String,
    website: String,
    socialLinks: {
      instagram: String,
      facebook: String,
      linkedin: String,
      twitter: String,
    },
  },
  professional: {
    businessName: String,
    businessLicense: String,
    specialties: [String],
    experience: Number,
    certifications: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification'
    }],
    portfolio: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio'
    }],
  },
  payments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)
