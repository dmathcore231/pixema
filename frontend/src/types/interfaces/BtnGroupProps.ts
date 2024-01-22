
export interface BtnGroupProps {
  itemsName: string[]
  itemsValue: JSX.Element[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultCheck?: string
}
