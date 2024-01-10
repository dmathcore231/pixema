import "../FormInput/styles.scss"
import "./styles.scss"
import { FormInput } from "../FormInput"
import { useState } from "react"
import { Btn } from "../Btn"
import { Modal } from "../Modal"
import { FiltersModal } from "../FiltersModal"
import { BurgerIcon } from "../../images/Icons/BurgerIcon"

export function SearchInput(): JSX.Element {
  const [isActive, setIsActive] = useState(false)
  const [clickBtnClear, setClickBtnClear] = useState(false)
  const [clickBtnSubmit, setClickBtnSubmit] = useState(false)

  function handleSubmitModal() {
    setClickBtnSubmit(true)
  }

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
          className="btn_padding_none btn_search"
          onClick={() => setIsActive(true)}
          form="search-form"
        >
          <BurgerIcon width="24" height="24" />
        </Btn>
      </form>
      <Modal isActive={isActive}
        modalClass="modal_filter"
        title="Filters"
        titleBtnClose="Clear filter"
        titleBtnSubmit="Show results"
        onSubmit={() => handleSubmitModal()}
        onCloseInFooter={() => setClickBtnClear(true)}
        onClose={() => setIsActive(false)}
      >
        <FiltersModal
          stateClear={clickBtnClear}
          setStateClear={setClickBtnClear}
          stateSubmit={clickBtnSubmit}
          setStateSubmit={setClickBtnSubmit}
        />
      </Modal>
    </>
  )
}
