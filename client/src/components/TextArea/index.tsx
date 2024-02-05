import './styles.scss'
import { ReactNode } from 'react'

export interface TextAreaProps {
  label: boolean
  maxlength: number
  minlength: number
  required: boolean
  htmlFor?: string
  children?: ReactNode
  id?: string
  placeholder?: string
  value?: string
  className?: string
  disabled?: boolean
  cols?: number
  rows?: number
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
export function TextArea({ label, maxlength, minlength, required, htmlFor, children, id, placeholder, value, className, disabled, cols, rows, name, onChange }: TextAreaProps): JSX.Element {
  return (
    <div className='text-area-container'>
      {label
        ? (
          <label htmlFor={htmlFor} className='subtitle subtitle_size_xxs text-area-label'>
            {children}
          </label>
        )
        : null
      }
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        disabled={disabled}
        maxLength={maxlength}
        minLength={minlength}
        cols={cols}
        rows={rows}
        onChange={onChange}
        className={'text-area' + (className ? ' ' + className : '')}
        autoComplete="off"
        spellCheck="true"
      />
    </div>

  )
}
