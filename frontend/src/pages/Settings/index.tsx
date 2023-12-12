import "./styles.scss"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { fetchUpdateUserData, logout } from "../../redux/userSlice"
import { FormInput } from "../../components/FormInput"
import { Switch } from "../../components/Switch"
import { Btn } from "../../components/Btn"

export function Settings() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user, status, errorMessage } = useAppSelector(state => state.user)

  const [valueName, setValueName] = useState('')
  const [valueEmail, setValueEmail] = useState('')
  const [valuePassword, setValuePassword] = useState('')
  const [valueNewPassword, setValueNewPassword] = useState('')
  const [valueConfirmPassword, setValueConfirmPassword] = useState('')
  const [initialValueName, setInitialValueName] = useState('')
  const [initialValueEmail, setInitialValueEmail] = useState('')
  const [errorField, setErrorField] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  const passwordElement = document.querySelector('#password') as HTMLElement
  const newPasswordElement = document.querySelector('#new-password') as HTMLElement

  useEffect(() => {
    if (user) {
      setValueName(user.userName)
      setValueEmail(user.email)
      setInitialValueName(user.userName)
      setInitialValueEmail(user.email)
    }
  }, [user])

  useEffect(() => {
    if (isSubmit) {
      dispatch(fetchUpdateUserData({ userName: valueName, email: valueEmail, password: valuePassword, newPassword: valueNewPassword }))
    }
    setValuePassword('')
    setValueNewPassword('')
    setValueConfirmPassword('')
  }, [isSubmit])

  useEffect(() => {

    if (errorMessage === 'Invalid password') {
      setIsSubmit(false)
      setErrorField('password')
      passwordElement?.focus()
      setValuePassword('')
      setValueNewPassword('')
      setValueConfirmPassword('')
    } else if (status === 200) {
      setIsSubmit(false)
      setErrorField('')
      setInitialValueName(valueName)
      setInitialValueEmail(valueEmail)
    }
  }, [errorMessage, status, user])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (valueNewPassword === valueConfirmPassword) {
      setIsSubmit(true)
      setErrorField('')
    } else {
      setIsSubmit(false)
      setErrorField('newPassword')
      setValuePassword('')
      setValueNewPassword('')
      setValueConfirmPassword('')
      newPasswordElement?.focus()
    }
  }

  function handleClickCancel() {
    setValueName(initialValueName)
    setValueEmail(initialValueEmail)
  }

  function handleClickLogout() {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className="settings">
      <form className="settings__content" onSubmit={handleSubmit}>
        <div className="settings__item">
          <div className="settings__title">
            <h2>Profile</h2>
          </div>
          <div className="settings__wrapper">
            <div className="settings__input">
              <FormInput
                label={true}
                children="Name"
                htmlFor="name"
                type="text"
                id="name"
                placeholder="Your name"
                value={valueName}
                required={true}
                onChange={(e) => setValueName(e.target.value)}
              />
            </div>
            <div className="settings__input">
              <FormInput
                label={true}
                htmlFor="email"
                children="Email"
                type="email"
                id="email"
                placeholder="Your email"
                value={valueEmail}
                required={true}
                onChange={(e) => setValueEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__title">
            <h2>Password</h2>
          </div>
          <div className="settings__wrapper">
            <div className="settings__input">
              <FormInput
                label={true}
                htmlFor="password"
                children="Password"
                type="password"
                id="password"
                placeholder="Your password"
                value={valuePassword}
                required={true}
                onChange={(e) => setValuePassword(e.target.value)}
                className={errorField === 'password' ? 'primary-input_error' : ''}
              />
            </div>
            <div className="settings__input-wrapper">
              <div className="settings__input">
                <FormInput
                  label={true}
                  htmlFor="new-password"
                  children="New password"
                  type="password"
                  id="new-password"
                  placeholder="New password"
                  value={valueNewPassword}
                  onChange={(e) => setValueNewPassword(e.target.value)}
                  className={errorField === 'newPassword' ? 'primary-input_error' : ''}
                />
              </div>
              <div className="settings__input">
                <FormInput
                  label={true}
                  htmlFor="confirm-password"
                  children="Confirm password"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm password"
                  value={valueConfirmPassword}
                  onChange={(e) => setValueConfirmPassword(e.target.value)}
                  className={errorField === 'newPassword' ? 'primary-input_error' : ''}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__title">
            <h2>Color mode</h2>
          </div>
          <div className="settings__wrapper">
            <div className="settings__mode-text">
              <div className="subtitle subtitle_size_s ">
                Dark
              </div>
              <div className="subtitle subtitle_size_xxs subtitle_weight_500 subtitle_color_secondary">
                Use dark thema
              </div>
            </div>
            <div className="settings__mode-switch">
              <Switch />
            </div>
          </div>
        </div>
        <div className="settings__item">
          <div className="settings__btn">
            <Btn
              type='button'
              className='btn_secondary'
              onClick={handleClickCancel}
            >
              Cancel
            </Btn>
            <Btn
              type='submit'
              className='btn_primary'>
              Save
            </Btn>
          </div>
        </div>
        <div className="settings__item settings__item_logout">
          <Btn
            type='button'
            className='btn_danger'
            onClick={handleClickLogout}
          >
            Log out
          </Btn>
        </div>
      </form>
    </div>
  )
}
