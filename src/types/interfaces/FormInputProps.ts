import { ReactNode } from 'react'

export interface FormInputProps {
  htmlFor?: string
  children?: ReactNode
  type: string
  id?: string
  placeholder?: string
  value?: string | number
  required?: boolean
  className?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
