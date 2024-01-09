import { OptionsSelect } from "../types/OptionsSelect"

export function truncateTitle(title: string, maxLength: number): string {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + ' ...'
  }
  return title
}

export function setDataLocalStorage<T extends string>(name: string, data: T,): void {
  localStorage.setItem(name, JSON.stringify(data))
}

export function getDataLocalStorage<T extends string>(name: string): T | null {
  const data = localStorage.getItem(name)
  if (data) {
    return JSON.parse(data) as T
  }
  return null
}

export const GENRE = [
  { value: 'action', label: 'Action' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'animation', label: 'Animation' },
  { value: 'biography', label: 'Biography' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'crime', label: 'Crime' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'drama', label: 'Drama' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'history', label: 'History' },
  { value: 'horror', label: 'Horror' },
  { value: 'music', label: 'Music' },
  { value: 'musical', label: 'Musical' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'romance', label: 'Romance' },
  { value: 'sci-Fi', label: 'Sci-Fi' },
  { value: 'sport', label: 'Sport' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'war', label: 'War' },
  { value: 'western', label: 'Western' },
]

export const COUNTRY = [
  { value: 'australia', label: 'Australia' },
  { value: 'austria', label: 'Austria' },
  { value: 'belarus', label: 'Belarus' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'canada', label: 'Canada' },
  { value: 'chile', label: 'Chile' },
  { value: 'colombia', label: 'Colombia' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'finland', label: 'Finland' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'greece', label: 'Greece' },
  { value: 'india', label: 'India' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'italy', label: 'Italy' },
  { value: 'japan', label: 'Japan' },
  { value: 'korea', label: 'Korea' },
  { value: 'mexico', label: 'Mexico' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'panama', label: 'Panama' },
  { value: 'poland', label: 'Poland' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'russia', label: 'Russia' },
  { value: 'spain', label: 'Spain' },
  { value: 'switzerland', label: 'Switzerland' },
  { value: 'turkey', label: 'Turkey' },
  { value: 'uk', label: 'UK' },
  { value: 'ukraine', label: 'Ukraine' },
  { value: 'usa', label: 'USA' },
  { value: 'vietnam', label: 'Vietnam' },
]

export const ROLEUSER: OptionsSelect[] = [
  { label: 'User', value: 'user' },
  { label: 'Admin', value: 'admin' },
  { label: 'Moderator', value: 'moderator' }
]
