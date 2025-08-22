'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import { MermaidDiagram } from './mermaid-diagram'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Customize heading styles
          h1: ({ children }) => (
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground border-b border-border pb-4">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-foreground">
              {children}
            </h3>
          ),
          // Customize paragraph styles  
          p: ({ children }) => {
            // Check if children contains only whitespace or empty content
            const textContent = React.Children.toArray(children).join('').trim();
            if (!textContent) {
              return null;
            }
            
            return (
              <p className="mb-4 leading-relaxed text-foreground/90 dark:text-foreground/95">
                {children}
              </p>
            );
          },
          // Customize list styles
          ul: ({ children }) => (
            <ul className="mb-4 ml-6 space-y-2 list-disc text-foreground/90 dark:text-foreground/95">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-6 space-y-2 list-decimal text-foreground/90 dark:text-foreground/95">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          // Customize code styles
          code: ({ className, children }: { className?: string; children?: React.ReactNode }) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const inline = !className || className.indexOf('language-') === -1
            
            if (inline) {
              return (
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">
                  {children}
                </code>
              )
            }

            // Handle Mermaid diagrams
            if (language === 'mermaid') {
              const chartContent = String(children).replace(/\n$/, '')
              return (
                <div className="my-6">
                  <MermaidDiagram chart={chartContent} />
                </div>
              )
            }

            return (
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                  <code className={`text-sm font-mono text-foreground ${className}`}>
                    {children}
                  </code>
                </pre>
              </div>
            )
          },
          // Customize blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/50 rounded-r-lg">
              <div className="text-foreground/85 dark:text-foreground/90 italic">{children}</div>
            </blockquote>
          ),
          // Customize link styles
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline underline-offset-4"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          // Customize image styles
          img: ({ src, alt }) => (
            <figure className="my-6">
              <img
                src={src}
                alt={alt}
                className="rounded-lg shadow-lg w-full h-auto"
              />
              {alt && (
                <figcaption className="text-sm text-muted-foreground text-center mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          // Customize table styles
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-border rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-4 py-2 text-foreground/90 dark:text-foreground/95">
              {children}
            </td>
          ),
          // Customize horizontal rule
          hr: () => (
            <hr className="my-8 border-t border-border" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}