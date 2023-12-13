import "./styles.scss"
import { useState } from 'react'
import { FormInput } from '../../components/FormInput'
import { Btn } from "../../components/Btn"

export function Dashboard(): JSX.Element {
  const [password, setPassword] = useState('')

  return (
    <div className="dashboard">
      <form className="dashboard-modal">
        <div className="dashboard-modal__title">
          <h2>Dashboard</h2>
        </div>
        <div className="dashboard-modal__item">
          <FormInput
            label={true}
            htmlFor='password'
            children='Password'
            type='password'
            id='password'
            placeholder='Enter password dashboard'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>
        <div className="dashboard-modal__item">
          <Btn
            type='submit'
            className='btn_primary'
          >
            Sign In
          </Btn>
        </div>
      </form>
    </div>
  )
}
