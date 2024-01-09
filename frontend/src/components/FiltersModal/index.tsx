import './styles.scss'
import { useState, useEffect } from 'react'
import { Tabs } from '../Tabs'
import { OptionsSelect } from '../../types/OptionsSelect'
import { FormInput } from '../FormInput'
import { MultiSelect } from '../MultiSelect'
import { GENRE } from '../../helpers'
import { COUNTRY } from '../../helpers'
import { FiltersModalProps } from '../../types/interfaces/FiltersModalProps'
import { FormDataModalFilters } from '../../types/FormDataModalFilters'

export function FiltersModal({ stateClear, setStateClear }: FiltersModalProps): JSX.Element {
  const optionsTabs: OptionsSelect[] = [
    { label: 'Rating', value: 'rating' },
    { label: 'Year', value: 'year' },
  ]

  const [formData, setFormData] = useState<FormDataModalFilters>({
    sort: optionsTabs[0],
    title: '',
    genre: [],
    years: {
      from: 0,
      to: 0
    },
    rating: {
      from: 0,
      to: 0
    },
    country: [],
  })

  function handleClickTabs(option: OptionsSelect) {
    setFormData({ ...formData, sort: option })
  }

  useEffect(() => {
    if (stateClear) {
      setFormData({
        sort: optionsTabs[0],
        title: '',
        genre: [],
        years: {
          from: 0,
          to: 0
        },
        rating: {
          from: 0,
          to: 0
        },
        country: [],
      })
      setStateClear(false)
    }
  }, [stateClear, setStateClear])

  return (
    <form className="filters" id="filters-form">
      <div className='filters__item filters__item_border_bottom filters__item_flex_col'>
        <label className="filters__label subtitle subtitle_size_xxs">
          Sort by
        </label>
        <Tabs
          options={optionsTabs}
          onChangeTabs={handleClickTabs}
          defaultCheckedOption={optionsTabs[0]}
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
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div className='filters__item'>
        <MultiSelect
          label={true}
          id="genre"
          children="Genre"
          options={GENRE}
          maxActiveOptions={5}
          getActiveOptions={(activeOptions) => setFormData({ ...formData, genre: activeOptions })}
          clearActiveOptions={stateClear}
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
          value={formData.years.from}
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
          getActiveOptions={(activeOptions) => setFormData({ ...formData, country: activeOptions })}
          clearActiveOptions={stateClear}
        />
      </div>
    </form>
  )
}
