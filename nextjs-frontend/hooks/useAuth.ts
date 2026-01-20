'use client'

import { useState, useEffect } from 'react'

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('userLogged'))
    }
  }, [])

  const login = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userLogged', '1')
      setIsLoggedIn(true)
    }
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLogged')
      setIsLoggedIn(false)
    }
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
}

