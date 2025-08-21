import { notFound } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { ProjectDetail } from '@/components/sections/project-detail'
import { projects } from '@/data/projects'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <MainLayout>
      <ProjectDetail project={project} />
    </MainLayout>
  )
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}