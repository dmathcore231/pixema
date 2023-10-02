import "./styles.scss"
import { Tabs } from "../Tabs"
import { FormInput } from "../FormInput"

export function FilterPanel(): JSX.Element {

  function handleClickTab(target: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    console.log(target.currentTarget.value)
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
    </form>
  )
}
