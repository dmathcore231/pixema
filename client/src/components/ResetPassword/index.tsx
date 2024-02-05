import "./styles.scss"
import { useState } from "react"
import { FormInput } from "../FormInput"
import { Btn } from "../Btn"

export function ResetPassword(): JSX.Element {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEmail('')
    setMessage(`You will receive an email ${email} with a link to reset your password!`)
  }

  return (
    <form className="reset-password" onSubmit={handleSubmit}>
      <div className="reset-password__title">
        <h2>Reset Password</h2>
      </div>
      <div
        className="reset-password__message
      subtitle subtitle_size_xs subtitle_weight_500">
        {message}
      </div>
      <div className="reset-password__item">
        <FormInput
          label={true}
          htmlFor='email'
          children='Email'
          type='email'
          id='email'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />

      </div>
      <div className="reset-password__item">
        <Btn
          type='submit'
          className='btn_primary'
        >
          Reset
        </Btn>
      </div>
    </form>
  )
}
