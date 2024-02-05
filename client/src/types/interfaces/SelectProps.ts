import { OptionsSelect } from '../OptionsSelect'

export interface SelectProps {
  options: OptionsSelect[]
  defaultValue?: string
  inputProps: {
    label: boolean
    htmlFor?: string
    children?: string
    id?: string
  }
  onSelectOptionChange: (option: OptionsSelect) => void
}
