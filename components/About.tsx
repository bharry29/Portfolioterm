'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section
      id="about"
      ref={ref}
      className="py-4 sm:py-6 md:py-8 px-3 sm:px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border border-green-500/30 bg-black/50 p-4 sm:p-6"
        >
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-2">
              $ cat about.txt
            </h2>
            <div className="h-px bg-green-500/30 mb-4"></div>
          </div>
          <div className="space-y-3 sm:space-y-4 text-green-300 text-xs sm:text-sm font-mono leading-relaxed">
            <p>
              Software Development Engineering Leader with <span className="text-green-400">7 years</span> of industry experience 
              in building high-speed, dynamic web applications and systems software. Currently at 
              <span className="text-green-400 font-semibold"> Redapt Inc.</span> since 2019, and leading the "Forge" team since 2022, 
              handling automation and integration of custom datacenter infrastructure (racks, servers, network switches, storage devices).
            </p>
            
            <div className="border-l-2 border-green-500/50 pl-3 sm:pl-4 my-3 sm:my-4">
              <h3 className="text-green-400 font-bold mb-2 text-sm sm:text-base">$ leadership_philosophy</h3>
              <p className="text-green-300 text-xs sm:text-sm leading-relaxed">
                Hands-on, build-first leader who works alongside the team to contribute directly to software development. 
                Believes in understanding everything in and out by actively coding and building. Empowers team members 
                to lead and grow, contributing to their success through mentorship and collaboration rather than 
                just directing. Motivated to build great software together.
              </p>
            </div>
            
            <div className="border-l-2 border-green-500/50 pl-3 sm:pl-4 my-3 sm:my-4">
              <h3 className="text-green-400 font-bold mb-2 text-sm sm:text-base">$ achievements</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="text-green-300">
                  <span className="text-green-500">▸</span> RIBS framework (Flask, MySQL, AWS API Gateway) - reduced invoicing/reconciliation effort by <span className="text-green-400">65%</span>
                </li>
                <li className="text-green-300">
                  <span className="text-green-500">▸</span> Automation framework (Chef DK & Ruby) - improved hardware infrastructure stability by <span className="text-green-400">10%</span>
                </li>
                <li className="text-green-300">
                  <span className="text-green-500">▸</span> Django 2.2.7 migration - reduced latency by <span className="text-green-400">40%</span>, increased DB admin effectiveness by <span className="text-green-400">20%</span>
                </li>
                <li className="text-green-300">
                  <span className="text-green-500">▸</span> MustMotivate features - improved sales by <span className="text-green-400">25%</span> in one year
                </li>
                <li className="text-green-300">
                  <span className="text-green-500">▸</span> AWS configuration - improved scalability and cut maintenance costs by <span className="text-green-400">50%</span>
                </li>
              </ul>
            </div>

            <p>
              Education: <span className="text-green-400">M.S. Computer Science</span> (CSU Sacramento, 2016-2018), 
              <span className="text-green-400"> B.Tech Computer Science</span> (JNTU Hyderabad, 2009-2013).
            </p>
            
            <p>
              Certification: <span className="text-green-400">Google Cloud - Professional Cloud Architect</span>
            </p>
          </div>
          <div className="mt-4 text-green-500/50 text-xs">
            $ _
          </div>
        </motion.div>
      </div>
    </section>
  )
}

