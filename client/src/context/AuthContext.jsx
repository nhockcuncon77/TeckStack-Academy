import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { apiBase } from '../api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'teckstack_token'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setTokenState] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(!!localStorage.getItem(TOKEN_KEY))

  const setToken = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken)
      setTokenState(newToken)
    } else {
      localStorage.removeItem(TOKEN_KEY)
      setTokenState(null)
      setUser(null)
    }
  }, [])

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }
    fetch(`${apiBase}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const text = await res.text()
        if (!res.ok) throw new Error('Invalid session')
        try {
          return text ? JSON.parse(text) : {}
        } catch {
          throw new Error('Invalid session')
        }
      })
      .then((data) => setUser(data))
      .catch(() => setToken(null))
      .finally(() => setLoading(false))
  }, [token, setToken])

  const login = useCallback(
    async (email, password) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const text = await res.text()
      let data
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        throw new Error(res.ok ? 'Invalid response from server' : 'Server error. Is the API server running?')
      }
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setToken(data.token)
      setUser(data.user)
      return data.user
    },
    [setToken]
  )

  const register = useCallback(
    async (email, password, name) => {
      const res = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      const text = await res.text()
      let data
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        throw new Error(res.ok ? 'Invalid response from server' : 'Server error. Is the API server running?')
      }
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setToken(data.token)
      setUser(data.user)
      return data.user
    },
    [setToken]
  )

  const logout = useCallback(() => {
    setToken(null)
  }, [setToken])

  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    authHeader,
    isAdmin: user?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
