
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
  { value: 'Action', label: 'Action' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'War', label: 'War' },
  { value: 'History', label: 'History' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Music', label: 'Music' },
  { value: 'Adult', label: 'Adult' },
  { value: 'Biography', label: 'Biography' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Western', label: 'Western' },
  { value: 'Musical', label: 'Musical' },
  { value: 'Sport', label: 'Sport' },
]
