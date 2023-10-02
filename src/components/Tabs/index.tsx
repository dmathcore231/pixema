import "./styles.scss"

interface TabsProps {
  name: string
  value: string[]
  titleTabs: string[]
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  amount: number
  isChecked: string
}
export function Tabs({ name, value, titleTabs, onClick, amount, isChecked }: TabsProps): JSX.Element {

  function renderTabs(): JSX.Element[] {
    const tabsItems: JSX.Element[] = []

    for (let i = 0; i < amount; i++) {
      tabsItems.push(
        <div className="tabs__item" key={i}>
          <input type="radio" name={name} value={value[i]} onClick={onClick} id={value[i]} defaultChecked={isChecked === value[i]} />
          <label htmlFor={value[i]}>{titleTabs[i]}</label>
        </div>
      )
    }

    return tabsItems;
  }

  return (
    <div className="tabs tabs_filter">
      {renderTabs()}
    </div>
  )
}
