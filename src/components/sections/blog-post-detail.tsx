'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, BookmarkIcon, PersonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { DynamicMarkdownRenderer } from '@/components/ui/dynamic-markdown-renderer'
import { BlogPost } from '@/data/blog-posts'

interface BlogPostDetailProps {
  post: BlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const estimatedReadingTime = `약 ${post.readingTime}분`

  return (
    <article className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Button variant="ghost" size="sm" asChild>
          <Link href="/blog" className="flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </motion.div>

      {/* Header */}
      <header className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Empty space for centering */}
          <div className="hidden lg:block"></div>
          
          {/* Header Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Category Badge */}
            <div className="flex items-center space-x-3">
              <span className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full font-medium">
                {post.category}
              </span>
              {post.featured && (
                <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-sm px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center">
                <PersonIcon className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-2" />
                <span>{estimatedReadingTime}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Empty space to match sidebar */}
          <div className="hidden lg:block"></div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Empty space for centering */}
        <div className="hidden lg:block"></div>
        
        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3"
        >
          {/* Cover Image Placeholder */}
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-lg flex items-center justify-center overflow-hidden mb-12">
            <div className="text-8xl opacity-30">📝</div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
              Cover Image Placeholder
            </div>
          </div>

          {/* Article Content */}
          <DynamicMarkdownRenderer content={post.content} />
        </motion.main>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Table of Contents */}
          <div className="sticky top-24">
            {/* Post Info Card */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-lg mb-4">Post Information</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground mb-1">Published</div>
                  <div>{formatDate(post.publishedAt)}</div>
                </div>
                
                {post.updatedAt && (
                  <div>
                    <div className="text-muted-foreground mb-1">Updated</div>
                    <div>{formatDate(post.updatedAt)}</div>
                  </div>
                )}
                
                <div>
                  <div className="text-muted-foreground mb-1">Reading Time</div>
                  <div>{estimatedReadingTime}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Category</div>
                  <div>{post.category}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Tags
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex items-center text-xs bg-muted text-muted-foreground px-3 py-2 rounded-lg transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-16 pt-8 border-t border-border"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Continue reading</p>
            <Link 
              href="/blog"
              className="text-primary hover:underline font-medium"
            >
              ← Back to all posts
            </Link>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-2">Share this post</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    </article>
  )
}