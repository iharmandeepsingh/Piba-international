'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Award, 
  Calendar, 
  User, 
  FileText,
  Download,
  Share2,
  QrCode,
  Shield,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CertificateVerification = () => {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [verificationResult, setVerificationResult] = useState<{
    status: 'valid' | 'invalid' | 'expired' | null;
    certificateNumber?: string;
    name?: string;
    certificationType?: string;
    issueDate?: string;
    expiryDate?: string;
    qrCode?: string;
    verificationId?: string;
    issuer?: string;
    grade?: string;
    score?: string;
    message?: string;
  } | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  // Mock verification function
  const verifyCertificate = async (certNumber: string) => {
    setIsVerifying(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock data - in real app, this would be an API call
    if (certNumber === 'PIBA-DEMO-123456') {
      setVerificationResult({
        status: 'valid',
        certificateNumber: certNumber,
        name: 'Sarah Johnson',
        certificationType: 'Professional Makeup Artistry',
        issueDate: '2024-01-15',
        expiryDate: '2026-01-14',
        qrCode: 'QR-123456789',
        verificationId: 'VER-789456123',
        issuer: 'PIBA International',
        grade: 'Excellent',
        score: '95/100'
      })
    } else if (certNumber.length > 0) {
      setVerificationResult({
        status: 'invalid',
        message: 'Certificate not found or has been revoked'
      })
    } else {
      setVerificationResult(null)
    }
    
    setIsVerifying(false)
  }

  const handleVerify = () => {
    if (certificateNumber.trim()) {
      verifyCertificate(certificateNumber.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-16 h-16 text-green-500" />
      case 'invalid':
        return <XCircle className="w-16 h-16 text-red-500" />
      case 'expired':
        return <AlertCircle className="w-16 h-16 text-yellow-500" />
      default:
        return <Search className="w-16 h-16 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'text-green-600 border-green-200 bg-green-50'
      case 'invalid':
        return 'text-red-600 border-red-200 bg-red-50'
      case 'expired':
        return 'text-yellow-600 border-yellow-200 bg-yellow-50'
      default:
        return 'text-gray-600 border-gray-200 bg-gray-50'
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-piba-gold-light/10">
      <div className="container-limited section-padding">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 gold-gradient rounded-full mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            <span className="gold-text">Certificate Verification</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Verify the authenticity of PIBA International certificates instantly using our 
            secure verification system.
          </p>
        </motion.div>

        {/* Verification Form */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <QrCode className="w-12 h-12 text-piba-gold mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-piba-black mb-2">
                  Enter Certificate Number
                </h3>
                <p className="text-gray-600">
                  Found on the certificate or scan the QR code
                </p>
              </div>
              
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="PIBA-XXXX-XXXXXX"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-lg"
                />
                <Button
                  variant="luxury"
                  onClick={handleVerify}
                  disabled={isVerifying || !certificateNumber.trim()}
                  className="px-8"
                >
                  {isVerifying ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Verify'
                  )}
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Example: PIBA-DEMO-123456
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Verification Result */}
        {verificationResult && (
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className={`shadow-xl border-2 ${getStatusColor(verificationResult?.status || '')}`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  {getStatusIcon(verificationResult?.status || '')}
                  <h3 className="text-2xl font-bold mt-4 mb-2">
                    {verificationResult.status === 'valid' && 'Certificate Verified'}
                    {verificationResult.status === 'invalid' && 'Certificate Invalid'}
                    {verificationResult.status === 'expired' && 'Certificate Expired'}
                  </h3>
                  <p className="text-gray-600">
                    {verificationResult.status === 'valid' && 'This certificate is authentic and valid.'}
                    {verificationResult.status === 'invalid' && verificationResult.message}
                    {verificationResult.status === 'expired' && 'This certificate has expired.'}
                  </p>
                </div>

                {verificationResult.status === 'valid' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-piba-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Certificate Holder</p>
                          <p className="font-semibold">{verificationResult.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-piba-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Certification Type</p>
                          <p className="font-semibold">{verificationResult.certificationType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Award className="w-5 h-5 text-piba-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Grade</p>
                          <p className="font-semibold">{verificationResult.grade} ({verificationResult.score})</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-piba-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Issue Date</p>
                          <p className="font-semibold">{verificationResult.issueDate ? new Date(verificationResult.issueDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-piba-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Expiry Date</p>
                          <p className="font-semibold">{verificationResult.expiryDate ? new Date(verificationResult.expiryDate).toLocaleDateString() : 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <QrCode className="w-5 h-5 text-piba-gold" />
                        <div>
                          <p className="text-sm text-gray-500">Verification ID</p>
                          <p className="font-semibold">{verificationResult.verificationId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  {verificationResult.status === 'valid' && (
                  <>
                    <Button variant="luxury" className="flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </Button>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </>
                )}
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCertificateNumber('')
                      setVerificationResult(null)
                    }}
                  >
                    Verify Another Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-6 gold-text">
              Why Verify with PIBA?
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Instant Verification</h4>
              <p className="text-gray-600">
                Get real-time verification results within seconds, ensuring quick and reliable certificate validation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Secure & Reliable</h4>
              <p className="text-gray-600">
                Our blockchain-backed verification system ensures tamper-proof certificate authenticity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Globally Recognized</h4>
              <p className="text-gray-600">
                PIBA certificates are recognized and trusted by employers worldwide in the beauty industry.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CertificateVerification
