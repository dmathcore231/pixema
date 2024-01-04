
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
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Biography', label: 'Biography' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Documentary', label: 'Documentary' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'History', label: 'History' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Music', label: 'Music' },
  { value: 'Musical', label: 'Musical' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Sport', label: 'Sport' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'War', label: 'War' },
  { value: 'Western', label: 'Western' },
];
