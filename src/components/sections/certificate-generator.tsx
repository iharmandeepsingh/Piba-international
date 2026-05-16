'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Download, 
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
  Image,
  Layout,
  Clock,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const CertificateGenerator = () => {
  const [activeTab, setActiveTab] = useState('design')
  const [generatedCertificateNumber, setGeneratedCertificateNumber] = useState('')
  const [isMounted, setIsMounted] = useState(false)
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

  useEffect(() => {
    setIsMounted(true)
    const certNumber = generateCertificateNumber()
    setGeneratedCertificateNumber(certNumber)
  }, [])

  const templates = [
    {
      id: 'modern',
      name: 'Modern Blue',
      preview: 'Modern blue gradient with elegant typography',
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        text: '#FFFFFF',
        accent: '#60A5FA'
      }
    },
    {
      id: 'dark',
      name: 'Dark Slate',
      preview: 'Dark slate theme with purple accents',
      colors: {
        primary: '#1E293B',
        secondary: '#334155',
        text: '#FFFFFF',
        accent: '#8B5CF6'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal White',
      preview: 'Clean white design with subtle blue accents',
      colors: {
        primary: '#FFFFFF',
        secondary: '#F1F5F9',
        text: '#0F172A',
        accent: '#3B82F6'
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
    console.log('Generating PDF with data:', certificateData)
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
        className={`relative w-full max-w-4xl mx-auto p-12 rounded-2xl shadow-2xl ${
          previewMode ? 'scale-100' : 'scale-75'
        } transition-transform duration-300`}
        style={{
          background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`,
          color: template.colors.text,
          fontFamily: 'Playfair Display, serif'
        }}
      >
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
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
              <p className="font-semibold">{certificateData.certificateNumber || (isMounted ? generatedCertificateNumber : '')}</p>
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
                  <p className="font-mono">{certificateData.certificateNumber || (isMounted ? generatedCertificateNumber : '')}</p>
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
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Choose Template</CardTitle>
                <CardDescription className="text-gray-400">Select a template style for your certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-blue-500/50 bg-slate-800/50'
                      }`}
                    >
                      <div className={`w-full h-20 rounded-lg mb-3 flex items-center justify-center`}
                           style={{ background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)` }}>
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{template.name}</h3>
                      <p className="text-sm text-gray-400">{template.preview}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certificate Information */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <CardTitle className="text-white">Certificate Details</CardTitle>
                <CardDescription className="text-gray-400">Fill in the certificate information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Name *</label>
                    <Input
                      value={certificateData.recipientName}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, recipientName: e.target.value }))}
                      placeholder="Enter recipient's full name"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Certification Type *</label>
                    <select
                      value={certificateData.certificationType}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, certificationType: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    >
                      {certificationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Issue Date *</label>
                    <Input
                      type="date"
                      value={certificateData.issueDate}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, issueDate: e.target.value }))}
                      className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date *</label>
                    <Input
                      type="date"
                      value={certificateData.expiryDate}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, expiryDate: e.target.value }))}
                      className="bg-slate-800 border-slate-700 text-white focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Grade</label>
                    <select
                      value={certificateData.grade}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, grade: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Pass">Pass</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Score</label>
                    <Input
                      value={certificateData.score}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, score: e.target.value }))}
                      placeholder="e.g., 95/100"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Additional Information</label>
                    <textarea
                      value={certificateData.additionalInfo}
                      onChange={(e) => setCertificateData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder:text-gray-500"
                      rows={3}
                      placeholder="Any additional notes or achievements"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-slate-800 bg-slate-900/50">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Preview</CardTitle>
                    <CardDescription className="text-gray-400">See how your certificate will look</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handlePreview}
                    className="border-slate-700 text-white hover:bg-slate-800"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {previewMode ? 'Edit Mode' : 'Preview Mode'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-center bg-slate-800/50 rounded-lg p-8">
                  {renderCertificatePreview()}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button onClick={handleGeneratePDF} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        )

      case 'templates':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Certificate Templates</h2>
                <p className="text-gray-400">Manage your certificate templates</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all">
                  <CardContent className="p-6">
                    <div className={`w-full h-32 rounded-lg mb-4 flex items-center justify-center`}
                         style={{ background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)` }}>
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{template.preview}</p>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
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
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Generation History</h2>
              <p className="text-gray-200">View previously generated certificates</p>
            </div>
            
            <Card className="border-slate-800 bg-slate-800/80">
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Johnson', type: 'Makeup Artistry', time: '2 hours ago' },
                    { name: 'Michael Chen', type: 'Hairstyling', time: '1 day ago' },
                    { name: 'Emma Wilson', type: 'Skincare Specialist', time: '3 days ago' },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border-b border-slate-700 last:border-0 bg-slate-700/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.name} - {item.type}</p>
                          <p className="text-sm text-gray-200 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Select a tab to get started</h3>
            <p className="text-gray-400">Choose an option from the navigation above</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Certificate Generator</h1>
                <p className="text-sm text-gray-400">Create professional certificates</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-1">
            {[
              { id: 'design', label: 'Design', icon: Layout },
              { id: 'templates', label: 'Templates', icon: Palette },
              { id: 'history', label: 'History', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'text-blue-500 border-blue-500'
                    : 'text-gray-400 border-transparent hover:text-white hover:border-slate-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {renderContent()}
      </div>
    </div>
  )
}

export default CertificateGenerator
