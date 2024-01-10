import './styles.scss'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Tabs } from '../Tabs'
import { OptionsSelect } from '../../types/OptionsSelect'
import { FormInput } from '../FormInput'
import { MultiSelect } from '../MultiSelect'
import { GENRE } from '../../helpers'
import { COUNTRY } from '../../helpers'
import { FiltersModalProps } from '../../types/interfaces/FiltersModalProps'
import { FormDataModalFilters } from '../../types/FormDataModalFilters'
import { fetchGetMoviesByFilters } from '../../redux/movieSlice'

export function FiltersModal({ stateClear, setStateClear, stateSubmit, setStateSubmit }: FiltersModalProps): JSX.Element {
  const dispatch = useAppDispatch()

  const { moviesByFilters } = useAppSelector(state => state.movies)

  const optionsTabs: OptionsSelect[] = [
    { label: 'Rating', value: 'rating' },
    { label: 'Year', value: 'year' },
  ]

  const [formData, setFormData] = useState<FormDataModalFilters>({
    sort: optionsTabs[0],
    title: null,
    genre: [],
    years: {
      from: null,
      to: null
    },
    rating: {
      from: null,
      to: null
    },
    country: [],
  })


  useEffect(() => {
    if (stateClear) {
      setFormData({
        sort: optionsTabs[0],
        title: null,
        genre: [],
        years: {
          from: null,
          to: null
        },
        rating: {
          from: null,
          to: null
        },
        country: [],
      })
      setStateClear(false)
    }
  }, [stateClear, setStateClear])

  useEffect(() => {
    if (stateSubmit) {
      console.log(formData)
      dispatch(fetchGetMoviesByFilters(formData))
      setStateSubmit(false)
      console.log(moviesByFilters)
    }
  }, [stateSubmit, setStateSubmit, formData, dispatch])

  function handleClickTabs(option: OptionsSelect) {
    setFormData({ ...formData, sort: option })
  }

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
          value={formData.title === null ? '' : formData.title}
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
          value={formData.years.from === null || isNaN(formData.years.from) ? '' : formData.years.from}
          onChange={(e) => setFormData({ ...formData, years: { ...formData.years, from: parseFloat(e.target.value) } })}
        />
        <FormInput
          label={false}
          type="number"
          id="years-to"
          placeholder="To"
          min={1890}
          value={formData.years.to === null || isNaN(formData.years.to) ? '' : formData.years.to}
          onChange={(e) => setFormData({ ...formData, years: { ...formData.years, to: parseFloat(e.target.value) } })}
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
          value={formData.rating.from === null || isNaN(formData.rating.from) ? '' : formData.rating.from}
          onChange={(e) => setFormData({ ...formData, rating: { ...formData.rating, from: parseFloat(e.target.value) } })}
        />
        <FormInput
          label={false}
          type="number"
          id="rating-to"
          placeholder="To"
          min={0}
          max={10}
          value={formData.rating.to === null || isNaN(formData.rating.to) ? '' : formData.rating.to}
          onChange={(e) => setFormData({ ...formData, rating: { ...formData.rating, to: parseFloat(e.target.value) } })}
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
