import "./styles.scss"
import { Tabs } from "../Tabs"
import { FormInput } from "../FormInput"
import { useState } from "react"
import Select from "react-select";

export function FilterPanel(): JSX.Element {
  const [selectedOptions, setSelectedOptions] = useState();
  const optionListGenre = [
    { value: "adventure", label: "Adventure" },
    { value: "dramma", label: "Dramma" },
    { value: "documental", label: "Documental" },
    { value: "thriller", label: "Thriller" },
  ]
  function handleClickTab(target: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    console.log(target.currentTarget.value)
  }

  function handleSelect(data) {
    setSelectedOptions(data)
  }
  return (
    <form className="filter-panel">
      <div className="filter-panel__item">
        <Tabs
          name="sort"
          value={["rating", "year"]}
          titleTabs={["Rating", "Years"]}
          onClick={handleClickTab}
          amount={2}
          isChecked={"year"} />
      </div>
      <div className="filter-panel__item">
        <FormInput
          label={true}
          htmlFor="search"
          id="search"
          type="text"
          placeholder="Your text"
          children="Full or short movie name"
        />
      </div>
      <div className="filter-panel__item">
        <div className="multi-select">
          <div className="select-title subtitle subtitle_size_xxs">
            Genre
          </div>
          <div className="dropdown-container">
            <Select
              options={optionListGenre}
              placeholder="Сhoose a genre"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
              classNamePrefix="react-select"
            />
          </div>
        </div>
      </div>
      <div className="filter-panel__item filter-panel__item_flex-row">
        <div className="filter-panel__wrapper">
          <FormInput
            label={true}
            htmlFor="yearFrom"
            id="yearFrom"
            type="text"
            placeholder="From"
            children="Years"
          />
        </div>
        <div className="filter-panel__wrapper">
          <FormInput
            label={true}
            htmlFor="yearTo"
            id="yearTo"
            type="text"
            placeholder="To"
          />
        </div>
      </div>
      <div className="filter-panel__item filter-panel__item_flex-row">
        <div className="filter-panel__wrapper">
          <FormInput
            label={true}
            htmlFor="ratingFrom"
            id="ratingFrom"
            type="text"
            placeholder="From"
            children="Rating"
          />
        </div>
        <div className="filter-panel__wrapper">
          <FormInput
            label={true}
            htmlFor="ratingTo"
            id="ratingTo"
            type="text"
            placeholder="To"
          />
        </div>
      </div>
      <div className="filter-panel__item">

      </div>
    </form>
  )
}
