'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  X, 
  Check, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Briefcase,
  Camera,
  FileText,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CertificationApplication = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      country: ''
    },
    professionalInfo: {
      experience: '',
      qualifications: [] as string[],
      specialization: [] as string[],
      currentEmployer: '',
      portfolio: ''
    },
    certification: {
      type: '',
      additionalInfo: ''
    }
  })
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>>([])
  const [uploadedPhotos, setUploadedPhotos] = useState<Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url: string;
  }>>([])

  const certificationTypes = [
    'Makeup Artistry',
    'Hairstyling',
    'Nail Technology',
    'Esthetics/Skin Care',
    'Massage Therapy',
    'Spa Management',
    'Beauty Business Management',
    'Fashion Styling',
    'Bridal Services',
    'Special Effects Makeup'
  ]

  const specializations = [
    'Wedding Makeup',
    'Fashion Makeup',
    'Special Effects',
    'Hair Coloring',
    'Hair Cutting',
    'Hair Extensions',
    'Gel Nails',
    'Acrylic Nails',
    'Nail Art',
    'Facial Treatments',
    'Body Treatments',
    'Microblading'
  ]

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Professional Details', icon: Briefcase },
    { id: 3, title: 'Certification Type', icon: Star },
    { id: 4, title: 'Document Upload', icon: Upload },
    { id: 5, title: 'Review & Submit', icon: Check }
  ]

  const handleFileUpload = (files: FileList | null, type: 'documents' | 'photos') => {
    if (!files) return
    
    const newFiles = Array.from(files).map((file: File) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }))

    if (type === 'documents') {
      setUploadedDocuments([...uploadedDocuments, ...newFiles])
    } else {
      setUploadedPhotos([...uploadedPhotos, ...newFiles])
    }
  }

  const removeFile = (id: string, type: 'documents' | 'photos') => {
    if (type === 'documents') {
      setUploadedDocuments(uploadedDocuments.filter(file => file.id !== id))
    } else {
      setUploadedPhotos(uploadedPhotos.filter(file => file.id !== id))
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData, uploadedDocuments, uploadedPhotos)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">First Name *</label>
                <Input
                  value={formData.personalInfo.firstName}
                  onChange={(e) => updateFormData('personalInfo', 'firstName', e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Last Name *</label>
                <Input
                  value={formData.personalInfo.lastName}
                  onChange={(e) => updateFormData('personalInfo', 'lastName', e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email Address *</label>
                <Input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Date of Birth *</label>
                <Input
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => updateFormData('personalInfo', 'dateOfBirth', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Country *</label>
                <Input
                  value={formData.personalInfo.country}
                  onChange={(e) => updateFormData('personalInfo', 'country', e.target.value)}
                  placeholder="Your country"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Full Address *</label>
              <Input
                value={formData.personalInfo.address}
                onChange={(e) => updateFormData('personalInfo', 'address', e.target.value)}
                placeholder="Street address"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">City *</label>
                <Input
                  value={formData.personalInfo.city}
                  onChange={(e) => updateFormData('personalInfo', 'city', e.target.value)}
                  placeholder="Your city"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Professional Details</h3>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Years of Experience *</label>
              <Input
                value={formData.professionalInfo.experience}
                onChange={(e) => updateFormData('professionalInfo', 'experience', e.target.value)}
                placeholder="Number of years in the beauty industry"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Current Employer (Optional)</label>
              <Input
                value={formData.professionalInfo.currentEmployer}
                onChange={(e) => updateFormData('professionalInfo', 'currentEmployer', e.target.value)}
                placeholder="Company or salon name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Portfolio Website (Optional)</label>
              <Input
                value={formData.professionalInfo.portfolio}
                onChange={(e) => updateFormData('professionalInfo', 'portfolio', e.target.value)}
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Areas of Specialization *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {specializations.map((spec) => (
                  <label key={spec} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.professionalInfo.specialization.includes(spec)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData('professionalInfo', 'specialization', [...formData.professionalInfo.specialization, spec])
                        } else {
                          updateFormData('professionalInfo', 'specialization', formData.professionalInfo.specialization.filter(s => s !== spec))
                        }
                      }}
                      className="rounded text-piba-gold focus:ring-piba-gold"
                    />
                    <span className="text-sm">{spec}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Select Certification Type</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certificationTypes.map((type) => (
                <Card 
                  key={type}
                  className={`cursor-pointer transition-all duration-300 ${
                    formData.certification.type === type 
                      ? 'ring-2 ring-piba-gold shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => updateFormData('certification', 'type', type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        formData.certification.type === type 
                          ? 'bg-piba-gold border-piba-gold' 
                          : 'border-gray-300'
                      }`}>
                        {formData.certification.type === type && (
                          <Check className="w-3 h-3 text-white m-auto" />
                        )}
                      </div>
                      <span className="font-medium">{type}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Additional Information</label>
              <textarea
                value={formData.certification.additionalInfo}
                onChange={(e) => updateFormData('certification', 'additionalInfo', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                rows={4}
                placeholder="Any additional information about your certification request..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Upload Documents & Photos</h3>
            
            {/* Document Upload */}
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-piba-gold" />
                Required Documents
              </h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-piba-gold transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload your documents</p>
                <p className="text-sm text-gray-500 mb-4">ID, qualifications, experience certificates</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files, 'documents')}
                  className="hidden"
                  id="document-upload"
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const element = document.getElementById('document-upload') as HTMLInputElement
                    element?.click()
                  }}
                >
                  Choose Files
                </Button>
              </div>
              
              {uploadedDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedDocuments.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-piba-gold" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button
                        onClick={() => removeFile(file.id, 'documents')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-piba-gold" />
                Professional Photos
              </h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-piba-gold transition-colors">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload your professional photos</p>
                <p className="text-sm text-gray-500 mb-4">Work samples, portfolio images</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files, 'photos')}
                  className="hidden"
                  id="photo-upload"
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const element = document.getElementById('photo-upload') as HTMLInputElement
                    element?.click()
                  }}
                >
                  Choose Photos
                </Button>
              </div>
              
              {uploadedPhotos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedPhotos.map((file) => (
                    <div key={file.id} className="relative group">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFile(file.id, 'photos')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Review & Submit</h3>
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-piba-gold mb-2">Personal Information</h4>
                  <p className="text-sm text-gray-600">
                    {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{formData.personalInfo.email}</p>
                  <p className="text-sm text-gray-600">{formData.personalInfo.phone}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-piba-gold mb-2">Professional Details</h4>
                  <p className="text-sm text-gray-600">Experience: {formData.professionalInfo.experience} years</p>
                  <p className="text-sm text-gray-600">
                    Specializations: {formData.professionalInfo.specialization.join(', ')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-piba-gold mb-2">Certification</h4>
                  <p className="text-sm text-gray-600">Type: {formData.certification.type}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-piba-gold mb-2">Documents</h4>
                  <p className="text-sm text-gray-600">
                    Documents: {uploadedDocuments.length} files
                  </p>
                  <p className="text-sm text-gray-600">
                    Photos: {uploadedPhotos.length} files
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="luxury-card-enhanced p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Important Information</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    By submitting this application, you confirm that all provided information is accurate 
                    and authentic. False information may result in application rejection and potential 
                    legal consequences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg py-12">
      <div className="container-limited section-padding">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep >= step.id 
                      ? 'bg-piba-gold text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-piba-gold' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-4 ${
                    currentStep > step.id ? 'bg-piba-gold' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl">
            <CardContent className="p-8">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep === steps.length ? (
                  <Button variant="luxury" onClick={handleSubmit}>
                    Submit Application
                  </Button>
                ) : (
                  <Button variant="luxury" onClick={nextStep}>
                    Next Step
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default CertificationApplication
