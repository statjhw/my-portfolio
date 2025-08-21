'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (elementRef.current && chart) {
        try {
          // Initialize mermaid
          mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            securityLevel: 'loose',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            flowchart: {
              useMaxWidth: true,
              htmlLabels: true,
            },
          })

          // Clear the element
          elementRef.current.innerHTML = ''

          // Generate unique ID
          const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

          // Render the mermaid diagram
          const { svg } = await mermaid.render(id, chart)
          
          if (elementRef.current) {
            elementRef.current.innerHTML = svg
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error)
          if (elementRef.current) {
            elementRef.current.innerHTML = `<div class="text-red-500 p-4 border border-red-300 rounded">Error rendering diagram: ${error}</div>`
          }
        }
      }
    }

    renderDiagram()
  }, [chart])

  return (
    <div 
      ref={elementRef} 
      className={`mermaid-diagram overflow-x-auto ${className}`}
    />
  )
}