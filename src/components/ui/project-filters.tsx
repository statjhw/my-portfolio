'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { categories, technologies } from '@/data/projects'

interface ProjectFiltersProps {
  searchTerm: string
  selectedCategory: string
  selectedTechnology: string
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onTechnologyChange: (value: string) => void
}

export function ProjectFilters({
  searchTerm,
  selectedCategory,
  selectedTechnology,
  onSearchChange,
  onCategoryChange,
  onTechnologyChange,
}: ProjectFiltersProps) {
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
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category Filter */}
      <div className="w-full md:w-48">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
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

      {/* Technology Filter */}
      <div className="w-full md:w-48">
        <Select value={selectedTechnology} onValueChange={onTechnologyChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Technologies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technologies</SelectItem>
            {technologies.map((tech) => (
              <SelectItem key={tech} value={tech}>
                {tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  )
}