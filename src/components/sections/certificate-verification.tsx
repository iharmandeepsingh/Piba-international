'use client'

import React, { useState } from 'react'
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
  Globe,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

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

  const verifyCertificate = async (certNumber: string) => {
    setIsVerifying(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
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
        return <CheckCircle className="w-20 h-20 text-green-500" />
      case 'invalid':
        return <XCircle className="w-20 h-20 text-red-500" />
      case 'expired':
        return <AlertCircle className="w-20 h-20 text-yellow-500" />
      default:
        return <Search className="w-20 h-20 text-gray-500" />
    }
  }

  return (
    <section className="min-h-screen bg-slate-950 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Certificate Verification
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Verify the authenticity of PIBA International certificates instantly using our 
            secure verification system.
          </p>
        </div>

        {/* Verification Form */}
        <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-lg mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <QrCode className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Enter Certificate Number
              </h3>
              <p className="text-gray-400">
                Found on the certificate or scan the QR code
              </p>
            </div>
            
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="PIBA-XXXX-XXXXXX"
                  value={certificateNumber}
                  onChange={(e) => setCertificateNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 text-lg bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <Button
                onClick={handleVerify}
                disabled={isVerifying || !certificateNumber.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
                {isVerifying ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Example: PIBA-DEMO-123456
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card className={`border-2 backdrop-blur-lg ${
            verificationResult.status === 'valid'
              ? 'border-green-500/30 bg-green-500/10'
              : verificationResult.status === 'invalid'
              ? 'border-red-500/30 bg-red-500/10'
              : 'border-yellow-500/30 bg-yellow-500/10'
          }`}>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                {getStatusIcon(verificationResult.status || '')}
                <h3 className="text-3xl font-bold text-white mt-6 mb-2">
                  {verificationResult.status === 'valid' && 'Certificate Verified'}
                  {verificationResult.status === 'invalid' && 'Certificate Invalid'}
                  {verificationResult.status === 'expired' && 'Certificate Expired'}
                </h3>
                <p className="text-gray-400 text-lg">
                  {verificationResult.status === 'valid' && 'This certificate is authentic and valid.'}
                  {verificationResult.status === 'invalid' && verificationResult.message}
                  {verificationResult.status === 'expired' && 'This certificate has expired.'}
                </p>
              </div>

              {verificationResult.status === 'valid' && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <User className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-400">Certificate Holder</p>
                        <p className="font-semibold text-white">{verificationResult.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-400">Certification Type</p>
                        <p className="font-semibold text-white">{verificationResult.certificationType}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-400">Grade</p>
                        <p className="font-semibold text-white">{verificationResult.grade} ({verificationResult.score})</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-400">Issue Date</p>
                        <p className="font-semibold text-white">{verificationResult.issueDate ? new Date(verificationResult.issueDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-400">Expiry Date</p>
                        <p className="font-semibold text-white">{verificationResult.expiryDate ? new Date(verificationResult.expiryDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                      <QrCode className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-400">Verification ID</p>
                        <p className="font-semibold text-white">{verificationResult.verificationId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                {verificationResult.status === 'valid' && (
                <>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </>
                )}
                  <Button 
                    variant="outline"
                    className="border-slate-700 text-white hover:bg-slate-800"
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
        )}

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Why Verify with PIBA?
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Instant Verification</h4>
                <p className="text-gray-400 text-sm">
                  Get real-time verification results within seconds, ensuring quick and reliable certificate validation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Secure & Reliable</h4>
                <p className="text-gray-400 text-sm">
                  Our blockchain-backed verification system ensures tamper-proof certificate authenticity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">Globally Recognized</h4>
                <p className="text-gray-400 text-sm">
                  PIBA certificates are recognized and trusted by employers worldwide in the beauty industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CertificateVerification
