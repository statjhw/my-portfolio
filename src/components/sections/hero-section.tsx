'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { SocialLinks } from '@/components/ui/social-links'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { FeaturedProjects } from '@/components/ui/featured-projects'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

export function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Hero Content */}
      <motion.section
        className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <TypingAnimation
            text="HyeonWu Jang"
            duration={100}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg leading-tight"
          />
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-xl md:text-3xl font-medium text-transparent bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 bg-clip-text mb-4"
        >
          Data Engineer
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
        >
          배우고, 만들고, 개선하는 과정에서 진짜 재미를 느끼는 개발자입니다.
          매일 조금씩이라도 성장하는 모습을 보며 내일을 기대합니다.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-slate-500 to-blue-500 hover:from-slate-600 hover:to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
            <a href="#projects">View My Work</a>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-2 border-blue-400 text-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-white hover:border-transparent shadow-md hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-300 transform hover:scale-105">
            <a href="/contact">Get In Touch</a>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <SocialLinks />
        </motion.div>
      </motion.section>

      {/* Featured Projects */}
      <div className="container mx-auto px-4 pb-20" id="projects">
        <FeaturedProjects />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ScrollIndicator targetId="projects" />
      </div>
    </div>
  )
}