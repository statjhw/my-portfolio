'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeftIcon, GitHubLogoIcon, ExternalLinkIcon, CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Project } from '@/data/projects'
import { MarkdownRenderer } from '@/components/ui/markdown-renderer'

interface ProjectDetailProps {
  project: Project
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
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Button variant="ghost" size="sm" asChild>
          <Link href="/projects" className="flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{categoryIcons[project.category]}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
                <p className="text-xl text-muted-foreground mt-2">{project.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-lg overflow-hidden"
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-8xl opacity-30">{categoryIcons[project.category]}</div>
              </div>
            )}
            {/* Optional: Remove or reduce gradient overlay for better image visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4 text-sm text-white bg-black/50 px-2 py-1 rounded">
              {project.image ? project.title : 'Project Screenshot Placeholder'}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="prose dark:prose-invert max-w-none"
          >
            {project.markdownContent ? (
              <MarkdownRenderer content={project.markdownContent} />
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription}
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Project Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-6"
          >
            <h3 className="font-semibold text-lg mb-4">Project Details</h3>
            
            <div className="space-y-4">
              {/* Status */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[project.status]}`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>

              {/* Category */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Category</div>
                <div className="flex items-center gap-2">
                  <span>{categoryIcons[project.category]}</span>
                  <span className="font-medium capitalize">{project.category}</span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="text-sm">
                    {project.startDate} - {project.endDate || 'Present'}
                  </span>
                </div>
              </div>

              {/* Team Size */}
              <div>
                <div className="text-sm text-muted-foreground mb-1">Team Size</div>
                <div className="flex items-center gap-2">
                  <span>{project.teamSize === 1 ? '👤' : '👥'}</span>
                  <span className="text-sm font-medium">
                    {project.teamSize} {project.teamSize === 1 ? 'Person' : 'People'}
                  </span>
                </div>
              </div>

              {/* Featured */}
              {project.featured && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Featured</div>
                  <div className="flex items-center gap-2">
                    <span>⭐</span>
                    <span className="text-sm font-medium">Featured Project</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-3"
          >
            {project.githubUrl && (
              <Button asChild className="w-full">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GitHubLogoIcon className="h-4 w-4 mr-2" />
                  View Source Code
                </a>
              </Button>
            )}
            
            {project.liveUrl && (
              <Button variant="outline" asChild className="w-full">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="h-4 w-4 mr-2" />
                  View Live Demo
                </a>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}