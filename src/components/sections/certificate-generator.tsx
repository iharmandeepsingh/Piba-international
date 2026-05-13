'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Save, 
  QrCode,
  Award,
  Calendar,
  User,
  CheckCircle,
  FileText,
  Settings,
  Palette,
  Type,
  Image
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const CertificateGenerator = () => {
  const [activeTab, setActiveTab] = useState('design')
  const [certificateData, setCertificateData] = useState({
    recipientName: '',
    certificationType: 'Professional Makeup Artistry',
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    certificateNumber: '',
    grade: 'Excellent',
    score: '95/100',
    issuerName: 'PIBA International',
    issuerSignature: '',
    additionalInfo: ''
  })
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [previewMode, setPreviewMode] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const templates = [
    {
      id: 'modern',
      name: 'Modern Gold',
      preview: 'Modern gold gradient with elegant typography',
      colors: {
        primary: '#D4AF37',
        secondary: '#F4E5C2',
        text: '#0A0A0A',
        accent: '#B8941F'
      }
    },
    {
      id: 'classic',
      name: 'Classic Black',
      preview: 'Traditional black and gold design',
      colors: {
        primary: '#0A0A0A',
        secondary: '#D4AF37',
        text: '#FFFFFF',
        accent: '#F4E5C2'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal White',
      preview: 'Clean white design with subtle gold accents',
      colors: {
        primary: '#FFFFFF',
        secondary: '#D4AF37',
        text: '#0A0A0A',
        accent: '#F5F5F5'
      }
    }
  ]

  const certificationTypes = [
    'Professional Makeup Artistry',
    'Advanced Hairstyling',
    'Nail Technology',
    'Esthetics & Skin Care',
    'Massage Therapy',
    'Spa Management',
    'Beauty Business Management',
    'Fashion Styling',
    'Bridal Services',
    'Special Effects Makeup'
  ]

  const generateCertificateNumber = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return `PIBA-${new Date().getFullYear()}-${random.toString().padStart(6, '0')}`
  }

  const handleGeneratePDF = () => {
    // In a real implementation, this would use a library like jsPDF or html2canvas
    // For now, we'll simulate the PDF generation
    console.log('Generating PDF with data:', certificateData)
    
    // Simulate PDF generation
    const pdfContent = `
      Certificate of Professional Achievement
      ----------------------------------------
      
      Certificate Number: ${certificateData.certificateNumber || generateCertificateNumber()}
      Recipient: ${certificateData.recipientName}
      Certification: ${certificateData.certificationType}
      Issue Date: ${certificateData.issueDate}
      Expiry Date: ${certificateData.expiryDate}
      Grade: ${certificateData.grade}
      Score: ${certificateData.score}
      
      Issued by: ${certificateData.issuerName}
      ${certificateData.issuerSignature ? 'Signature: ' + certificateData.issuerSignature : ''}
      
      ${certificateData.additionalInfo ? 'Additional Information: ' + certificateData.additionalInfo : ''}
      
      This certificate verifies that the named individual has successfully completed
      the requirements for professional certification in the beauty industry.
    `
    
    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `PIBA-Certificate-${certificateData.recipientName.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePreview = () => {
    setPreviewMode(!previewMode)
  }

  const renderCertificatePreview = () => {
    const template = templates.find(t => t.id === selectedTemplate)
    if (!template) return null

    return (
      <div 
        ref={certificateRef}
        className={`relative w-full max-w-4xl mx-auto p-12 rounded-lg shadow-2xl ${
          previewMode ? 'scale-100' : 'scale-75'
        } transition-transform duration-300`}
        style={{
          background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 50%, ${template.colors.primary} 100%)`,
          color: template.colors.text,
          fontFamily: 'Playfair Display, serif'
        }}
      >
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Award className="w-10 h-10" style={{ color: template.colors.accent }} />
          </div>
          <h1 className="text-4xl font-bold mb-2">Certificate of Professional Achievement</h1>
          <div className="w-32 h-1 bg-white/30 mx-auto mb-6"></div>
        </div>

        {/* Certificate Content */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm opacity-80 mb-2">Certificate Number:</p>
              <p className="font-semibold">{certificateData.certificateNumber || generateCertificateNumber()}</p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-2">Issue Date:</p>
              <p className="font-semibold">{certificateData.issueDate}</p>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{certificateData.recipientName || 'Your Name'}</h2>
            <p className="text-xl opacity-90 mb-6">has successfully achieved the standard of</p>
            <p className="text-2xl font-bold mb-6">{certificateData.certificationType}</p>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <p className="text-sm opacity-80 mb-2">Grade</p>
                <p className="text-xl font-bold">{certificateData.grade}</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80 mb-2">Score</p>
                <p className="text-xl font-bold">{certificateData.score}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm opacity-80 mb-2">Expiry Date:</p>
              <p className="font-semibold">{certificateData.expiryDate}</p>
            </div>
            <div>
              <p className="text-sm opacity-80 mb-2">Issued by:</p>
              <p className="font-semibold">{certificateData.issuerName}</p>
            </div>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex justify-between items-end">
            <div>
              {certificateData.additionalInfo && (
                <div className="mb-4">
                  <p className="text-sm opacity-80 mb-2">Additional Information:</p>
                  <p className="text-sm">{certificateData.additionalInfo}</p>
                </div>
              )}
              {certificateData.issuerSignature && (
                <div className="mb-4">
                  <p className="text-sm opacity-80 mb-2">Authorized Signature:</p>
                  <div className="text-sm font-serif italic">{certificateData.issuerSignature}</div>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 mb-4">
                <QrCode className="w-8 h-8" />
                <div className="text-xs">
                  <p>Verify Online</p>
                  <p className="font-mono">{certificateData.certificateNumber || generateCertificateNumber()}</p>
                </div>
              </div>
              <div className="text-xs opacity-70">
                <p>This certificate is valid for 2 years from the issue date.</p>
                <p>Verify authenticity at: piba-international.com/verify</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'design':
        return (
          <div className="space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? 'border-piba-gold bg-piba-gold/10'
                          : 'border-gray-200 hover:border-piba-gold/50'
                      }`}
                    >
                      <div className={`w-full h-20 rounded mb-3 flex items-center justify-center`}
                           style={{ background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)` }}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.preview}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificate Information */}
            <Card>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name *</label>
                    <Input
                      value={certificateData.recipientName}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, recipientName: e.target.value }))}
                      placeholder="Enter recipient's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certification Type *</label>
                    <select
                      value={certificateData.certificationType}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, certificationType: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                    >
                      {certificationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
                    <Input
                      type="date"
                      value={certificateData.issueDate}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, issueDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
                    <Input
                      type="date"
                      value={certificateData.expiryDate}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                    <select
                      value={certificateData.grade}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, grade: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Pass">Pass</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Score</label>
                    <Input
                      value={certificateData.score}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, score: e.target.value }))}
                      placeholder="e.g., 95/100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                    <textarea
                      value={certificateData.additionalInfo}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-piba-gold focus:border-piba-gold"
                      rows={3}
                      placeholder="Any additional notes or achievements"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Preview</CardTitle>
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    className="flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center">
                  {renderCertificatePreview()}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button variant="luxury" onClick={handleGeneratePDF} className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                Generate PDF
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                Save Template
              </Button>
            </div>
          </div>
        )

      case 'templates':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Certificate Templates</h2>
              <Button variant="luxury">
                <span className="w-4 h-4 mr-2 flex items-center justify-center bg-piba-gold text-white rounded-full">+</span>
                Create Template
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-full h-32 rounded mb-4 flex items-center justify-center`}
                         style={{ background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)` }}>
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{template.preview}</p>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Use
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Generation History</h2>
            
            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Sarah Johnson - Makeup Artistry</p>
                      <p className="text-sm text-gray-600">Generated 2 hours ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Michael Chen - Hairstyling</p>
                      <p className="text-sm text-gray-600">Generated 1 day ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p>Select a tab to get started</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-bg via-secondary-bg to-primary-bg">
      {/* Header */}
      <div className="luxury-card-enhanced shadow-lg border-b border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Certificate Generator</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8">
            {['design', 'templates', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab
                    ? 'text-piba-gold border-piba-gold'
                    : 'text-gray-600 border-transparent hover:text-piba-gold hover:border-piba-gold'
                }`}
              >
                {tab === 'design' && <Type className="w-4 h-4 mr-2" />}
                {tab === 'templates' && <Palette className="w-4 h-4 mr-2" />}
                {tab === 'history' && <Calendar className="w-4 h-4 mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default CertificateGenerator
