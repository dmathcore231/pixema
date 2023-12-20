import "./styles.scss"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { fetchAllUsers } from "../../redux/dashboardSlice"
import { Spinner } from "../../components/Spinner"
import { Error } from "../../components/Error"
import { Btn } from "../../components/Btn"

export function DashboardUsers(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { users, loading, error } = useAppSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  if (loading) {
    return (
      <div className="dashboard-users">
        <div className="dashboard-users__title">
          <h2>Users</h2>
        </div>
        <div className="dashboard-users__spinner">
          <Spinner width="40" height="40" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dashboard-users">
        <div className="dashboard-users__title">
          <h2>Users</h2>
        </div>
        <div className="dashboard-users__error">
          <Error />
        </div>
      </div>
    )
  }
  function handleClickBtnEdit(userId: string) {
    navigate(`/dashboard/users/${userId}`)
  }

  function renderUserTable() {
    if (users) {
      return (
        <table className="table-users">
          <thead className="table-users__head">
            <tr className="total-user">
              <th className="total-user__item">
                Total users: {users.length}
              </th>
            </tr>
          </thead>
          <tbody className="table-users__body">
            <tr className="table-users-col">
              <th className="table-users-col__item">Number</th>
              <th className="table-users-col__item">ID</th>
              <th className="table-users-col__item">Name</th>
              <th className="table-users-col__item">Email</th>
              <th className="table-users-col__item">Edit</th>
            </tr>
            {users.map((user, index) => (
              <tr key={user._id} className="table-users-row">
                <td className="table-users-row__item">{index + 1}</td>
                <td className="table-users-row__item">{user._id}</td>
                <td className="table-users-row__item">{user.userName}</td>
                <td className="table-users-row__item">{user.email}</td>
                <td className="table-users-row__item">
                  <Btn
                    type="button"
                    className="btn"
                    onClick={() => handleClickBtnEdit(user._id)}
                  >
                    Edit
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

  return (
    <div className="dashboard-users">
      <div className="dashboard-users__title">
        <h2>Users</h2>
      </div>
      <div className="dashboard-users__content">
        {renderUserTable()}
      </div>
    </div>
  )

}
