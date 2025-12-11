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

const WELCOME_MESSAGES = [
  { type: 'system' as const, content: 'Bharath Vadlamannati' },
  { type: 'system' as const, content: 'Software Development Engineering Leader' },
  { type: 'system' as const, content: '' },
  { type: 'system' as const, content: 'Welcome. You know what to do.' },
  { type: 'system' as const, content: '' },
  { type: 'system' as const, content: 'Available commands:' },
  { type: 'system' as const, content: '  about     - Who I am and what I do' },
  { type: 'system' as const, content: '  projects  - Things I\'ve built' },
  { type: 'system' as const, content: '  skills    - Tech stack and tools' },
  { type: 'system' as const, content: '  contact   - Let\'s connect' },
  { type: 'system' as const, content: '' },
  { type: 'system' as const, content: 'Type "help" for more options, or just start exploring.' },
]

export default function TerminalInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [typingIndex, setTypingIndex] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
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
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const { executeCommand } = useCommands()

  // Helper to highlight command words in messages
  const highlightCommands = (text: string) => {
    // Separate 'ls' to use word boundaries, others can match with quotes
    const shortCommands = ['ls'] // Commands that might appear inside other words
    const otherCommands = ['help', 'about', 'projects', 'skills', 'contact', 'clear', 'cls', 'whoami', 'list', 'dir', 'exit', 'quit']
    
    // Match 'ls' only with word boundaries, others with optional quotes
    const lsRegex = new RegExp(`\\b(${shortCommands.join('|')})\\b`, 'gi')
    const otherRegex = new RegExp(`("?)(${otherCommands.join('|')})("?)`, 'gi')
    
    // First split by ls with word boundaries
    let parts = text.split(lsRegex)
    // Then split each part by other commands
    const result: (string | JSX.Element)[] = []
    
    parts.forEach((part, partIdx) => {
      if (partIdx % 2 === 1 && shortCommands.includes(part.toLowerCase())) {
        // This is the 'ls' match
        result.push(<span key={`ls-${partIdx}`} className="text-green-300 font-semibold">{part}</span>)
      } else if (part) {
        // Split by other commands
        const subParts = part.split(otherRegex)
        subParts.forEach((subPart, subIdx) => {
          if (subPart) {
            const lowerSubPart = subPart.replace(/[",]/g, '').toLowerCase()
            if (otherCommands.includes(lowerSubPart)) {
              result.push(<span key={`cmd-${partIdx}-${subIdx}`} className="text-green-300 font-semibold">{subPart}</span>)
            } else {
              result.push(<span key={`text-${partIdx}-${subIdx}`}>{subPart}</span>)
            }
          }
        })
      }
    })
    
    return result
  }

  // Typing animation effect for welcome messages
  useEffect(() => {
    if (typingIndex >= WELCOME_MESSAGES.length) {
      setIsTyping(false)
      if (inputRef.current) {
        inputRef.current.focus()
      }
      return
    }

    const currentMessage = WELCOME_MESSAGES[typingIndex]
    let charIndex = 0

    const typeChar = () => {
      if (charIndex < currentMessage.content.length) {
        setTypingText(currentMessage.content.substring(0, charIndex + 1))
        charIndex++
        typingTimeoutRef.current = setTimeout(typeChar, 30) // Typing speed
      } else {
        // Message complete, add to messages and move to next
        setMessages(prev => [...prev, {
          type: currentMessage.type,
          content: currentMessage.content,
          timestamp: new Date(),
        }])
        setTypingText('')
        setTypingIndex(prev => prev + 1)
      }
    }

    // Delay before starting to type each message
    const delay = typingIndex === 0 ? 500 : typingIndex === 2 ? 300 : 100
    typingTimeoutRef.current = setTimeout(() => {
      typeChar()
    }, delay)

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [typingIndex])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typingText])

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

  // Focus input after typing animation completes
  useEffect(() => {
    if (!isTyping && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isTyping])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="border-b border-green-500/30 px-3 sm:px-4 py-2 flex items-center justify-between bg-black/80 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 sm:ml-3 text-green-400 text-xs sm:text-sm font-mono">portfolioterm</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-black">
        <div className="space-y-0.5 max-w-7xl mx-auto">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed"
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
                {msg.type === 'system' && messages.length <= WELCOME_MESSAGES.length 
                  ? highlightCommands(msg.content)
                  : msg.content
                }
              </span>
            </motion.div>
          ))}
          {/* Typing animation */}
          {isTyping && typingText !== '' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed"
            >
              <span className="text-green-500 shrink-0 font-mono select-none">{'>'}</span>
              <span className="font-mono whitespace-pre-wrap break-words text-green-500/80">
                {typingText}
                <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 typing-cursor">▊</span>
              </span>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Content Display Area */}
        <AnimatePresence>
          {conversation.currentContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 sm:mt-6 border-t border-green-500/20 pt-4 sm:pt-6 max-w-7xl mx-auto"
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
      <div className="border-t border-green-500/30 p-3 sm:p-4 bg-black/80 shrink-0">
        <form onSubmit={handleTextSubmit} className="flex items-center gap-2 max-w-7xl mx-auto">
          <span className="text-green-400 font-mono select-none shrink-0">$</span>
          <div className="flex-1 relative min-w-0">
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
              disabled={isTyping}
              className="w-full bg-transparent text-green-400 outline-none font-mono text-xs sm:text-sm caret-green-400 disabled:opacity-50"
            />
            {!inputText && (
              <span className="absolute left-0 text-green-500/50 font-mono text-xs sm:text-sm pointer-events-none truncate max-w-full">
                Type a command or press Tab for completion...
              </span>
            )}
          </div>
        </form>
        {inputText.length === 0 && (
          <div className="mt-2 text-xs text-green-500/50 font-mono max-w-7xl mx-auto px-1">
            <span className="hidden sm:inline">Tip: Use ↑/↓ for command history, Tab for completion</span>
            <span className="sm:hidden">Tip: ↑/↓ history, Tab completion</span>
          </div>
        )}
      </div>
    </div>
  )
}

