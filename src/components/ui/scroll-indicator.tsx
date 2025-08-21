'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon } from '@radix-ui/react-icons'

interface ScrollIndicatorProps {
  targetId: string
}

export function ScrollIndicator({ targetId }: ScrollIndicatorProps) {
  const scrollToTarget = () => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.button
      onClick={scrollToTarget}
      className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
      whileHover={{ scale: 1.1 }}
      aria-label="Scroll down"
    >
      <span className="text-sm mb-2">Scroll Down</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDownIcon className="h-6 w-6" />
      </motion.div>
    </motion.button>
  )
}