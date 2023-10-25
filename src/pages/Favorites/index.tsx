import "./styles.scss"
import { useState } from "react"
import { NoContent } from "../../components/NoContent"

export function Favorites(): JSX.Element {
  const [data, setData] = useState([])

  return (
    <div className="favorites">
      <div className="favorites__content">
        {data.length ? data : <NoContent text="No favorites yet" />}
      </div>
    </div>
  )
}
