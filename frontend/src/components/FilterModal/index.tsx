import "./styles.scss"
import { FilterModalProps } from "../../types/interfaces/FilterModalProps"
import { CloseIcon } from "../../images/Icons/CloseIcon"
import { Tabs } from "../Tabs"
import { FormInput } from "../FormInput"
import { useState } from "react"
import Select from "react-select"
import { Btn } from "../Btn"

export function FilterModal(
  { isActive, title, onClose, onSubmit }: FilterModalProps): JSX.Element | null {
  const [selectedOptionsMulti, setSelectedOptionsMulti] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [valueOptions, setValueOptions] = useState("years")
  const [titleMovie, setTitleMovie] = useState('')
  const [yearsFrom, setYearsFrom] = useState('')
  const [yearsTo, setYearsTo] = useState('')
  const [ratingFrom, setRatingFrom] = useState('')
  const [ratingTo, setRatingTo] = useState('')

  const optionListGenre = [
    { value: "adventure", label: "Adventure" },
    { value: "dramma", label: "Dramma" },
    { value: "documental", label: "Documental" },
    { value: "thriller", label: "Thriller" },
  ]

  const optionListCountry = [
    { value: "eng", label: "English" },
    { value: "fra", label: "French" },
    { value: "ru", label: "Russian" },
    { value: "spa", label: "Spanish" },
    { value: "ger", label: "German" },
    { value: "ita", label: "Italian" },
    { value: "kor", label: "Korean" },
  ]

  function handleClickTab(target: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    setValueOptions(target.currentTarget.value)
  }

  function handleSelectMulti(data) {
    setSelectedOptionsMulti(data)
  }

  function handleSelect(data) {
    setSelectedOptions(data)
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitleMovie(event.target.value)
  }

  function handleYearFromChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setYearsFrom(event.target.value)
  }

  function handleYearToChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setYearsTo(event.target.value)
  }

  function handleRatingFromChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setRatingFrom(event.target.value)
  }

  function handleRatingToChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setRatingTo(event.target.value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const data = {
      sortBy: valueOptions,
      title: titleMovie,
      yearsFrom: yearsFrom,
      yearsTo: yearsTo,
      ratingFrom: ratingFrom,
      ratingTo: ratingTo,
      selectedOptions: selectedOptions,
      selectedOptionsMulti: selectedOptionsMulti,
      valueOptions: valueOptions,
    }
    setTitleMovie('')
    setYearsFrom('')
    setYearsTo('')
    setRatingFrom('')
    setRatingTo('')
    setValueOptions("years")
    setSelectedOptions([])
    setSelectedOptionsMulti([])
    console.log(data)
    onSubmit(event)
  }

  function handleClickBtnClear(): void {
    setTitleMovie('')
    setYearsFrom('')
    setYearsTo('')
    setRatingFrom('')
    setRatingTo('')
    setValueOptions("years")
    setSelectedOptions([])
    setSelectedOptionsMulti([])
  }

  if (!isActive) {
    return null
  } else {
    return (
      <div className="modal modal_filter">
        <div className="modal__content modal__content_height_100">
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <div className="modal__close-btn">
              <Btn
                type="button"
                className="btn btn_close modal__btn-close"
                onClick={onClose}
              >
                <CloseIcon width="24" height="24" />
              </Btn>
            </div>
          </div>
          <div className="modal__body">
            <form className="filter-panel" onSubmit={handleSubmit} id="filter-form">
              <div className="filter-panel__item">
                <div className="select-title subtitle subtitle_size_xxs">
                  Sort by
                </div>
                <Tabs
                  name="sort"
                  value={["rating", "year"]}
                  titleTabs={["Rating", "Years"]}
                  onClick={handleClickTab}
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
                  onChange={handleTitleChange}
                  value={titleMovie}
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
                      value={selectedOptionsMulti}
                      onChange={handleSelectMulti}
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
                    type="number"
                    placeholder="From"
                    children="Years"
                    onChange={handleYearFromChange}
                    value={yearsFrom}
                    min={1890}

                  />
                </div>
                <div className="filter-panel__wrapper">
                  <FormInput
                    label={true}
                    htmlFor="yearTo"
                    id="yearTo"
                    type="number"
                    placeholder="To"
                    onChange={handleYearToChange}
                    value={yearsTo}
                    min={1890}
                    max={2050}
                  />
                </div>
              </div>
              <div className="filter-panel__item filter-panel__item_flex-row">
                <div className="filter-panel__wrapper">
                  <FormInput
                    label={true}
                    htmlFor="ratingFrom"
                    id="ratingFrom"
                    type="number"
                    placeholder="From"
                    children="Rating"
                    onChange={handleRatingFromChange}
                    value={ratingFrom}
                    min={0}
                    max={10}
                  />
                </div>
                <div className="filter-panel__wrapper">
                  <FormInput
                    label={true}
                    htmlFor="ratingTo"
                    id="ratingTo"
                    type="number"
                    placeholder="To"
                    onChange={handleRatingToChange}
                    value={ratingTo}
                    min={0}
                    max={10}
                  />
                </div>
              </div>
              <div className="filter-panel__item">
                <div className="select">
                  <div className="select-title subtitle subtitle_size_xxs">
                    Country
                  </div>
                  <div className="dropdown-container">
                    <Select
                      options={optionListCountry}
                      placeholder="Select country"
                      value={selectedOptions}
                      onChange={handleSelect}
                      isSearchable={true}
                      isMulti
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal__footer">
            <Btn
              className="btn_secondary modal__btn-clear"
              onClick={handleClickBtnClear}
              type="button"
              form="filter-form"
            >
              Clear filter
            </Btn>
            <Btn
              className="btn_primary modal__btn-submit"
              type="submit"
              form="filter-form"
            >
              Show results
            </Btn>
          </div>
        </div>
      </div>
    )
  }
}
