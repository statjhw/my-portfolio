import { MainLayout } from '@/components/layout/main-layout'
import { ContactSection } from '@/components/sections/contact-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for web development projects, collaborations, or technical consulting. I specialize in React, Next.js, and full-stack development.',
  openGraph: {
    title: 'Contact - John Doe Portfolio',
    description: 'Get in touch with me for web development projects, collaborations, or technical consulting.',
    url: 'https://yourportfolio.com/contact',
  },
  twitter: {
    title: 'Contact - John Doe Portfolio', 
    description: 'Get in touch with me for web development projects, collaborations, or technical consulting.',
  },
}

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactSection />
    </MainLayout>
  )
}