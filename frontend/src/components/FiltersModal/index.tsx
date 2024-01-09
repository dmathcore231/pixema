import './styles.scss'
import { Tabs } from '../Tabs'
import { OptionsSelect } from '../../types/OptionsSelect'
import { FormInput } from '../FormInput'
import { MultiSelect } from '../MultiSelect'
import { GENRE } from '../../helpers'
import { COUNTRY } from '../../helpers'

export function FiltersModal(): JSX.Element {

  function handleClickTabs(option: OptionsSelect) {
    console.log(option)
  }

  return (
    <form className="filters" id="filters-form">
      <div className='filters__item filters__item_border_bottom filters__item_flex_col'>
        <label className="filters__label subtitle subtitle_size_xxs">
          Sort by
        </label>
        <Tabs
          options={[
            { label: 'Rating', value: 'rating' },
            { label: 'Year', value: 'year' },
          ]}
          onChangeTabs={handleClickTabs}
        />
      </div>
      <div className='filters__item'>
        <FormInput
          label={true}
          htmlFor="title"
          children="Full or short movie name"
          type="text"
          id="title"
          placeholder="Your text"
        />
      </div>
      <div className='filters__item'>
        <MultiSelect
          label={true}
          id="genre"
          children="Genre"
          options={GENRE}
        />
      </div>
      <div className='filters__item'>
        <FormInput
          label={true}
          htmlFor="years-from"
          children="Years"
          type="number"
          id="years-from"
          placeholder="From"
          min={1890}
        />
        <FormInput
          label={false}
          type="number"
          id="years-to"
          placeholder="To"
          min={1890}
        />
      </div>
      <div className='filters__item'>
        <FormInput
          label={true}
          htmlFor="rating-from"
          children="Rating"
          type="number"
          id="rating-from"
          placeholder="From"
          min={0}
          max={10}
        />
        <FormInput
          label={false}
          type="number"
          id="rating-to"
          placeholder="To"
          min={0}
          max={10}
        />
      </div>
      <div className='filters__item'>
        <MultiSelect
          label={true}
          id="country"
          children="Country"
          options={COUNTRY}
          maxActiveOptions={8}
        />
      </div>
    </form>
  )
}
