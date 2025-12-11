'use client'

/**
 * TerminalInterface Component
 * 
 * Main terminal-style UI component for the portfolio website.
 * Features:
 * - Terminal-style command interface (black background, green text)
 * - Command history and tab completion
 * - Dynamic content display based on commands
 * - No backend dependencies - fully static
 */

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCommands } from '@/hooks/useCommands'
import About from './About'
import Projects from './Projects'
import Skills from './Skills'
import Contact from './Contact'

interface Message {
  type: 'user' | 'system' | 'response' | 'error'
  content: string
  timestamp: Date
}

interface ConversationState {
  isActive: boolean
  currentContent: string | null
}

const CONVERSATION_TIMEOUT = 300000 // 5 minutes

export default function TerminalInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'system',
      content: 'Portfolio Terminal - Bharath Vadlamannati',
      timestamp: new Date(),
    },
    {
      type: 'system',
      content: 'Software Development Engineering Leader | 7+ years experience',
      timestamp: new Date(),
    },
    {
      type: 'system',
      content: '',
      timestamp: new Date(),
    },
    {
      type: 'system',
      content: 'Execute commands to explore my portfolio. Type "help" for available commands.',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [conversation, setConversation] = useState<ConversationState>({
    isActive: false,
    currentContent: null,
  })
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const processingRef = useRef<Set<string>>(new Set())
  
  const { executeCommand } = useCommands()

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const addMessage = useCallback((type: 'user' | 'system' | 'response' | 'error', content: string) => {
    setMessages(prev => {
      const recentMessages = prev.slice(-3)
      const isDuplicate = recentMessages.some(
        msg => msg.type === type && msg.content === content && content.length < 50
      )
      if (isDuplicate) {
        return prev
      }
      return [...prev, {
        type,
        content,
        timestamp: new Date(),
      }]
    })
  }, [])

  const processCommand = useCallback((commandText: string) => {
    if (!commandText.trim()) return
    
    const trimmedCommand = commandText.trim()
    
    if (processingRef.current.has(trimmedCommand)) {
      return
    }
    
    processingRef.current.add(trimmedCommand)
    
    setTimeout(() => {
      processingRef.current.delete(trimmedCommand)
    }, 1000)
    
    const lowerCommand = trimmedCommand.toLowerCase()

    // Handle built-in terminal commands
    if (lowerCommand === 'clear' || lowerCommand === 'cls') {
      setMessages([
        {
          type: 'system',
          content: 'Terminal cleared. Type "help" for available commands.',
          timestamp: new Date(),
        },
      ])
      setConversation({ isActive: false, currentContent: null })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      return
    }

    if (lowerCommand === 'help' || lowerCommand === '--help' || lowerCommand === '-h') {
      addMessage('user', trimmedCommand)
      addMessage('response', `Available Commands:

help
  Show this help message

clear, cls
  Clear the terminal screen

whoami
  Show portfolio owner information

ls, list, dir
  List all available portfolio sections

about
  Show about me and background information

projects
  Display all portfolio projects

skills
  Show technical skills and expertise

contact
  Display contact information and links

exit, quit
  Close terminal and reload page

Examples:
  $ about      → Show about information
  $ projects   → List all projects
  $ skills     → Display technical skills
  $ contact    → Show contact details`)
      return
    }

    if (lowerCommand === 'whoami') {
      addMessage('user', trimmedCommand)
      addMessage('response', 'Bharath Vadlamannati - Software Development Engineering Leader')
      return
    }

    if (lowerCommand === 'ls' || lowerCommand === 'list' || lowerCommand === 'dir') {
      addMessage('user', trimmedCommand)
      addMessage('response', `Available sections:

  about     - About me and background
  projects  - Portfolio projects
  skills    - Technical skills
  contact   - Contact information`)
      return
    }

    if (lowerCommand === 'exit' || lowerCommand === 'quit') {
      addMessage('user', trimmedCommand)
      addMessage('response', 'Closing terminal...')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      return
    }

    // Add user message
    addMessage('user', trimmedCommand)

    // Process portfolio commands
    const result = executeCommand(trimmedCommand)
    
    if (result) {
      setConversation({
        isActive: true,
        currentContent: result.type,
      })

      let responseText = ''
      switch (result.type) {
        case 'show-about':
          responseText = 'Displaying about information...'
          break
        case 'filter-projects':
          responseText = result.payload?.technology 
            ? `Filtering projects by technology: ${result.payload.technology}...`
            : 'Displaying all projects...'
          break
        case 'show-skills':
          responseText = result.payload?.category
            ? `Displaying ${result.payload.category} skills...`
            : 'Displaying all skills...'
          break
        case 'show-contact':
          responseText = 'Displaying contact information...'
          break
        default:
          responseText = 'Command executed.'
      }
      
      addMessage('response', responseText)

      // Dispatch event for portfolio components
      window.dispatchEvent(
        new CustomEvent('portfolioCommand', {
          detail: result,
        })
      )

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setConversation({
          isActive: false,
          currentContent: null,
        })
      }, CONVERSATION_TIMEOUT)
    } else {
      addMessage('error', `bash: ${trimmedCommand}: command not found`)
      addMessage('system', `Type "help" to see all available commands.`)
    }
  }, [executeCommand, addMessage])

  const handleTextSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const command = inputText.trim()
    if (command && !processingRef.current.has(command)) {
      setCommandHistory(prev => [...prev, command].slice(-50))
      setHistoryIndex(-1)
      setInputText('')
      processCommand(command)
    }
  }, [inputText, processCommand])

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      const command = inputText.trim()
      if (command && !processingRef.current.has(command)) {
        setCommandHistory(prev => [...prev, command].slice(-50))
        setHistoryIndex(-1)
        setInputText('')
        processCommand(command)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInputText(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInputText('')
        } else {
          setHistoryIndex(newIndex)
          setInputText(commandHistory[newIndex])
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const commands = ['help', 'clear', 'cls', 'whoami', 'ls', 'list', 'dir', 'about', 'projects', 'skills', 'contact', 'exit', 'quit']
      const current = inputText.trim().toLowerCase()
      const matches = commands.filter(cmd => cmd.startsWith(current))
      if (matches.length === 1) {
        setInputText(matches[0] + ' ')
      } else if (matches.length > 1) {
        addMessage('response', `Possible completions: ${matches.join(', ')}`)
      }
    }
  }, [inputText, processCommand, commandHistory, historyIndex, addMessage])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Terminal Header */}
      <div className="border-b border-green-500/30 px-4 py-2 flex items-center justify-between bg-black/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-3 text-green-400 text-xs font-mono">portfolioterm</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="h-[calc(100vh-180px)] overflow-y-auto p-4 bg-black">
        <div className="space-y-0.5">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 text-sm leading-relaxed"
            >
              <span className="text-green-500 shrink-0 font-mono select-none">
                {msg.type === 'user' ? '$' : msg.type === 'system' ? '>' : msg.type === 'error' ? '!' : '→'}
              </span>
              <span className={`font-mono whitespace-pre-wrap break-words ${
                msg.type === 'user' ? 'text-green-300' :
                msg.type === 'system' ? 'text-green-500/80' :
                msg.type === 'error' ? 'text-red-400' :
                'text-green-400'
              }`}>
                {msg.content}
              </span>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Content Display Area */}
        <AnimatePresence>
          {conversation.currentContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 border-t border-green-500/20 pt-4"
            >
              {conversation.currentContent === 'show-about' && <About />}
              {conversation.currentContent === 'filter-projects' && <Projects />}
              {conversation.currentContent === 'show-skills' && <Skills />}
              {conversation.currentContent === 'show-contact' && <Contact />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Input Area */}
      <div className="border-t border-green-500/30 p-3 bg-black/80">
        <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
          <span className="text-green-400 font-mono select-none">$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value)
                setHistoryIndex(-1)
              }}
              onKeyDown={handleKeyPress}
              placeholder=""
              className="w-full bg-transparent text-green-400 outline-none font-mono text-sm caret-green-400"
              autoFocus
            />
            {!inputText && (
              <span className="absolute left-0 text-green-500/50 font-mono text-sm pointer-events-none">
                Type a command or press Tab for completion...
              </span>
            )}
          </div>
        </form>
        {inputText.length === 0 && (
          <div className="mt-2 text-xs text-green-500/50 font-mono">
            Tip: Use ↑/↓ for command history, Tab for completion
          </div>
        )}
      </div>
    </div>
  )
}

