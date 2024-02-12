import { ReactNode } from 'react'

export interface TextAreaProps {
  label: boolean
  maxlength: number
  minlength: number
  required: boolean
  htmlFor?: string
  children?: ReactNode
  id?: string
  placeholder?: string
  value?: string
  className?: string
  disabled?: boolean
  cols?: number
  rows?: number
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
