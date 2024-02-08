import "./styles.scss"
import { BtnGroupProps } from "../../types/interfaces/BtnGroupProps"

export function BtnGroup({ itemsName, itemsValue, onChange, defaultCheck }: BtnGroupProps): JSX.Element {

  function renderBtnGroup(): JSX.Element[] {
    const btnGroupItems: JSX.Element[] = []
    for (let i = 0; i < itemsName.length; i++) {
      btnGroupItems.push(
        <div className="btn-group__item" key={i}>
          <input type="checkbox" name={itemsName[i]} value={itemsName[i]} onChange={onChange} id={itemsName[i]} checked={defaultCheck === itemsName[i] ? true : false} />
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
