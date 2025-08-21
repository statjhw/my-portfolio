import { MainLayout } from '@/components/layout/main-layout'
import { BlogGrid } from '@/components/sections/blog-grid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my development blog for insights, experiences, and lessons learned from web development. Covering React, Next.js, TypeScript, and modern development practices.',
  openGraph: {
    title: 'Development Blog - HyeonWu Jang Portfolio',
    description: 'Read my development blog for insights, experiences, and lessons learned from web development.',
    url: 'https://yourportfolio.com/blog',
  },
  twitter: {
    title: 'Development Blog - HyeonWu Jang Portfolio',
    description: 'Read my development blog for insights, experiences, and lessons learned from web development.',
  },
}

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text leading-tight" style={{ lineHeight: '1.1' }}>
            Development Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            학습한 내용, 경험, 생각을 정리하는 블로그
          </p>
        </div>

        {/* Blog Grid */}
        <BlogGrid />
      </div>
    </MainLayout>
  )
}