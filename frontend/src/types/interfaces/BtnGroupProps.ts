
export interface BtnGroupProps {
  itemsName: string[]
  itemsValue: JSX.Element[]
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}
