import { OptionsSelect } from '../OptionsSelect'

export interface TabsProps {
  options: OptionsSelect[]
  defaultCheckedOption?: OptionsSelect
  onChangeTabs: (option: OptionsSelect) => void
}
