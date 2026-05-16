import Header from '@/components/layout/header'
import CertificateVerification from '@/components/sections/certificate-verification'
import CertificateGenerator from '@/components/sections/certificate-generator'

export default function CertificationsPage() {
  return (
    <>
      <Header />
      <div className="space-y-12">
        <CertificateVerification />
        <CertificateGenerator />
      </div>
    </>
  )
}
