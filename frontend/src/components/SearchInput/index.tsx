import "../FormInput/styles.scss"
import "./styles.scss"
import { useAppSelector } from "../../hooks"
import { FormInput } from "../FormInput"
import { useState } from "react"
import { Btn } from "../Btn"
import { Modal } from "../Modal"
import { FiltersModal } from "../FiltersModal"
import { BurgerIcon } from "../../images/Icons/BurgerIcon"
import { ActiveBurgerIcon } from "../../images/Icons/ActiveBurgerIcon"

export function SearchInput(): JSX.Element {
  const { activeFilters } = useAppSelector(state => state.movies)

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
          className="btn_padding_none btn_search"
          onClick={() => setIsActive(true)}
          form="search-form"
        >
          {activeFilters
            ? <ActiveBurgerIcon width={'24'} height={'24'} />
            : <BurgerIcon width='24' height='24' />}
        </Btn>
      </form>
      <Modal isActive={isActive}
        modalSubmit={false}
        modalClass="modal_filter"
        title="Filters"
        onClose={() => setIsActive(false)}
      >
        <FiltersModal
          setStateIsActive={setIsActive}
        />
      </Modal>
    </>
  )
}
