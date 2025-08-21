import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  // Simple spam prevention
  honeypot: z.string().max(0, 'Spam detected'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// API response types
export interface ContactFormResponse {
  success: boolean
  message: string
}

export interface ContactFormError {
  success: false
  message: string
  errors?: Record<string, string[]>
}