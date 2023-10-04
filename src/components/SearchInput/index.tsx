import "../FormInput/styles.scss"
import "./styles.scss"
import filterIcon from "../../images/interface/filter-icon.png"
import { FormInput } from "../FormInput"
import { useState } from "react"
import { FilterModal } from "../FilterModal"

export function SearchInput(): JSX.Element {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <form className="search-form">
        <FormInput
          label={false}
          type="text"
          id="search"
          placeholder="Search"
          required={true}
        />
        <button className="btn btn_search" onClick={() => setIsActive(true)} type="button">
          <img src={filterIcon} alt="filter" />
        </button>
      </form>
      <FilterModal
        isActive={isActive}
        onClose={() => setIsActive(false)}
        onSubmit={() => setIsActive(false)}
        title="Filter"
      />
    </>
  )
}
