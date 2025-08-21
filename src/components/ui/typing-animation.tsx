'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
}

export function TypingAnimation({
  text,
  duration = 50,
  className = '',
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, duration)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, duration, text])

  return (
    <div className={`${className} leading-none`} style={{ lineHeight: '1.1' }}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block"
      >
        |
      </motion.span>
    </div>
  )
}