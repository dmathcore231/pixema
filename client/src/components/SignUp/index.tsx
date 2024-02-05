import "./styles.scss"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormInput } from '../FormInput'
import { Btn } from '../Btn'
import { fetchUserRegistration } from "../../redux/userSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"

export function SignUp(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorField, setErrorField] = useState('')

  const nameElement = document.querySelector('#name') as HTMLElement
  const emailElement = document.querySelector('#email') as HTMLElement

  const { status, message } = useAppSelector(state => state.user)

  useEffect(() => {
    if (isSubmit) {
      dispatch(fetchUserRegistration({ formSignUp: { userName, email, password } }))
    }
  }, [isSubmit])

  useEffect(() => {
    if (message === "User already exists") {
      setErrorField('name')
      setIsSubmit(false)
      setPassword('')
      setConfirmPassword('')
      nameElement?.focus()
    } else if (message === "Email already exists") {
      setErrorField('email')
      setIsSubmit(false)
      setPassword('')
      setConfirmPassword('')
      emailElement?.focus()
    }
  }, [message, isSubmit])

  useEffect(() => {
    if (status === 201) {
      navigate('/sign-in')
    }
  }, [status])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password === confirmPassword) {
      setIsSubmit(true)
      setErrorField('')

    } else {
      setIsSubmit(false)
      setErrorField('password')
      setPassword('')
      setConfirmPassword('')
    }
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
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required={true}
          className={errorField === 'name' ? 'primary-input_error' : ''}
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
          className={errorField === 'email' ? 'primary-input_error' : ''}
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
          className={errorField === 'password' ? 'primary-input_error' : ''}
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
          className={errorField === 'password' ? 'primary-input_error' : ''}
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
