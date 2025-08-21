import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema, type ContactFormResponse } from '@/lib/contact-schema'

// In a real application, you would use a service like Resend, SendGrid, or Nodemailer
// For now, we'll simulate the email sending process

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the form data
    const validationResult = contactFormSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, company, message, honeypot } = validationResult.data

    // Check honeypot for spam
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Spam detected',
        },
        { status: 400 }
      )
    }

    // Basic rate limiting (in production, use a proper rate limiting solution)
    const userIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // TODO: Implement actual email sending logic here
    // Example with Resend:
    /*
    import { Resend } from 'resend'
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'Portfolio Contact <noreply@yourdomain.com>',
      to: [process.env.CONTACT_EMAIL!],
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
    */

    // Log the contact form submission (in production, use proper logging)
    console.log('Contact form submission:', {
      name,
      email,
      company,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
      ip: userIP,
    })

    const response: ContactFormResponse = {
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Contact form API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    )
  }
}