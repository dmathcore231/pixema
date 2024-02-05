import "./styles.scss"
import { useState } from "react"
import { OptionsSelect } from "../../types/OptionsSelect"
import { TabsProps } from "../../types/interfaces/TabsProps"

export function Tabs({ options, defaultCheckedOption, onChangeTabs }: TabsProps): JSX.Element {
  const [isCheckedOption, setIsCheckedOption] = useState<OptionsSelect>(defaultCheckedOption || options[0])

  function handleClickTabs(option: OptionsSelect) {
    setIsCheckedOption(option)
    onChangeTabs(option)
  }

  return (
    <div className="tabs">
      {options.map((option) => (
        <div
          className={"tabs__item" + (isCheckedOption.value === option.value ? " tabs__item_active" : "")}
          key={option.value}
          onClick={() => handleClickTabs(option)}
          data-value={option.value}
        >
          {option.label}
        </div>
      ))}
    </div>
  )

}
