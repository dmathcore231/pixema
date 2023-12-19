import './styles.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormInput } from '../FormInput'
import { Btn } from '../Btn'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchUserAuthorization } from '../../redux/userSlice'

export function SignIn(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorField, setErrorField] = useState('')

  const emailElement = document.querySelector('#email') as HTMLElement
  const passwordElement = document.querySelector('#password') as HTMLElement

  const { status, errorMessage } = useAppSelector(state => state.user)

  useEffect(() => {
    if (isSubmit) {
      dispatch(fetchUserAuthorization({ email, password }))
      setIsSubmit(false)
    }

    if (errorMessage === "User not found") {
      setErrorField('email')
      setIsSubmit(false)
      setEmail('')
      setPassword('')
      emailElement?.focus()
    } else if (errorMessage === "Invalid password") {
      setErrorField('password')
      setIsSubmit(false)
      setEmail('')
      setPassword('')
      passwordElement?.focus()
    }
    if (status === 200) {
      navigate('/')
    }
  }, [isSubmit, errorMessage, status])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(true)
  }
  return (
    <form className='sign-in' onSubmit={handleSubmit}>
      <div className='sign-in__title'>
        <h2>Sign In</h2>
      </div>
      <div className='sign-in__item'>
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
          className={errorField === 'email' ? 'primary-input_error' : ''}
        />
      </div>
      <div className='sign-in__item'>
        <FormInput
          label={true}
          htmlFor='password'
          children='Password'
          type='password'
          id='password'
          placeholder='Your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          className={errorField === 'password' ? 'primary-input_error' : ''}
        />
        <Link
          to='/reset-password'
          className='sign-in__forgot
         subtitle subtitle_size_xxs subtitle_color_secondary subtitle_align_left subtitle_weight_500'>
          Forgot your password?
        </Link>
      </div>
      <div className='sign-in__item'>
        <Btn
          type='submit'
          className='btn_primary'
        >
          Sign In
        </Btn>
      </div>
      <div className='sign-in__no-account'>
        <a href='/sign-up'
          className='subtitle subtitle_size_xs subtitle_color_secondary subtitle_weight_500'>
          Don’t have an account? <span>Sign Up</span></a>
      </div>
    </form>
  )
}
