'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Header } from './header'
import { Footer } from './footer'
import { SkipToContent } from '../ui/skip-to-content'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SkipToContent />
      <Header />
      
      <motion.main
        id="main-content"
        className="flex-1 pt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        tabIndex={-1}
        role="main"
      >
        {children}
      </motion.main>
      
      <Footer />
    </div>
  )
}