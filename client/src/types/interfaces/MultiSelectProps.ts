import { OptionsSelect } from '../OptionsSelect'
import { ReactNode } from 'react'

export interface MultiSelectProps {
  placeholder?: string
  className?: string
  options: OptionsSelect[]
  label?: boolean
  id?: string
  children?: ReactNode
  maxActiveOptions?: number
  clearActiveOptions?: boolean
  getActiveOptions?: (activeOptions: OptionsSelect[]) => void
}
