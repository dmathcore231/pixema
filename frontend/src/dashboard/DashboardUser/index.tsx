import "./styles.scss"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchUserById, fetchUpdateUserData, fetchDeleteUser } from "../../redux/dashboardSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Spinner } from "../../components/Spinner"
import { FormInput } from "../../components/FormInput"
import { Btn } from "../../components/Btn"
import { NavLink } from "react-router-dom"
import { ArrowLeft } from "../../images/Icons/ArrowLeft"
import { Modal } from "../../components/Modal"

export function DashboardUser(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userId } = useParams()

  const { userById, loading } = useAppSelector(state => state.dashboard)
  const { user } = useAppSelector(state => state.user)


  const [isActiveModal, setIsActiveModal] = useState(false)
  const [isSubmitModal, setIsSubmitModal] = useState(false)
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

  useEffect(() => {
    if (isSubmitModal) {
      setIsSubmitModal(false)
      dispatch(fetchDeleteUser(formUserData.userId))
      navigate('/dashboard/users')
    }
  }, [dispatch, isSubmitModal, formUserData])

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

  function handelClickBtnDelete() {
    setIsActiveModal(true)
  }

  function handelSubmitModalDeleteUser() {
    setIsSubmitModal(true)
    setIsActiveModal(false)
  }

  return (
    <div className="dashboard-users">
      <div className="dashboard-users__title">
        <h2>User</h2>
      </div>
      <div className="link-back">
        <NavLink
          className='link-back__item'
          to='#'
          onClick={() => window.history.back()}
        >
          <ArrowLeft width="35" height="35" />
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
        <div className="user-form__btn">
          <Btn
            type='button'
            className='btn_danger'
            onClick={handelClickBtnDelete}
            disabled={user!._id === formUserData.userId}
          >
            Delete
          </Btn>
        </div>
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
        <Modal
          isActive={isActiveModal}
          modalClass="modal_delete-user"
          title="Delete User"
          titleBtnSubmit="Delete"
          titleBtnClose="Cancel"
          onClose={() => setIsActiveModal(false)}
          onSubmit={handelSubmitModalDeleteUser}
          children={
            <div className="modal_delete-user__text">
              Are you sure you want to delete this user?
            </div>}
          classBtnSubmit="btn_danger"
        />
      </form>

    </div>
  )
}
