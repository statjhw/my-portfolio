'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarIcon, ClockIcon, BookmarkIcon } from '@radix-ui/react-icons'
import { BlogPost } from '@/data/blog-posts'
import { OptimizedImage } from './optimized-image'

interface BlogPostCardProps {
  post: BlogPost
  index: number
}

export function BlogPostCard({ post, index }: BlogPostCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut' as const,
      },
    },
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        variants={cardVariants}
        className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
        whileHover={{ y: -4, scale: 1.01 }}
      >
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={post.coverImage}
            alt={`${post.title} cover image`}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            fallbackIcon="📝"
          />
          
          {/* Featured Badge */}
          {post.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
              {post.category}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Post Content */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
            <div className="flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center">
              <ClockIcon className="h-3 w-3 mr-1" />
              <span>{post.readingTime}분 읽기</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed overflow-hidden" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical' as const
          }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-xs bg-muted text-muted-foreground px-2 py-1 rounded transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <BookmarkIcon className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-muted-foreground self-center">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              by {post.author}
            </div>
            <span className="text-sm font-medium text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text">
              Read more →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  )
}