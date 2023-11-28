
export function truncateTitle(title: string, maxLength: number): string {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + ' ...'
  }
  return title
}
