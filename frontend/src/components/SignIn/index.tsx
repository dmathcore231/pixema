import './styles.scss'
import { FormInput } from '../FormInput'
import { Btn } from '../Btn'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { requestSignIn } from '../../services/auth'
import { setDataLocalStorage } from '../../helpers'
import { clientRest } from '../../utils/client'

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setEmail('')
    setPassword('')
    try {
      const response = await requestSignIn({ email, password })

      if (response.status === 200) {
        setDataLocalStorage('accessToken', response.data.accessToken)
        setDataLocalStorage('refreshToken', response.data.refreshToken)
        clientRest.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
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
