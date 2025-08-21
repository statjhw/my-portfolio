import Script from 'next/script'

interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  url: string
  email: string
  sameAs: string[]
  description: string
}

export function PersonStructuredData({
  name,
  jobTitle,
  url,
  email,
  sameAs,
  description,
}: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    email,
    sameAs,
    description,
    alumniOf: {
      '@type': 'Organization',
      name: 'Your University', // 대학명으로 수정
    },
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Full Stack Development',
      'Frontend Development',
      'Backend Development',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Your Company', // 회사명으로 수정
    },
  }

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

interface WebsiteStructuredDataProps {
  name: string
  url: string
  description: string
  author: string
}

export function WebsiteStructuredData({
  name,
  url,
  description,
  author,
}: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name,
    url,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    genre: 'Portfolio',
    keywords: 'developer portfolio, web development, React, Next.js',
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}