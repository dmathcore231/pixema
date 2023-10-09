import { ReactNode } from 'react'

export interface FormInputProps {
  label: boolean
  htmlFor?: string
  children?: ReactNode
  type: string
  id?: string
  placeholder?: string
  value?: string | number
  required?: boolean
  className?: string
  disabled?: boolean
  min?: number
  max?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}