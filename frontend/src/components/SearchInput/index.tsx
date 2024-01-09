import "../FormInput/styles.scss"
import "./styles.scss"
import filterIcon from "../../images/interface/filter-icon.png"
import { FormInput } from "../FormInput"
import { useState } from "react"
import { Btn } from "../Btn"
import { Modal } from "../Modal"
import { FiltersModal } from "../FiltersModal"

export function SearchInput(): JSX.Element {
  const [isActive, setIsActive] = useState(false)
  const [clickBtnClear, setClickBtnClear] = useState(false)

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
      <Modal isActive={isActive}
        modalClass="modal_filter"
        title="Filters"
        titleBtnClose="Clear filter"
        titleBtnSubmit="Show results"
        onSubmit={() => setIsActive(false)}
        onCloseInFooter={() => setClickBtnClear(true)}
        onClose={() => setIsActive(false)}
      >
        <FiltersModal
          stateClear={clickBtnClear}
          setStateClear={setClickBtnClear}
        />
      </Modal>
    </>
  )
}
