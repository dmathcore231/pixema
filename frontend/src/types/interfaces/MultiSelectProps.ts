import { OptionsSelect } from '../OptionsSelect'

export interface MultiSelectProps {
  placeholder?: string
  className?: string
  options: OptionsSelect[]
  getActiveOptions?: (activeOptions: OptionsSelect[]) => void
}
