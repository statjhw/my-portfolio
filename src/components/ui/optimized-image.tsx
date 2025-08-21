'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src?: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackIcon?: React.ReactNode
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width = 600,
  height = 400,
  className,
  fallbackIcon,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // If no src or error occurred, show fallback
  if (!src || hasError) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 overflow-hidden',
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <div className="text-6xl opacity-50">
          {fallbackIcon || '🖼️'}
        </div>
        <div className="absolute inset-0 bg-muted/20" />
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center"
          style={{ aspectRatio: `${width}/${height}` }}
        >
          <div className="animate-pulse">
            <div className="text-4xl opacity-50">⏳</div>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}