'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, BookmarkIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories, allTags } from '@/data/blog-posts'

interface BlogFiltersProps {
  searchTerm: string
  selectedCategory: string
  selectedTag: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onTagChange: (value: string) => void
}

export function BlogFilters({
  searchTerm,
  selectedCategory,
  selectedTag,
  onSearchChange,
  onCategoryChange,
  onTagChange,
}: BlogFiltersProps) {
  return (
    <motion.div
      className="space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Input */}
      <div className="relative flex-1 md:max-w-sm">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="w-full md:w-48">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tag Filter */}
      <div className="w-full md:w-48">
        <Select value={selectedTag} onValueChange={onTagChange}>
          <SelectTrigger className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
            <BookmarkIcon className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}