'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { GitHubLogoIcon, ExternalLinkIcon } from '@radix-ui/react-icons'
import { projects } from '@/data/projects'
import { OptimizedImage } from './optimized-image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 1.5,
    },
  },
}

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
}

export function FeaturedProjects() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3)

  return (
    <motion.section
      className="mt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl md:text-4xl font-bold text-center mb-8 text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text"
        variants={itemVariants}
      >
        Featured Projects
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <motion.div
              className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <OptimizedImage
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  fallbackIcon="🚀"
                />
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 overflow-hidden" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const
                }}>
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.technologies.length - 3} more
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
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors z-10 relative"
                    aria-label="View source code"
                  >
                    <GitHubLogoIcon className="h-4 w-4" />
                  </button>
                )}
                {project.liveUrl && (
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors z-10 relative"
                    aria-label="View live demo"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      
      <motion.div
        className="text-center mt-8"
        variants={itemVariants}
      >
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 h-10 px-6 py-2"
        >
          View All Projects
        </Link>
      </motion.div>
    </motion.section>
  )
}