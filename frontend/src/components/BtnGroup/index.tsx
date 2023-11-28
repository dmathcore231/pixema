import "./styles.scss"

export interface BtnGroupProps {
  itemsName: string[]
  itemsValue: JSX.Element[]
  onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

export function BtnGroup({ itemsName, itemsValue, onClick }: BtnGroupProps): JSX.Element {

  function renderBtnGroup(): JSX.Element[] {
    const btnGroupItems: JSX.Element[] = []
    for (let i = 0; i < itemsName.length; i++) {
      btnGroupItems.push(
        <div className="btn-group__item" key={i}>
          <input type="checkbox" name={itemsName[i]} value={itemsName[i]} onClick={onClick} id={itemsName[i]} />
          <label htmlFor={itemsName[i]}>{itemsValue[i]}</label>
        </div>
      )
    }
    return btnGroupItems
  }

  return (

    <div className="btn-group">
      {renderBtnGroup()}
    </div>
  )
}
