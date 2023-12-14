import "./styles.scss"

interface TabsProps {
  name: string
  value: string[]
  titleTabs: string[]
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
  isChecked: string
}

export function Tabs({ name, value, titleTabs, onClick, isChecked }: TabsProps): JSX.Element {

  function renderTabs(): JSX.Element[] {
    const tabsItems: JSX.Element[] = []

    for (let i = 0; i < value.length; i++) {
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
    <div className="tabs">
      {renderTabs()}
    </div>
  )
}
