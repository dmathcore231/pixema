import './styles.scss'
import { useState, useEffect } from 'react'
import { ArrowRightSelect } from '../../images/Icons/ArrowRightSelect'
import { ArrowDownSelect } from '../../images/Icons/ArrowDownSelect'
import { OptionsSelect } from '../../types/OptionsSelect'
import { Btn } from '../Btn'
import { CloseIcon } from '../../images/Icons/CloseIcon'
import { MultiSelectProps } from '../../types/interfaces/MultiSelectProps'

export function MultiSelect({ placeholder, className, options, getActiveOptions }: MultiSelectProps): JSX.Element {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)
  const [activeOptions, setActiveOptions] = useState<OptionsSelect[]>([])
  const [noneActiveOptions, setNoneActiveOptions] = useState<OptionsSelect[]>(options)

  useEffect(() => {
    if (getActiveOptions) {
      getActiveOptions(activeOptions)
    }
  }, [activeOptions, getActiveOptions])

  function handleClickValue() {
    if (noneActiveOptions.length > 0) {
      setIsActiveDropdown(prev => !prev)
    }
  }

  function handleClickDropdownItem(option: OptionsSelect) {
    setIsActiveDropdown(prev => !prev)
    const updatedNoneActiveOptions = noneActiveOptions.filter(item => item.value !== option.value)
    setActiveOptions(prev => [...prev, option])
    setNoneActiveOptions(updatedNoneActiveOptions)
  }

  function handleClickCloseActiveItem(option: OptionsSelect) {
    setActiveOptions(prev => prev.filter(item => item.value !== option.value))
    setNoneActiveOptions(prev => [...prev, option].sort((a, b) => {
      return options.findIndex(o => o.value === a.value) - options.findIndex(o => o.value === b.value)
    }))
  }

  return (
    <div className={"multi-select" + (className ? " " + className : "")}>
      <div className='multi-select-value'>
        <div className={`multi-select-value__item` + (isActiveDropdown ? ' multi-select-value__item_border_bottom_none' : '') + (activeOptions.length > 0 ? ' multi-select-value__item_padding_small' : '')}
          onClick={handleClickValue}>
          {activeOptions.length > 0
            ? activeOptions.map((item) => (
              <div
                key={item.value}
                className='multi-select-value__active-item'
              >
                <div className='multi-select-value__active-item-label
                subtitle subtitle_size subtitle subtitle_size_xxs'
                  data-value={item.value}
                >
                  {item.label}
                </div>
                <div className='multi-select-value__active-item-close'>
                  <Btn
                    type='button'
                    className='btn_padding_none btn_fill_white'
                    onClick={() => { handleClickCloseActiveItem(item) }}
                  >
                    <CloseIcon width="15" height="15" />
                  </Btn>
                </div>
              </div>
            ))
            : <div className='multi-select-value__placeholder'>
              {placeholder
                ? placeholder
                : 'Select options'}
            </div>
          }

        </div>
        <div className='multi-select-value__icon'>
          {isActiveDropdown
            ? <ArrowDownSelect width="24" height="24" />
            : <ArrowRightSelect width="24" height="24" />}
        </div>
      </div>
      <div className={`multi-select-dropdown ${isActiveDropdown
        ? 'multi-select-dropdown_active'
        : ''}`}>

        {noneActiveOptions.map((option, index) => (
          <div
            key={option.value}
            className={`multi-select-dropdown__item ${index === noneActiveOptions.length - 1 ?
              'multi-select-dropdown__item_border_bottom' : ''}`}
            onClick={() => handleClickDropdownItem(option)}
            data-value={option.value}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}
