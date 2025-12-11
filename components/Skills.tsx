'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  category: 'programming' | 'server' | 'client' | 'cloud' | 'database' | 'tools'
}

const skills: Skill[] = [
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'Java', level: 88, category: 'programming' },
  { name: 'C#', level: 85, category: 'programming' },
  { name: 'C/C++', level: 80, category: 'programming' },
  { name: 'JavaScript', level: 92, category: 'programming' },
  { name: 'Django', level: 90, category: 'server' },
  { name: 'Flask', level: 88, category: 'server' },
  { name: 'Node.js', level: 87, category: 'server' },
  { name: 'Express', level: 85, category: 'server' },
  { name: 'ASP.NET', level: 85, category: 'server' },
  { name: 'MVC 4', level: 82, category: 'server' },
  { name: 'React', level: 88, category: 'client' },
  { name: 'Angular 5', level: 85, category: 'client' },
  { name: 'HTML/CSS', level: 92, category: 'client' },
  { name: 'jQuery', level: 88, category: 'client' },
  { name: 'Ionic & Cordova', level: 75, category: 'client' },
  { name: 'AWS', level: 85, category: 'cloud' },
  { name: 'AWS EC2', level: 85, category: 'cloud' },
  { name: 'AWS S3', level: 80, category: 'cloud' },
  { name: 'AWS API Gateway', level: 82, category: 'cloud' },
  { name: 'GCP', level: 80, category: 'cloud' },
  { name: 'IBM Bluemix', level: 70, category: 'cloud' },
  { name: 'MySQL', level: 90, category: 'database' },
  { name: 'SQL Server', level: 88, category: 'database' },
  { name: 'MongoDB', level: 85, category: 'database' },
  { name: 'Neo4j', level: 80, category: 'database' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'SSIS', level: 85, category: 'tools' },
  { name: 'SSRS', level: 82, category: 'tools' },
  { name: 'Chef DK', level: 80, category: 'tools' },
  { name: 'Ruby', level: 75, category: 'tools' },
  { name: 'JIRA', level: 85, category: 'tools' },
  { name: 'Visual Studio', level: 90, category: 'tools' },
  { name: 'EOSIO', level: 75, category: 'tools' },
  { name: 'Android Studio', level: 75, category: 'tools' },
  { name: 'XCode', level: 70, category: 'tools' },
  { name: 'Tortoise SVN', level: 80, category: 'tools' },
  { name: 'MeisterTask', level: 75, category: 'tools' },
  { name: 'IIS', level: 85, category: 'server' },
  { name: 'Apache', level: 80, category: 'server' },
  { name: 'Microsoft Visio', level: 80, category: 'tools' },
  { name: 'IBM Rational Rose', level: 70, category: 'tools' },
  { name: 'Mind-Meister', level: 75, category: 'tools' },
]

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const handleCommand = (event: CustomEvent) => {
      const type = event.detail?.type
      const payload = event.detail?.payload

      if (type === 'show-skills') {
        setActiveCategory(payload?.category || null)
      }
    }

    window.addEventListener('portfolioCommand', handleCommand as EventListener)
    return () => window.removeEventListener('portfolioCommand', handleCommand as EventListener)
  }, [])

  const filteredSkills =
    activeCategory === null
      ? skills
      : skills.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" ref={ref} className="py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border border-green-500/30 bg-black/50 p-4 sm:p-6"
        >
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-2">
              $ cat skills.txt
            </h2>
            <div className="h-px bg-green-500/30 mb-4"></div>
          </div>

          {activeCategory && (
            <div className="mb-4 text-green-300 text-xs sm:text-sm">
              <span className="text-green-500">$</span> Category: <span className="text-green-400">{activeCategory}</span>
            </div>
          )}

          <div className="space-y-2 sm:space-y-2.5">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap sm:flex-nowrap"
              >
                <span className="text-green-300 text-xs sm:text-sm w-24 sm:w-32 shrink-0">{skill.name}</span>
                <div className="flex-1 min-w-0 bg-green-900/20 border border-green-500/20 h-3 sm:h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.02 + 0.1, duration: 0.5 }}
                    className="h-full bg-green-500"
                  />
                </div>
                <span className="text-green-400 text-xs w-10 sm:w-12 text-right shrink-0">{skill.level}%</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 text-green-500/50 text-xs">
            $ _
          </div>
        </motion.div>
      </div>
    </section>
  )
}

