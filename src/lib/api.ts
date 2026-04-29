import func2url from "../../backend/func2url.json"

const AUTH_URL = func2url.auth
const PRODUCTS_URL = func2url.products

function getToken(): string {
  return localStorage.getItem("playerok_token") || ""
}

function authHeaders() {
  return { "Content-Type": "application/json", "X-Auth-Token": getToken() }
}

// AUTH
export async function register(username: string, email: string, password: string) {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "register", username, email, password }),
  })
  const data = JSON.parse(await res.json())
  if (!res.ok) throw new Error(data.error || "Ошибка регистрации")
  return data as { token: string; user_id: number; username: string }
}

export async function login(email: string, password: string) {
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", email, password }),
  })
  const data = JSON.parse(await res.json())
  if (!res.ok) throw new Error(data.error || "Ошибка входа")
  return data as { token: string; user_id: number; username: string }
}

export async function getMe() {
  const res = await fetch(AUTH_URL, { headers: authHeaders() })
  const data = JSON.parse(await res.json())
  if (!res.ok) throw new Error(data.error || "Не авторизован")
  return data as { id: number; username: string; email: string; rating: number; deals_count: number; is_verified: boolean }
}

// PRODUCTS
export async function getMeta() {
  const res = await fetch(`${PRODUCTS_URL}?meta=1`)
  const data = JSON.parse(await res.json())
  return data as { games: Game[]; categories: Category[] }
}

export async function getProducts(filters: { game_id?: number; category_id?: number; seller_id?: number } = {}) {
  const q = new URLSearchParams()
  if (filters.game_id) q.set("game_id", String(filters.game_id))
  if (filters.category_id) q.set("category_id", String(filters.category_id))
  if (filters.seller_id) q.set("seller_id", String(filters.seller_id))
  const res = await fetch(`${PRODUCTS_URL}?${q.toString()}`)
  const data = JSON.parse(await res.json())
  return data as { products: Product[]; total: number }
}

export async function getProduct(id: number) {
  const res = await fetch(`${PRODUCTS_URL}?id=${id}`)
  const data = JSON.parse(await res.json())
  if (!res.ok) throw new Error(data.error || "Не найдено")
  return data as ProductDetail
}

export async function createProduct(payload: {
  title: string; description: string; price: number; old_price?: number;
  game_id: number; category_id: number; is_instant: boolean; image_url?: string
}) {
  const res = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  const data = JSON.parse(await res.json())
  if (!res.ok) throw new Error(data.error || "Ошибка создания")
  return data as { id: number; success: boolean }
}

// TYPES
export type Game = { id: number; slug: string; name: string; emoji: string }
export type Category = { id: number; slug: string; name: string; emoji: string }

export type Product = {
  id: number; title: string; price: number; old_price?: number;
  game: string; game_emoji: string; category: string; category_slug: string;
  seller: string; seller_rating: number; seller_deals: number; seller_verified: boolean;
  is_instant: boolean; image_url: string; created_at: string;
}

export type ProductDetail = Product & {
  description: string; seller_id: number; views: number;
}
