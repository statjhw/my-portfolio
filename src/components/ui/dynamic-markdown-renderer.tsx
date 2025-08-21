'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const MarkdownRenderer = dynamic(
  () => import('./markdown-renderer').then((mod) => ({ default: mod.MarkdownRenderer })),
  {
    ssr: false,
    loading: () => (
      <div className="prose dark:prose-invert max-w-none">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      </div>
    ),
  }
)

interface DynamicMarkdownRendererProps {
  content: string
  className?: string
}

export function DynamicMarkdownRenderer({ content, className }: DynamicMarkdownRendererProps) {
  return (
    <Suspense fallback={
      <div className="prose dark:prose-invert max-w-none">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
        </div>
      </div>
    }>
      <MarkdownRenderer content={content} className={className} />
    </Suspense>
  )
}