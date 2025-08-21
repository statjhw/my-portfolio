import { MainLayout } from '@/components/layout/main-layout'
import { ProjectsGrid } from '@/components/sections/projects-grid'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of web development projects, including React applications, Next.js websites, mobile apps, and API development. See my technical skills in action.',
  openGraph: {
    title: 'Projects - HyeonWu Jang Portfolio',
    description: 'Explore my portfolio of web development projects, including React applications, Next.js websites, mobile apps, and API development.',
    url: 'https://yourportfolio.com/projects',
  },
  twitter: {
    title: 'Projects - HyeonWu Jang Portfolio',
    description: 'Explore my portfolio of web development projects, including React applications, Next.js websites, mobile apps, and API development.',
  },
}

export default function ProjectsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text leading-tight" style={{ lineHeight: '1.1' }}>
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            개발 프로젝트 모음집
          </p> 
        </div>

        {/* Projects Grid */}
        <ProjectsGrid />
      </div>
    </MainLayout>
  )
}