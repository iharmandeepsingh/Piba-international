'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'pa' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const translations: Record<Language, Record<string, string>> = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.certifications': 'Certifications',
      'nav.events': 'Events',
      'nav.gallery': 'Gallery',
      'nav.blog': 'Blog',
      'nav.contact': 'Contact',
      'nav.admin': 'Admin',
      'nav.dashboard': 'Dashboard',
      'nav.logout': 'Logout',
      
      // Header
      'header.title': 'PIBA International',
      'header.subtitle': 'Professionals in Beauty & Boutique',
      
      // Contact Page
      'contact.title': 'Contact Us',
      'contact.globalNetwork': 'Global Network',
      'contact.hero.title': 'Get in Touch with PIBA International',
      'contact.hero.subtitle': "We're here to help you succeed in your beauty career journey",
      'contact.emailSupport': 'Email Support',
      'contact.callUs': 'Call Us',
      'contact.email.title': 'Email Support',
      'contact.email.description': 'Get assistance from our support team via email',
      'contact.phone.title': 'Phone Support',
      'contact.phone.description': 'Speak directly with our support team during business hours',
      'contact.whatsapp.title': 'WhatsApp Support',
      'contact.whatsapp.description': 'Quick assistance via WhatsApp messaging',
      'contact.office.title': 'Head Office',
      'contact.office.description': 'Visit our main office for in-person consultations',
      'contact.sendEmail': 'Send Email',
      'contact.callNow': 'Call Now',
      'contact.whatsapp': 'WhatsApp',
      'contact.directions': 'Directions',
      'contact.form.title': 'Send us a Message',
      'contact.form.name': 'Full Name *',
      'contact.form.name.placeholder': 'Enter your full name',
      'contact.form.email': 'Email Address *',
      'contact.form.email.placeholder': 'your.email@example.com',
      'contact.form.phone': 'Phone Number',
      'contact.form.phone.placeholder': '+1 (555) 123-4567',
      'contact.form.inquiryType': 'Inquiry Type',
      'contact.form.inquiry.general': 'General Inquiry',
      'contact.form.inquiry.certification': 'Certification Question',
      'contact.form.inquiry.partnership': 'Partnership Opportunity',
      'contact.form.inquiry.technical': 'Technical Support',
      'contact.form.inquiry.feedback': 'Feedback & Suggestions',
      'contact.form.message': 'Message *',
      'contact.form.message.placeholder': 'Tell us how we can help you...',
      'contact.form.send': 'Send Message',
      'contact.form.sending': 'Sending...',
      'contact.form.success': "Your message has been sent successfully!",
      'contact.form.error': 'There was an error sending your message.',
      'contact.offices.title': 'Our Offices',
      'contact.social.title': 'Connect With Us',
      'contact.social.subtitle': 'Follow us for updates, tips, and industry news',
    },
    pa: {
      // Navigation
      'nav.home': 'ਘਰ',
      'nav.about': 'ਬਾਰੇ',
      'nav.services': 'ਸੇਵਾਵਾਂ',
      'nav.certifications': 'ਪ੍ਰਮਾਣੀਕਰਣ',
      'nav.events': 'ਪ੍ਰੋਗਰਾਮ',
      'nav.gallery': 'ਗੈਲਰੀ',
      'nav.blog': 'ਬਲੌਗ',
      'nav.contact': 'ਸੰਪਰਕ',
      'nav.admin': 'ਐਡਮਿਨ',
      'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
      'nav.logout': 'ਲੌਗ ਆਊਟ',
      
      // Header
      'header.title': 'PIBA ਇੰਟਰਨੈਸ਼ਨਲ',
      'header.subtitle': 'ਸੁੰਦਰਤਾ ਅਤੇ ਬੁਟੀਕ ਵਿੱਚ ਪੇਸ਼ੇਵਰ',
      
      // Contact Page
      'contact.title': 'ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      'contact.globalNetwork': 'ਗਲੋਬਲ ਨੈੱਟਵਰਕ',
      'contact.hero.title': 'PIBA ਇੰਟਰਨੈਸ਼ਨਲ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      'contact.hero.subtitle': 'ਅਸੀਂ ਤੁਹਾਡੇ ਸੁੰਦਰਤਾ ਕੈਰੀਅਰ ਸਫਰ ਵਿੱਚ ਸਫਲ ਹੋਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਇੱਥੇ ਹਾਂ',
      'contact.emailSupport': 'ਈਮੇਲ ਸਹਾਇਤਾ',
      'contact.callUs': 'ਸਾਡੇ ਨਾਲ ਕਾਲ ਕਰੋ',
      'contact.email.title': 'ਈਮੇਲ ਸਹਾਇਤਾ',
      'contact.email.description': 'ਈਮੇਲ ਰਾਹੀਂ ਸਾਡੀ ਸਹਾਇਤਾ ਟੀਮ ਤੋਂ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ',
      'contact.phone.title': 'ਫੋਨ ਸਹਾਇਤਾ',
      'contact.phone.description': 'ਕਾਰੋਬਾਰੀ ਘੰਟਿਆਂ ਦੌਰਾਨ ਸਾਡੀ ਸਹਾਇਤਾ ਟੀਮ ਨਾਲ ਸਿੱਧਾ ਗੱਲਬਾਤ ਕਰੋ',
      'contact.whatsapp.title': 'ਵ੍ਹਾਟਸਐਪ ਸਹਾਇਤਾ',
      'contact.whatsapp.description': 'ਵ੍ਹਾਟਸਐਪ ਸੁਨੇਹੇ ਰਾਹੀਂ ਤੁਰੰਤ ਸਹਾਇਤਾ',
      'contact.office.title': 'ਮੁੱਖ ਦਫਤਰ',
      'contact.office.description': 'ਵਿਅਕਤੀਗਤ ਸਲਾਹ ਲਈ ਸਾਡੇ ਮੁੱਖ ਦਫਤਰ ਦਾ ਦੌਰਾ ਕਰੋ',
      'contact.sendEmail': 'ਈਮੇਲ ਭੇਜੋ',
      'contact.callNow': 'ਹੁਣ ਕਾਲ ਕਰੋ',
      'contact.whatsapp': 'ਵ੍ਹਾਟਸਐਪ',
      'contact.directions': 'ਦਿਸ਼ਾਵਾਂ',
      'contact.form.title': 'ਸਾਡੇ ਨੂੰ ਸੁਨੇਹਾ ਭੇਜੋ',
      'contact.form.name': 'ਪੂਰਾ ਨਾਮ *',
      'contact.form.name.placeholder': 'ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
      'contact.form.email': 'ਈਮੇਲ ਪਤਾ *',
      'contact.form.email.placeholder': 'your.email@example.com',
      'contact.form.phone': 'ਫੋਨ ਨੰਬਰ',
      'contact.form.phone.placeholder': '+1 (555) 123-4567',
      'contact.form.inquiryType': 'ਪੁੱਛਗਿੱਛ ਦੀ ਕਿਸਮ',
      'contact.form.inquiry.general': 'ਆਮ ਪੁੱਛਗਿੱਛ',
      'contact.form.inquiry.certification': 'ਪ੍ਰਮਾਣੀਕਰਣ ਸਵਾਲ',
      'contact.form.inquiry.partnership': 'ਭਾਈਵਾਲੀ ਦੀ ਸੰਭਾਵਨਾ',
      'contact.form.inquiry.technical': 'ਤਕਨੀਕੀ ਸਹਾਇਤਾ',
      'contact.form.inquiry.feedback': 'ਪ੍ਰਤੀਕਰਮ ਅਤੇ ਸੁਝਾਅ',
      'contact.form.message': 'ਸੁਨੇਹਾ *',
      'contact.form.message.placeholder': 'ਸਾਨੂੰ ਦੱਸੋ ਕਿ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ...',
      'contact.form.send': 'ਸੁਨੇਹਾ ਭੇਜੋ',
      'contact.form.sending': 'ਭੇਜ ਰਿਹਾ ਹੈ...',
      'contact.form.success': 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜਿਆ ਗਿਆ!',
      'contact.form.error': 'ਸੁਨੇਹਾ ਭੇਜਣ ਵਿੱਚ ਇੱਕ ਗਲਤੀ ਆਈ।',
      'contact.offices.title': 'ਸਾਡੇ ਦਫਤਰ',
      'contact.social.title': 'ਸਾਡੇ ਨਾਲ ਜੁੜੋ',
      'contact.social.subtitle': 'ਅਪਡੇਟ, ਸੁਝਾਅ ਅਤੇ ਉਦਯੋਗ ਖਬਰਾਂ ਲਈ ਸਾਡੀ ਪਾਲਣਾ ਕਰੋ',
    },
    hi: {
      // Navigation
      'nav.home': 'होम',
      'nav.about': 'हमारे बारे में',
      'nav.services': 'सेवाएं',
      'nav.certifications': 'प्रमाणन',
      'nav.events': 'कार्यक्रम',
      'nav.gallery': 'गैलरी',
      'nav.blog': 'ब्लॉग',
      'nav.contact': 'संपर्क',
      'nav.admin': 'एडमिन',
      'nav.dashboard': 'डैशबोर्ड',
      'nav.logout': 'लॉग आउट',
      
      // Header
      'header.title': 'PIBA इंटरनेशनल',
      'header.subtitle': 'सौंदर्य और बुटीक में पेशेवर',
      
      // Contact Page
      'contact.title': 'संपर्क करें',
      'contact.globalNetwork': 'वैश्विक नेटवर्क',
      'contact.hero.title': 'PIBA इंटरनेशनल से संपर्क करें',
      'contact.hero.subtitle': 'हम आपके सौंदर्य करियर यात्रा में सफल होने में मदद करने के लिए यहां हैं',
      'contact.emailSupport': 'ईमेल सहायता',
      'contact.callUs': 'हमें कॉल करें',
      'contact.email.title': 'ईमेल सहायता',
      'contact.email.description': 'ईमेल के माध्यम से हमारी सहायता टीम से सहायता प्राप्त करें',
      'contact.phone.title': 'फोन सहायता',
      'contact.phone.description': 'व्यावसायिक घंटों के दौरान हमारी सहायता टीम से सीधे बात करें',
      'contact.whatsapp.title': 'व्हाट्सएप सहायता',
      'contact.whatsapp.description': 'व्हाट्सएप मैसेजिंग के माध्यम से त्वरित सहायता',
      'contact.office.title': 'मुख्य कार्यालय',
      'contact.office.description': 'व्यक्तिगत परामर्श के लिए हमारे मुख्य कार्यालय का दौरा करें',
      'contact.sendEmail': 'ईमेल भेजें',
      'contact.callNow': 'अभी कॉल करें',
      'contact.whatsapp': 'व्हाट्सएप',
      'contact.directions': 'दिशाएं',
      'contact.form.title': 'हमें संदेश भेजें',
      'contact.form.name': 'पूरा नाम *',
      'contact.form.name.placeholder': 'अपना पूरा नाम दर्ज करें',
      'contact.form.email': 'ईमेल पता *',
      'contact.form.email.placeholder': 'your.email@example.com',
      'contact.form.phone': 'फोन नंबर',
      'contact.form.phone.placeholder': '+1 (555) 123-4567',
      'contact.form.inquiryType': 'पूछताछ प्रकार',
      'contact.form.inquiry.general': 'सामान्य पूछताछ',
      'contact.form.inquiry.certification': 'प्रमाणन प्रश्न',
      'contact.form.inquiry.partnership': 'साझेदारी का अवसर',
      'contact.form.inquiry.technical': 'तकनीकी सहायता',
      'contact.form.inquiry.feedback': 'प्रतिक्रिया और सुझाव',
      'contact.form.message': 'संदेश *',
      'contact.form.message.placeholder': 'हमें बताएं कि हम आपकी कैसे मदद कर सकते हैं...',
      'contact.form.send': 'संदेश भेजें',
      'contact.form.sending': 'भेज रहा है...',
      'contact.form.success': 'आपका संदेश सफलतापूर्वक भेजा गया!',
      'contact.form.error': 'संदेश भेजने में एक त्रुटि हुई।',
      'contact.offices.title': 'हमारे कार्यालय',
      'contact.social.title': 'हमसे जुड़ें',
      'contact.social.subtitle': 'अपडेट, टिप्स और उद्योग समाचारों के लिए हमें फॉलो करें',
    },
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
