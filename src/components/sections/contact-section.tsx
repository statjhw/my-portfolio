'use client'

import { motion } from 'framer-motion'
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon, ClockIcon, GlobeIcon } from '@radix-ui/react-icons'
import { ContactForm } from './contact-form'

const contactInfo = [
  {
    icon: EnvelopeClosedIcon,
    label: 'Email',
    value: 'contact@example.com',
    href: 'mailto:contact@example.com',
  },
  {
    icon: GitHubLogoIcon,
    label: 'GitHub',
    value: 'github.com/username',
    href: 'https://github.com',
  },
  {
    icon: LinkedInLogoIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/username',
    href: 'https://linkedin.com',
  },
]

const workingHours = [
  'Monday - Friday: 9:00 AM - 6:00 PM',
  'Saturday: 10:00 AM - 2:00 PM',
  'Sunday: Closed',
]

export function ContactSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text">
          Get In Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'd love to hear from you.
          Drop me a message and I'll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
            <ContactForm />
          </motion.div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Contact Details */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const IconComponent = info.icon
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-card border border-border hover:bg-accent transition-colors group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Working Hours */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ClockIcon className="h-5 w-5 mr-2 text-primary" />
              Working Hours
            </h3>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-2">
                {workingHours.map((hours, index) => (
                  <div key={index} className="text-muted-foreground">
                    {hours}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                <GlobeIcon className="inline h-4 w-4 mr-1" />
                Timezone: UTC+9 (Seoul, South Korea)
              </div>
            </div>
          </motion.div>

          {/* Response Time */}
          <motion.div variants={itemVariants}>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2 text-primary">Quick Response</h3>
              <p className="text-sm text-muted-foreground">
                I typically respond to messages within 24 hours during business days.
                For urgent matters, feel free to reach out via email directly.
              </p>
            </div>
          </motion.div>

          {/* Available Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4">What I Can Help With</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Web Development',
                'Full-Stack Solutions',
                'Performance Optimization',
                'Technical Consulting',
                'Code Review',
                'Architecture Design',
              ].map((service) => (
                <div
                  key={service}
                  className="bg-secondary text-secondary-foreground px-3 py-2 rounded-lg text-sm text-center"
                >
                  {service}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}