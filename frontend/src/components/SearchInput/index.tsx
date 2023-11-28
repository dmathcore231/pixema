import "../FormInput/styles.scss"
import "./styles.scss"
import filterIcon from "../../images/interface/filter-icon.png"
import { FormInput } from "../FormInput"
import { useState } from "react"
import { FilterModal } from "../FilterModal"
import { Btn } from "../Btn"

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
          className="primary-input_padding-right_small"
        />
        <Btn
          type="button"
          className="btn_search"
          onClick={() => setIsActive(true)}
          form="search-form"
        >
          <img src={filterIcon} alt="filter" />
        </Btn>
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
