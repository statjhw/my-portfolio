'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ui/project-card'
import { ProjectFilters } from '@/components/ui/project-filters'
import { Pagination } from '@/components/ui/pagination'
import { projects } from '@/data/projects'

const PROJECTS_PER_PAGE = 6

export function ProjectsGrid() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTechnology, setSelectedTechnology] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => 
                             tech.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      
      const matchesTechnology = selectedTechnology === 'all' || 
                               project.technologies.includes(selectedTechnology)

      return matchesSearch && matchesCategory && matchesTechnology
    })
  }, [searchTerm, selectedCategory, selectedTechnology])

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

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
      <ProjectFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        selectedTechnology={selectedTechnology}
        onSearchChange={(value) => handleFiltersChange(() => setSearchTerm(value))}
        onCategoryChange={(value) => handleFiltersChange(() => setSelectedCategory(value))}
        onTechnologyChange={(value) => handleFiltersChange(() => setSelectedTechnology(value))}
      />

      {/* Results Count */}
      <motion.div
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        Showing {currentProjects.length} of {filteredProjects.length} projects
        {filteredProjects.length !== projects.length && (
          <span> (filtered from {projects.length} total)</span>
        )}
      </motion.div>

      {/* Projects Grid */}
      {currentProjects.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${selectedCategory}-${selectedTechnology}-${searchTerm}-${currentPage}`}
        >
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria to find what you&apos;re looking for.
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