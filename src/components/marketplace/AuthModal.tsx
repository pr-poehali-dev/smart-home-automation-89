import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { register, login } from "@/lib/api"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess: (token: string, user: { id: number; username: string }) => void
}

export function AuthModal({ open, onClose, onSuccess }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (tab === "register") {
        const data = await register(username, email, password)
        onSuccess(data.token, { id: data.user_id, username: data.username })
      } else {
        const data = await login(email, password)
        onSuccess(data.token, { id: data.user_id, username: data.username })
      }
      onClose()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {tab === "login" ? "Вход в Gamers rbx" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1 mb-2">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError("") }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                tab === t ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "login" ? "Войти" : "Зарегистрироваться"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "register" && (
            <div>
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                placeholder="nickname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder={tab === "register" ? "Минимум 6 символов" : "Ваш пароль"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
            {loading ? "Загрузка..." : tab === "login" ? "Войти" : "Создать аккаунт"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}