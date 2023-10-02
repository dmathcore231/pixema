import "../FormInput/styles.scss"
import "./styles.scss"
import filterIcon from "../../images/interface/filter-icon.png"
import { FormInput } from "../FormInput"
import { Modal } from "../Modal"
import { useState } from "react"
import { FilterPanel } from "../FilterPanel"

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
      <Modal
        isActive={isActive}
        title="Filters"
        onClose={() => setIsActive(false)}
        onSubmit={() => setIsActive(false)}
        modalClass="modal_filter"
      >
        <FilterPanel />
      </Modal>
    </>
  )
}
