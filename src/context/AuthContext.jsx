import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('hms_user')) || null
  )

  const login = (userData, token) => {
    localStorage.setItem('hms_user', JSON.stringify(userData))
    localStorage.setItem('hms_token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('hms_user')
    localStorage.removeItem('hms_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}