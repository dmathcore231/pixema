
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
