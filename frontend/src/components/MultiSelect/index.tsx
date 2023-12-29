import './styles.scss'
import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { ArrowRightSelect } from '../../images/Icons/ArrowRightSelect'
import { ArrowDownSelect } from '../../images/Icons/ArrowDownSelect'
import { OptionsSelect } from '../../types/OptionsSelect'
import { Btn } from '../Btn'
import { CloseIcon } from '../../images/Icons/CloseIcon'
import { MultiSelectProps } from '../../types/interfaces/MultiSelectProps'
import { truncateTitle } from '../../helpers'

export function MultiSelect({ placeholder, className, options, label, id, children, maxActiveOptions, getActiveOptions }: MultiSelectProps): JSX.Element {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)
  const [activeOptions, setActiveOptions] = useState<OptionsSelect[]>([])
  const [noneActiveOptions, setNoneActiveOptions] = useState<OptionsSelect[]>(options)
  const [error, setError] = useState('')

  const multiSelectElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (getActiveOptions) {
      getActiveOptions(activeOptions)
    }
  }, [activeOptions])

  function handleClickValue() {
    if (maxActiveOptions && activeOptions.length === maxActiveOptions) {
      setError('maxActiveOptions')
      return null
    } else if (noneActiveOptions.length > 0) {
      setError('')
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
      {label
        ? <label htmlFor={id} className="multi-select__label subtitle subtitle_size_xxs">
          {children}
        </label>
        : null
      }
      <div className='multi-select-value' id={id}>
        <div
          ref={multiSelectElementRef}
          className={`multi-select-value__item`
            + (isActiveDropdown ? ' multi-select-value__item_border_bottom_none' : '')
            + (activeOptions.length > 0 ? ' multi-select-value__item_padding_small' : '')
            + (error === 'maxActiveOptions' ? ' multi-select-value_error' : '')
            + (className && className === 'multi-select-error' ? ' multi-select-value_error' : '')
          }
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
                  {truncateTitle(item.label, 15)}
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
