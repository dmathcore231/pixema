import { ReactNode } from 'react'

export interface BtnProps {
  type: "button" | "submit"
  className?: string
  children: ReactNode
  form?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
