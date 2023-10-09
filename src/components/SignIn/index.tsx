import './styles.scss'
import { FormInput } from '../FormInput'
import { Btn } from '../Btn'
import { useState } from 'react'

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      email,
      password,
    }
    console.log(data)
    setEmail('')
    setPassword('')
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
        <a href='#' className='sign-in__forgot subtitle subtitle_size_xxs subtitle_color_secondary subtitle_align_left subtitle_weight_500'>Forgot your password?</a>
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
        <a href='#' className='subtitle subtitle_size_xs subtitle_color_secondary subtitle_weight_500'>Don’t have an account? <span>Sign Up</span></a>
      </div>
    </form>
  )
}
