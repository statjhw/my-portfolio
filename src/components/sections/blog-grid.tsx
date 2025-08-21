'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BlogPostCard } from '@/components/ui/blog-post-card'
import { BlogFilters } from '@/components/ui/blog-filters'
import { Pagination } from '@/components/ui/pagination'
import { blogPosts } from '@/data/blog-posts'

const POSTS_PER_PAGE = 6

export function BlogGrid() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter only published posts
  const publishedPosts = blogPosts.filter(post => post.published)

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => 
                             tag.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      
      const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })
  }, [searchTerm, selectedCategory, selectedTag, publishedPosts])

  // Sort posts by date (newest first) and featured posts first
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      // Featured posts first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then by date (newest first)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
  }, [filteredPosts])

  // Calculate pagination
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = sortedPosts.slice(startIndex, endIndex)

  // Reset to first page when filters change
  const handleFiltersChange = (callback: () => void) => {
    setCurrentPage(1)
    callback()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <BlogFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        onSearchChange={(value) => handleFiltersChange(() => setSearchTerm(value))}
        onCategoryChange={(value) => handleFiltersChange(() => setSelectedCategory(value))}
        onTagChange={(value) => handleFiltersChange(() => setSelectedTag(value))}
      />

      {/* Results Count */}
      <motion.div
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Showing {currentPosts.length} of {sortedPosts.length} posts
        {sortedPosts.length !== publishedPosts.length && (
          <span> (filtered from {publishedPosts.length} total)</span>
        )}
      </motion.div>

      {/* Blog Posts Grid */}
      {currentPosts.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${selectedCategory}-${selectedTag}-${searchTerm}-${currentPage}`}
        >
          {currentPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}