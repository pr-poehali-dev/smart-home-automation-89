import { useState, useEffect } from "react"
import { getMe } from "./api"

export type AuthUser = {
  id: number
  username: string
  email: string
  rating: number
  deals_count: number
  is_verified: boolean
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("playerok_token")
    if (!token) { setLoading(false); return }
    getMe().then(setUser).catch(() => {
      localStorage.removeItem("playerok_token")
    }).finally(() => setLoading(false))
  }, [])

  function logout() {
    localStorage.removeItem("playerok_token")
    setUser(null)
  }

  function onLogin(token: string, userData: Omit<AuthUser, "email" | "rating" | "deals_count" | "is_verified">) {
    localStorage.setItem("playerok_token", token)
    getMe().then(setUser).catch(() => {
      setUser({ ...userData, email: "", rating: 5, deals_count: 0, is_verified: false })
    })
  }

  return { user, loading, logout, onLogin }
}
