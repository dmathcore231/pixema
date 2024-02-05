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
import { fetchGetMoviesByFilters, setActiveFilters } from '../../redux/movieSlice'
import { Btn } from '../Btn'
import { Spinner } from '../Spinner'

export function FiltersModal({ setStateIsActive }: FiltersModalProps): JSX.Element {
  const dispatch = useAppDispatch()

  const { loading, status, message } = useAppSelector(state => state.movies)

  const [isSubmit, setIsSubmit] = useState(false)
  const [isClear, setIsClear] = useState(false)

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
    if (isClear) {
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
      setIsClear(false)
    }
  }, [isClear, optionsTabs])

  useEffect(() => {
    if (isSubmit) {
      dispatch(fetchGetMoviesByFilters(formData))
      dispatch(setActiveFilters(formData))
      setIsSubmit(false)
    }
  }, [isSubmit, dispatch, formData])

  useEffect(() => {
    if (isSubmit && !loading) {
      setStateIsActive(false)
    }
  }, [isSubmit, status, message, loading, setStateIsActive])

  function handleClickTabs(option: OptionsSelect) {
    setFormData({ ...formData, sort: option })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(true)
  }

  return (
    <form className="filters" id="filters-form" onSubmit={handleSubmit}>
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
          clearActiveOptions={isClear}
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
          value={formData.years.from ?? ''}
          onChange={(e) => setFormData({ ...formData, years: { ...formData.years, from: e.target.value !== '' ? parseFloat(e.target.value) : null } })}
        />
        <FormInput
          label={false}
          type="number"
          id="years-to"
          placeholder="To"
          min={1890}
          max={new Date().getFullYear()}
          value={formData.years.to ?? ''}
          onChange={(e) => setFormData({ ...formData, years: { ...formData.years, to: e.target.value !== '' ? parseFloat(e.target.value) : null } })}
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
          value={formData.rating.from ?? ''}
          onChange={(e) => setFormData({ ...formData, rating: { ...formData.rating, from: e.target.value !== '' ? parseFloat(e.target.value) : null } })}
        />
        <FormInput
          label={false}
          type="number"
          id="rating-to"
          placeholder="To"
          min={0}
          max={10}
          value={formData.rating.to ?? ''}
          onChange={(e) => setFormData({ ...formData, rating: { ...formData.rating, to: e.target.value !== '' ? parseFloat(e.target.value) : null } })}
        />
      </div>
      <div className='filters__item'>
        <MultiSelect
          label={true}
          id="country"
          children="Country"
          options={COUNTRY}
          maxActiveOptions={5}
          getActiveOptions={(activeOptions) => setFormData({ ...formData, country: activeOptions })}
          clearActiveOptions={isClear}
        />
      </div>
      <div className='filters__item filters__item_padding_top'>
        <Btn
          type='button'
          className="btn_secondary"
          onClick={() => setIsClear(true)}
        >
          Clear filter
        </Btn>
        <Btn
          type='submit'
          className="btn_primary"
          disabled={loading}
        >
          {loading ? <Spinner width="24" height="24" /> : 'Show results'}
        </Btn>
      </div>
    </form>
  )
}
