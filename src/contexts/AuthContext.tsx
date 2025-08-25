'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  firstName: string
  lastName: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('wanderlust_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('wanderlust_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          const userData: User = {
            id: Date.now().toString(),
            name: email.split('@')[0],
            email,
            firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            lastName: 'User'
          }
          
          setUser(userData)
          localStorage.setItem('wanderlust_user', JSON.stringify(userData))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1500)
    })
  }

  const signup = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string
  ): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (firstName && lastName && email && password) {
          const userData: User = {
            id: Date.now().toString(),
            name: `${firstName} ${lastName}`,
            email,
            firstName,
            lastName
          }
          
          setUser(userData)
          localStorage.setItem('wanderlust_user', JSON.stringify(userData))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 2000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('wanderlust_user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
