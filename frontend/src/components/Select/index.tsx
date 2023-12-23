import './styles.scss'
import { useState, useEffect } from 'react'
import { FormInput } from '../FormInput'
import { OptionsSelect } from '../../types/OptionsSelect'

export interface SelectProps {
  options: OptionsSelect[]
  defaultValue?: string
  inputProps: {
    label: boolean
    htmlFor?: string
    children?: string
    id?: string
  }
  onSelectOptionChange: (option: OptionsSelect) => void
}

export function Select({ options, defaultValue, inputProps, onSelectOptionChange }: SelectProps): JSX.Element {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false)
  const [selectedOption, setSelectedOption] = useState({ label: 'Select option', value: '0' })

  useEffect(() => {
    if (defaultValue) {
      options.forEach((option) => {
        if (option.value === defaultValue) {
          setSelectedOption(option)
        }
      })
    }
  }, [defaultValue, options])

  function handleSelectOption(option: OptionsSelect) {
    setIsActiveDropdown(false)
    setSelectedOption(option)
    onSelectOptionChange(option)
  }

  return (
    <div className='select'>
      <div className='select-value'>
        <FormInput
          label={inputProps.label}
          htmlFor={inputProps.htmlFor}
          children={inputProps.children}
          type='text'
          id={inputProps.id}
          className={isActiveDropdown
            ? 'primary-input_border-radius_none_button select-value__item'
            : 'select-value__item'}
          placeholder={selectedOption.value}
          value={selectedOption.label}
          readOnly={true}
          onClick={() => setIsActiveDropdown(!isActiveDropdown)}
        />
      </div>
      <div className={`select-dropdown ${isActiveDropdown ? 'select-dropdown_active' : ''}`}>
        {options.map((option, index) => (
          <FormInput
            key={option.value}
            label={false}
            type='text'
            className={`${index === options.length - 1 ? 'primary-input_border-radius_button' : 'primary-input_border-radius_none'} select-dropdown__item`}
            placeholder={option.value}
            value={option.label}
            readOnly={true}
            onClick={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </div>
  )
}
