'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { EnvelopeClosedIcon, PersonIcon, ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { contactFormSchema, type ContactFormData } from '@/lib/contact-schema'

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        toast.success('Message sent successfully!', {
          description: 'Thank you for your message. I\'ll get back to you soon.',
        })
        reset()
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message', {
        description: 'Please try again later or contact me directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 ${className}`}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Name Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name *
        </Label>
        <div className="relative">
          <PersonIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            placeholder="Your full name"
            className="pl-10"
            {...register('name')}
            aria-invalid={!!errors.name}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </motion.div>

      {/* Email Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email *
        </Label>
        <div className="relative">
          <EnvelopeClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            className="pl-10"
            {...register('email')}
            aria-invalid={!!errors.email}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </motion.div>

      {/* Company Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium">
          Company / Project <span className="text-muted-foreground">(Optional)</span>
        </Label>
        <Input
          id="company"
          placeholder="Your company or project name"
          {...register('company')}
          aria-invalid={!!errors.company}
        />
        {errors.company && (
          <p className="text-sm text-destructive">{errors.company.message}</p>
        )}
      </motion.div>

      {/* Message Field */}
      <motion.div variants={fieldVariants} className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Message *
        </Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project, questions, or how I can help you..."
          rows={6}
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        )}
      </motion.div>

      {/* Honeypot Field (Hidden from users) */}
      <div className="hidden">
        <Input
          {...register('honeypot')}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <motion.div variants={fieldVariants}>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || !isValid}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>

      {/* Form Info */}
      <motion.div
        variants={fieldVariants}
        className="text-sm text-muted-foreground"
      >
        <p>
          * Required fields. I typically respond within 24 hours during business days.
        </p>
      </motion.div>
    </motion.form>
  )
}