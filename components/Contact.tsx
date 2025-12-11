'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    { label: 'Phone', value: '+1 (510) 621-8896', href: 'tel:+15106218896' },
    { label: 'Email', value: 'bharry29@gmail.com', href: 'mailto:bharry29@gmail.com' },
    { label: 'Website', value: 'bharry29.github.io', href: 'https://bharry29.github.io' },
    { label: 'LinkedIn', value: 'linkedin.com/in/bharath-vadlamannati', href: 'https://linkedin.com/in/bharath-vadlamannati' },
    { label: 'GitHub', value: 'github.com/bharry29', href: 'https://github.com/bharry29' },
  ]

  return (
    <section id="contact" ref={ref} className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border border-green-500/30 bg-black/50 p-6"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              $ cat contact.txt
            </h2>
            <div className="h-px bg-green-500/30 mb-4"></div>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="text-green-500 w-20 text-sm">$ {info.label.toLowerCase()}</span>
                <a
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-green-300 hover:text-green-400 text-sm"
                >
                  {info.value}
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-green-500/30">
            <h3 className="text-green-400 font-bold mb-3 text-sm">$ send_message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-green-500 text-xs mb-1">name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-green-500/30 text-green-300 text-sm focus:outline-none focus:border-green-500"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-green-500 text-xs mb-1">email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-black border border-green-500/30 text-green-300 text-sm focus:outline-none focus:border-green-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-green-500 text-xs mb-1">message:</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 bg-black border border-green-500/30 text-green-300 text-sm focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 border border-green-500 text-green-400 hover:bg-green-500/10 text-sm"
              >
                $ submit
              </button>
            </form>
          </div>

          <div className="mt-4 text-green-500/50 text-xs">
            $ _
          </div>
        </motion.div>
      </div>
    </section>
  )
}

