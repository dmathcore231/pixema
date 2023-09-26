import "../FormInput/styles.scss"
import "./styles.scss"
import filterIcon from "../../images/interface/filter-icon.png"

export function SearchInput(): JSX.Element {
  return (
    <form className="search-form">
      <div className="input-button-wrapper">
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="primary-input"
          required
        />
        <button type="submit" className="btn">
          <img src={filterIcon} alt="filter" />
        </button>
      </div>
    </form>
  )
}
