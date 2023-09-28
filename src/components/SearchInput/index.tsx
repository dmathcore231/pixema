import "../FormInput/styles.scss"
import "./styles.scss"
import filterIcon from "../../images/interface/filter-icon.png"
import { FormInput } from "../FormInput"

export function SearchInput(): JSX.Element {
  return (
    <form className="search-form">
      <FormInput
        label={false}
        type="text"
        id="search"
        placeholder="Search"
        className="primary-input__search"
        required={true}
      />
      <button className="btn btn_search">
        <img src={filterIcon} alt="filter" />
      </button>
    </form>
  )
}
