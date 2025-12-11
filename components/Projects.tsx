'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'RIBS Framework',
    description: 'Built a comprehensive invoicing framework using Flask, MySQL, and AWS API Gateway. Facilitates clients with their invoicing systems and reduced invoicing/reconciliation effort by 65%.',
    technologies: ['Flask', 'MySQL', 'AWS API Gateway', 'Python'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 2,
    title: 'Forge Automation Framework',
    description: 'Core developer and leader of automation framework using Chef DK and Ruby. Identifies hardware systems, fetches latest updates (software and firmware), stores in artifacts server, and releases to customers over the air seamlessly. Improved hardware infrastructure stability by 10%.',
    technologies: ['Chef DK', 'Ruby', 'AWS', 'Automation'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 3,
    title: 'Data Integration System',
    description: 'Designed a data integration system using Microsoft SSIS to collect bulk data from various sources and store in a central database for various 3rd party integrations.',
    technologies: ['SSIS', 'SQL Server', 'ETL', 'Data Integration'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 4,
    title: 'MustMotivate Platform',
    description: 'Core developer of MustMotivate platform built with MEAN stack. Introduced cross-border transactions and fundraising events using EOS blockchain, which became major selling points of the website.',
    technologies: ['MEAN Stack', 'MongoDB', 'Express', 'Angular 4/5', 'Node.js', 'EOSIO', 'AWS EC2', 'AWS S3'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 5,
    title: 'PetersenDean Portal',
    description: 'Core developer of PetersenDeanPortal built using PHP, JavaScript/jQuery, and MySQL. Implemented Territory Management and Financing features which improved sales by 25% in one year.',
    technologies: ['PHP', 'JavaScript', 'jQuery', 'MySQL', 'AWS EC2', 'AWS S3'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 6,
    title: 'Active Rules for Graph Databases',
    description: 'Built prototype application to simulate active rules in Graph Databases using Neo4j. Defined active rules for Supply Chain Management System. Built custom Java app which reads Cypher input, parses values and executes rules on Neo4j using BOLT framework.',
    technologies: ['Neo4j', 'Java', 'BOLT Framework', 'NoSQL'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 7,
    title: 'Sci-IoT Web Application',
    description: 'Graduate research project - IoT web application that reads data from various sensors (CO2, Temperature, pH level) to support research projects like Aquaponics, Bio-Diesel, and Gasifier. Led by Dean Dr. L.M. Smith.',
    technologies: ['Node.js', 'Node-RED', 'IBM Bluemix', 'Arduino', 'C/C++', 'Data Visualization'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 8,
    title: 'B\'s Portfolio (Voice-Controlled)',
    description: 'Voice command controllable website with HTML, CSS, REST, Google DialogFlow and Firebase. Can update all personal details of the user dynamically via voice commands.',
    technologies: ['HTML', 'CSS', 'DialogFlow', 'Firebase', 'REST API'],
    github: 'https://github.com/bharry29',
    link: 'https://bharry29.github.io',
  },
  {
    id: 9,
    title: 'Novus for CardioNet',
    description: 'Developed core modules for CardioNet. Built a module which reads data from pacemakers, analyzes it and sends out notifications to users.',
    technologies: ['ASP.NET', 'C#', 'MVC 4', 'SQL Server'],
    github: 'https://github.com/bharry29',
  },
  {
    id: 10,
    title: 'PFX for AHM',
    description: 'Developed core modules for AHM. As part of the Data Analysis team, manipulated data, imported bulk data, configured auto-backup and migration on all project DB servers.',
    technologies: ['ASP.NET', 'C#', 'MVC 4', 'Java', 'SQL Server', 'SSIS', 'SSRS'],
    github: 'https://github.com/bharry29',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Handle filtering via window events (from TerminalInterface)
  useEffect(() => {
    const handleCommand = (event: CustomEvent) => {
      const type = event.detail?.type
      const payload = event.detail?.payload

      if (type === 'filter-projects') {
        if (payload?.technology) {
          setActiveFilter(payload.technology)
          const filtered = projects.filter((p) =>
            p.technologies.some((t) => t.toLowerCase().includes(payload.technology.toLowerCase()))
          )
          setFilteredProjects(filtered)
        } else {
          setActiveFilter(null)
          setFilteredProjects(projects)
        }
      }
    }

    window.addEventListener('portfolioCommand', handleCommand as EventListener)
    return () => window.removeEventListener('portfolioCommand', handleCommand as EventListener)
  }, [])

  return (
    <section id="projects" ref={ref} className="py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border border-green-500/30 bg-black/50 p-4 sm:p-6"
        >
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-2">
              $ ls projects/
            </h2>
            <div className="h-px bg-green-500/30 mb-4"></div>
          </div>

          {activeFilter && (
            <div className="mb-4 text-green-300 text-xs sm:text-sm">
              <span className="text-green-500">$</span> Filter: <span className="text-green-400">{activeFilter}</span>
            </div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-green-500/50 pl-3 sm:pl-4 py-2"
              >
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-green-500 shrink-0">▸</span>
                  <h3 className="text-green-400 font-bold text-sm sm:text-base break-words">{project.title}</h3>
                </div>
                <p className="text-green-300 text-xs sm:text-sm ml-4 mb-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 ml-4 mb-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 sm:px-2 py-0.5 text-xs border border-green-500/30 text-green-400 whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.link || project.github) && (
                  <div className="ml-4 text-xs flex flex-wrap gap-2">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline">
                        [live]
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 underline">
                        [code]
                      </a>
                    )}
                  </div>
                )}
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

