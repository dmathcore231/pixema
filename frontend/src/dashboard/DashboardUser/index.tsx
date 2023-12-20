import "./styles.scss"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchUserById, fetchUpdateUserData } from "../../redux/dashboardSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Spinner } from "../../components/Spinner"
import { FormInput } from "../../components/FormInput"
import { Btn } from "../../components/Btn"
import { NavLink } from "react-router-dom"

export function DashboardUser(): JSX.Element {
  const dispatch = useAppDispatch()
  const { userId } = useParams()
  const { userById, loading } = useAppSelector(state => state.dashboard)

  const [isSubmit, setIsSubmit] = useState(false)
  const [formUserData, setFormUserData] = useState({
    userName: '',
    email: '',
    userRole: '',
    userId: ''
  })

  useEffect(() => {
    dispatch(fetchUserById(userId!))
  }, [dispatch, userId])

  useEffect(() => {
    if (userById) {
      setFormUserData({
        userName: userById.userName || '',
        email: userById.email || '',
        userRole: userById._role || '',
        userId: userById._id || ''
      })
    }
  }, [userById])

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(false)
      dispatch(fetchUpdateUserData(formUserData))
    }
  }, [dispatch, isSubmit, formUserData])

  if (loading) {
    return (
      <div className="dashboard-users">
        <div className="dashboard-users__title">
          <h2>User</h2>
        </div>
        <div className="dashboard-users__spinner">
          <Spinner width="40" height="40" />
        </div>
      </div>
    )
  }

  function handleClickCancelBtn() {
    if (userById) {
      setFormUserData({
        userName: userById.userName,
        email: userById.email,
        userRole: userById._role,
        userId: userById._id
      })
    }

  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(true)
  }

  return (
    <div className="dashboard-users">
      <div className="dashboard-users__title">
        <h2>User</h2>
      </div>
      <div className="link-back">
        <NavLink
          to='#'
          onClick={() => window.history.back()}
        >
          Back
        </NavLink>
      </div>
      <form className="user-form" onSubmit={handleSubmit}>
        <FormInput
          label={true}
          htmlFor='userName'
          children='User Name'
          type='text'
          id='userName'
          placeholder='User Name'
          value={formUserData.userName}
          onChange={e => setFormUserData({ ...formUserData, userName: e.target.value })}
          required={true}
        />
        <FormInput
          label={true}
          htmlFor='email'
          children='Email'
          type='email'
          id='email'
          placeholder='User Email'
          value={formUserData.email}
          onChange={e => setFormUserData({ ...formUserData, email: e.target.value })}
          required={true}
        />
        <FormInput
          label={true}
          htmlFor='userRole'
          children='Role'
          type='text'
          id='userRole'
          placeholder='User Role'
          value={formUserData.userRole}
          onChange={e => setFormUserData({ ...formUserData, userRole: e.target.value })}
          required={true}
        />
        <FormInput
          label={true}
          htmlFor='userId'
          children='ID'
          type='text'
          id='userId'
          placeholder='User ID'
          value={formUserData.userId}
          required={true}
          disabled={true}
        />
        <div className="user-form__btn-group">
          <Btn
            type='button'
            className='btn_secondary'
            onClick={handleClickCancelBtn}
          >
            Cancel
          </Btn>
          <Btn
            type="submit"
            className="btn_primary"
          >
            Edit
          </Btn>
        </div>
      </form>

    </div>
  )
}
