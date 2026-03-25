import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('cs_token'))
  const [loading, setLoading] = useState(true)

  // Axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  // Bootstrap: fetch /auth/me on mount
  useEffect(() => {
    const bootstrap = async () => {
      if (!token) { setLoading(false); return }
      try {
        const { data } = await axios.get('/api/auth/me')
        setUser(data.user)
      } catch {
        localStorage.removeItem('cs_token')
        setToken(null)
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [token])

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password })
    localStorage.setItem('cs_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (name, email, password, role = 'student') => {
    const { data } = await axios.post('/api/auth/register', { name, email, password, role })
    localStorage.setItem('cs_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('cs_token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
