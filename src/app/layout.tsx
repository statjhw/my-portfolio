import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { PersonStructuredData, WebsiteStructuredData } from "@/components/structured-data";
import { WebVitals } from "@/components/web-vitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 장현우 - 개발 포트폴리오',
    default: '장현우 - 개발 포트폴리오',
  },
  icons: {
    icon: '/vercel.svg',
    shortcut: '/vercel.svg',
    apple: '/vercel.svg',
  },
  description: 'Modern developer portfolio showcasing web development projects, blog posts, and technical expertise. Specializing in React, Next.js, TypeScript, and full-stack development.',
  keywords: ['developer', 'portfolio', 'web development', 'React', 'Next.js', 'TypeScript', 'full stack', 'frontend', 'backend'],
  authors: [{ name: '장현우' }],
  creator: '장현우',
  publisher: '장현우',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://yourportfolio.com',
    title: '장현우 - 개발 포트폴리오',
    description: 'Modern developer portfolio showcasing web development projects, blog posts, and technical expertise.',
    siteName: '장현우 - 개발 포트폴리오',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '장현우 - 개발 포트폴리오',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Doe - Full Stack Developer Portfolio',
    description: 'Modern developer portfolio showcasing web development projects, blog posts, and technical expertise.',
    images: ['/og-image.jpg'],
    creator: '@yourusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
    // yahoo: 'yahoo-site-verification-code',
  },
  alternates: {
    canonical: 'https://yourportfolio.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <WebVitals />
          <PersonStructuredData
            name="John Doe"
            jobTitle="Full Stack Developer"
            url="https://yourportfolio.com"
            email="contact@example.com"
            sameAs={[
              "https://github.com/statjhw",
              "https://linkedin.com/in/yourusername",
              "https://twitter.com/yourusername"
            ]}
            description="Full Stack Developer specializing in React, Next.js, and TypeScript. Passionate about creating modern web applications."
          />
          <WebsiteStructuredData
            name="John Doe Portfolio"
            url="https://yourportfolio.com"
            description="Modern developer portfolio showcasing web development projects, blog posts, and technical expertise."
            author="John Doe"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
