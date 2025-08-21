'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GitHubLogoIcon, ExternalLinkIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Project } from '@/data/projects'
import { OptimizedImage } from './optimized-image'

interface ProjectCardProps {
  project: Project
  index: number
}

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  maintenance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
}

const categoryIcons = {
  web: '🌐',
  mobile: '📱',
  desktop: '💻',
  api: '⚡',
  ai: '🤖',
  'data pipeline': '📊',
  tool: '🔧',
  statistics: '📈',
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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

  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        variants={cardVariants}
        className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
        whileHover={{ y: -8, scale: 1.02 }}
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={project.image}
            alt={`${project.title} project screenshot`}
            width={400}
            height={200}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            fallbackIcon={categoryIcons[project.category]}
          />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
              {project.status.replace('-', ' ')}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
              {project.category.toUpperCase()}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
            {project.featured && (
              <div className="text-yellow-500 text-sm">⭐</div>
            )}
          </div>

          <p className="text-muted-foreground text-sm mb-4 overflow-hidden" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const
          }}>
            {project.description}
          </p>

          {/* Date Range */}
          <div className="flex items-center text-xs text-muted-foreground mb-4">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>
              {project.startDate} - {project.endDate || 'Present'}
            </span>
          </div>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs text-muted-foreground self-center">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
          
          <div className="text-sm font-medium text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
            Learn more →
          </div>
        </div>
        
        {/* External Links */}
        <div className="flex justify-start space-x-3 px-6 pb-4">
          {project.githubUrl && (
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
              }}
              className="text-muted-foreground hover:text-primary transition-colors z-10 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View source code"
            >
              <GitHubLogoIcon className="h-4 w-4" />
            </motion.button>
          )}
          {project.liveUrl && (
            <motion.button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
              }}
              className="text-muted-foreground hover:text-primary transition-colors z-10 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View live demo"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </Link>
  )
}