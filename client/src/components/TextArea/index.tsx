import './styles.scss'
import { TextAreaProps } from '../../types/interfaces/TextAreaProps'

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
