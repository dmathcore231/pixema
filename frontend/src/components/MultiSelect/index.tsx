import './styles.scss'
import { ArrowRightSelect } from '../../images/Icons/ArrowRightSelect'

export interface MultiSelectProps {
  placeholder?: string
  className?: string
}

export function MultiSelect({ placeholder, className }: MultiSelectProps): JSX.Element {
  return (
    <div className={"multi-select" + (className ? " " + className : "")}>
      <div className='multi-select-value'>
        <div className='multi-select-value__item'>
          <div className='multi-select-value__placeholder'>
            {placeholder
              ? placeholder
              : 'Select options'}
          </div>
        </div>
        <div className='multi-select-value__icon'><ArrowRightSelect width="24" height="24" /></div>
      </div>
    </div>
  )
}
