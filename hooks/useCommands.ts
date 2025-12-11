'use client'

import { useCallback } from 'react'

interface CommandResult {
  type: string
  command: string
  payload?: any
}

/**
 * Simplified command processor for terminal interface
 * Handles text-based commands without backend dependencies
 */
export function useCommands() {
  const processCommand = useCallback((commandText: string): CommandResult | null => {
    const lowerCommand = commandText.toLowerCase().trim()

    // Show Projects
    if (lowerCommand === 'projects' || lowerCommand === 'project' || lowerCommand.includes('show project')) {
      // Check for technology filter
      const techs = ['python', 'react', 'node', 'javascript', 'typescript', 'django', 'flask', 'mysql', 'mongodb', 'aws', 'angular', 'php', 'java', 'neo4j']
      const foundTech = techs.find((tech) => lowerCommand.includes(tech))

      if (foundTech) {
        const filterMap: Record<string, string> = {
          python: 'Python',
          react: 'React',
          node: 'Node.js',
          javascript: 'JavaScript',
          typescript: 'TypeScript',
          django: 'Django',
          flask: 'Flask',
          mysql: 'MySQL',
          mongodb: 'MongoDB',
          aws: 'AWS',
          angular: 'Angular',
          php: 'PHP',
          java: 'Java',
          neo4j: 'Neo4j',
        }
        return {
          type: 'filter-projects',
          command: commandText,
          payload: { technology: filterMap[foundTech] },
        }
      }
      return {
        type: 'filter-projects',
        command: commandText,
        payload: {},
      }
    }

    // Show Skills
    if (lowerCommand === 'skills' || lowerCommand === 'skill' || lowerCommand.includes('show skill')) {
      let category: string | null = null
      if (lowerCommand.includes('programming') || lowerCommand.includes('language')) {
        category = 'programming'
      } else if (lowerCommand.includes('server') || lowerCommand.includes('backend')) {
        category = 'server'
      } else if (lowerCommand.includes('client') || lowerCommand.includes('frontend')) {
        category = 'client'
      } else if (lowerCommand.includes('cloud') || lowerCommand.includes('aws')) {
        category = 'cloud'
      } else if (lowerCommand.includes('database') || lowerCommand.includes('db')) {
        category = 'database'
      } else if (lowerCommand.includes('tool')) {
        category = 'tools'
      }

      return {
        type: 'show-skills',
        command: commandText,
        payload: category ? { category } : {},
      }
    }

    // Show About
    if (lowerCommand === 'about' || lowerCommand.includes('about') || lowerCommand.includes('who are you')) {
      return {
        type: 'show-about',
        command: commandText,
        payload: {},
      }
    }

    // Show Contact
    if (lowerCommand === 'contact' || lowerCommand.includes('contact') || lowerCommand.includes('reach') || lowerCommand.includes('email')) {
      return {
        type: 'show-contact',
        command: commandText,
        payload: {},
      }
    }

    return null
  }, [])

  const executeCommand = useCallback((commandText: string) => {
    return processCommand(commandText)
  }, [processCommand])

  return {
    processCommand,
    executeCommand,
  }
}

