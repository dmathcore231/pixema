import "./styles.scss"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchDashboard } from "../../redux/dashboardSlice"
import { FormInput } from "../../components/FormInput"
import { Btn } from "../../components/Btn"
import { getDataLocalStorage, setDataLocalStorage } from "../../helpers"

export function DashboardLogin(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorField, setErrorField] = useState('')

  const passwordElement = document.querySelector('#password') as HTMLElement

  const { status } = useAppSelector(state => state.dashboard)

  useEffect(() => {

    if (getDataLocalStorage('isAuth') === 'true') {
      navigate('/dashboard/main')
    }

    if (isSubmit) {
      setIsSubmit(false)
      setPassword('')
      dispatch(fetchDashboard({ name: 'DashboardMain', password: password }))
    }

    if (status === 401) {
      setErrorField('password')
      setIsSubmit(false)
      setPassword('')
      passwordElement?.focus()
    }

    if (status === 200) {
      setPassword('')
      setErrorField('')
      setIsSubmit(false)
      navigate('/dashboard/main')
      setDataLocalStorage('isAuth', 'true')
    }
  }, [isSubmit, status])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(true)
  }

  return (
    <div className="dashboard-wrapper">
      <form className="dashboard-login" onSubmit={handleSubmit}>
        <div className="dashboard-login__title">
          <h2>Dashboard</h2>
        </div>
        <div className="dashboard-login__item">
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
            className={errorField === 'password' ? 'primary-input_error' : ''}
          />
        </div>
        <div className="dashboard-login__item">
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
