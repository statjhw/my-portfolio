'use client'

import { motion } from 'framer-motion'
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/statjhw',
    icon: GitHubLogoIcon,
    hoverColor: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: LinkedInLogoIcon,
    hoverColor: 'hover:text-blue-600',
  },
  {
    name: 'Email',
    href: 'mailto:contact@example.com',
    icon: EnvelopeClosedIcon,
    hoverColor: 'hover:text-red-500',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export function SocialLinks() {
  return (
    <motion.div
      className="flex items-center space-x-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map((link) => {
        const IconComponent = link.icon
        return (
          <motion.div key={link.name} variants={itemVariants}>
            <motion.a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-muted-foreground transition-colors ${link.hoverColor}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.name}
            >
              <IconComponent className="h-6 w-6" />
            </motion.a>
          </motion.div>
        )
      })}
    </motion.div>
  )
}