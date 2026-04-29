export type Category = {
  id: string
  label: string
  emoji: string
  count: number
}

export type Product = {
  id: string
  title: string
  game: string
  category: string
  price: number
  oldPrice?: number
  image: string
  seller: string
  sellerRating: number
  sellerDeals: number
  isOnline: boolean
  isVerified: boolean
  isInstant: boolean
  badge?: string
}

export const categories: Category[] = [
  { id: "all", label: "Все", emoji: "🎮", count: 14200 },
  { id: "accounts", label: "Аккаунты", emoji: "👤", count: 4820 },
  { id: "currency", label: "Валюта", emoji: "💰", count: 3110 },
  { id: "items", label: "Предметы", emoji: "🗡️", count: 2940 },
  { id: "boosting", label: "Прокачка", emoji: "⚡", count: 1870 },
  { id: "keys", label: "Ключи", emoji: "🔑", count: 980 },
  { id: "coaching", label: "Коучинг", emoji: "🎯", count: 480 },
]

export const games = [
  { id: "all", label: "Все игры" },
  { id: "cs2", label: "CS2" },
  { id: "dota2", label: "Dota 2" },
  { id: "gta5", label: "GTA V" },
  { id: "wow", label: "WoW" },
  { id: "valorant", label: "Valorant" },
  { id: "pubg", label: "PUBG" },
  { id: "fortnite", label: "Fortnite" },
  { id: "minecraft", label: "Minecraft" },
]

export const products: Product[] = [
  {
    id: "1",
    title: "CS2 Prime аккаунт • Global Elite • 2000+ часов",
    game: "CS2",
    category: "accounts",
    price: 1490,
    oldPrice: 2200,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=280&fit=crop",
    seller: "FastSeller",
    sellerRating: 4.9,
    sellerDeals: 1240,
    isOnline: true,
    isVerified: true,
    isInstant: true,
    badge: "Топ продавец",
  },
  {
    id: "2",
    title: "Dota 2 • 5000 MMR • Immortal ранг • Редкие скины",
    game: "Dota 2",
    category: "accounts",
    price: 3200,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=280&fit=crop",
    seller: "DotaPro",
    sellerRating: 4.8,
    sellerDeals: 387,
    isOnline: false,
    isVerified: true,
    isInstant: false,
  },
  {
    id: "3",
    title: "GTA Online • 500 млн $ + полный аккаунт",
    game: "GTA V",
    category: "currency",
    price: 590,
    oldPrice: 890,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=280&fit=crop",
    seller: "GTAKing",
    sellerRating: 4.7,
    sellerDeals: 2100,
    isOnline: true,
    isVerified: true,
    isInstant: true,
    badge: "Хит",
  },
  {
    id: "4",
    title: "Valorant • Immortal 3 • 30+ скинов оружия",
    game: "Valorant",
    category: "accounts",
    price: 2800,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=280&fit=crop",
    seller: "ValoMaster",
    sellerRating: 5.0,
    sellerDeals: 92,
    isOnline: true,
    isVerified: false,
    isInstant: true,
  },
  {
    id: "5",
    title: "WoW Classic SoD • 1000 золота • EU сервер",
    game: "WoW",
    category: "currency",
    price: 250,
    image: "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?w=400&h=280&fit=crop",
    seller: "WowGold",
    sellerRating: 4.6,
    sellerDeals: 5400,
    isOnline: true,
    isVerified: true,
    isInstant: true,
    badge: "Быстро",
  },
  {
    id: "6",
    title: "CS2 Прокачка до Global Elite • Гарантия",
    game: "CS2",
    category: "boosting",
    price: 1800,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=280&fit=crop",
    seller: "BoostTeam",
    sellerRating: 4.9,
    sellerDeals: 320,
    isOnline: false,
    isVerified: true,
    isInstant: false,
  },
  {
    id: "7",
    title: "PUBG • 10 000 UC игровой валюты",
    game: "PUBG",
    category: "currency",
    price: 890,
    oldPrice: 1200,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=280&fit=crop",
    seller: "PubgShop",
    sellerRating: 4.5,
    sellerDeals: 760,
    isOnline: true,
    isVerified: true,
    isInstant: true,
  },
  {
    id: "8",
    title: "Minecraft Java Edition • Лицензионный ключ",
    game: "Minecraft",
    category: "keys",
    price: 720,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=280&fit=crop",
    seller: "KeyStore",
    sellerRating: 4.8,
    sellerDeals: 1830,
    isOnline: true,
    isVerified: true,
    isInstant: true,
    badge: "Мгновенно",
  },
]

export const stats = [
  { value: "2 400 000+", label: "Сделок завершено" },
  { value: "180 000+", label: "Продавцов" },
  { value: "99.2%", label: "Успешных сделок" },
  { value: "5 минут", label: "Среднее время доставки" },
]
