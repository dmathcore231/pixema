import "./styles.scss"
import { FormInput } from '../FormInput'
import { Btn } from '../Btn'
import { useState } from 'react'

export function SignUp(): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      name,
      email,
      password,
      confirmPassword,
    }
    console.log(data)
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }
  return (
    <form className="sign-up" onSubmit={handleSubmit}>
      <div className="sign-up__title">
        <h2>Sign Up</h2>
      </div>
      <div className="sign-up__item">
        <FormInput
          label={true}
          htmlFor="name"
          children="Name"
          type="text"
          id="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
      </div>
      <div className="sign-up__item">
        <FormInput
          label={true}
          htmlFor="email"
          children="Email"
          type="email"
          id="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
        />
      </div>
      <div className="sign-up__item">
        <FormInput
          label={true}
          htmlFor="password"
          children="Password"
          type="password"
          id="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
        />
      </div>
      <div className="sign-up__item">
        <FormInput
          label={true}
          htmlFor="confirm-password"
          children="Confirm password"
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required={true}
        />
      </div>
      <div className="sign-up__item">
        <Btn
          type="submit"
          className="btn_primary"
        >
          Sign Up
        </Btn>
      </div>
      <div className="sign-up__already-account">
        <a href="/sign-in"
          className="subtitle subtitle_size_xs subtitle_color_secondary subtitle_weight_500">
          Already have an account? <span>Sign In</span></a>
      </div>
    </form>
  )
}
