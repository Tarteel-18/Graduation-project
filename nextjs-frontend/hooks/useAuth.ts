'use client'

import { useState, useEffect } from 'react'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = () => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('userLogged'))
    }
  }

  useEffect(() => {
    checkAuth()
    
    // Listen for storage changes (e.g., when login happens in another tab/component)
    const handleStorageChange = () => {
      checkAuth()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Also check on focus (in case login happened in same tab)
    window.addEventListener('focus', checkAuth)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', checkAuth)
    }
  }, [])

  const login = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userLogged', '1')
      setIsLoggedIn(true)
      // Trigger a custom event to notify other components
      window.dispatchEvent(new Event('auth-change'))
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLogged')
      setIsLoggedIn(false)
      window.dispatchEvent(new Event('auth-change'))
    }
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
}

