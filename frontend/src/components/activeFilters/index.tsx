import './styles.scss'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Btn } from '../Btn'
import { CloseIcon } from '../../images/Icons/CloseIcon'
import { fetchGetMoviesByFilters } from '../../redux/movieSlice'
import { OptionsSelect } from '../../types/OptionsSelect'
import { FormDataModalFilters } from '../../types/FormDataModalFilters'
import { GENRE } from '../../helpers'

export function ActiveFilters(): JSX.Element {
  const dispatch = useAppDispatch()

  const { activeFilters } = useAppSelector(state => state.movies)

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
  const [filterRemove, setFilterRemove] = useState(null as { key: string, value: string } | null | {
    [key: string]: {
      from: number | null
      to: number | null
    }
  })

  useEffect(() => {
    if (activeFilters) {
      setFormData(prevFormData => ({
        ...prevFormData,
        sort: activeFilters.sort === "rating" ? optionsTabs[0] : optionsTabs[1],
        title: activeFilters.title || prevFormData.title,
        genre: activeFilters.genre
          ? GENRE.filter(item =>
            ((activeFilters.genre as unknown) as string[]).includes(item.value)
          )
          : prevFormData.genre || [],
        years: {
          from: Number(activeFilters.years?.from) || prevFormData.years.from,
          to: Number(activeFilters.years?.to) || prevFormData.years.to,
        },
        rating: {
          from: Number(activeFilters.rating?.from) || prevFormData.rating.from,
          to: Number(activeFilters.rating?.to) || prevFormData.rating.to,
        },
        country: activeFilters.country || prevFormData.country,
      }))
    }

  }, [activeFilters])

  useEffect(() => {
    if (filterRemove) {
      if (filterRemove.key === 'sort' || filterRemove.key === 'title') {
        setFormData(prevFormData => ({
          ...prevFormData,
          [filterRemove.key as string]: null
        }))
      } else if (filterRemove.key === 'genre') {
        setFormData(prevFormData => ({
          ...prevFormData,
          genre: prevFormData.genre.filter(item => item.value !== filterRemove.value)
        }))
      } else {
        const valueIsNumber = Number(filterRemove.value)
        if (filterRemove.key === 'from' && valueIsNumber > 10) {
          setFormData(prevFormData => ({
            ...prevFormData,
            years: {
              ...prevFormData.years,
              from: null
            }
          }))
        } else if (filterRemove.key === 'to' && valueIsNumber > 10) {
          setFormData(prevFormData => ({
            ...prevFormData,
            years: {
              ...prevFormData.years,
              to: null
            }
          }))
        } else if (filterRemove.key === 'from') {
          setFormData(prevFormData => ({
            ...prevFormData,
            rating: {
              ...prevFormData.rating,
              from: null
            }
          }))
        } else if (filterRemove.key === 'to') {
          setFormData(prevFormData => ({
            ...prevFormData,
            rating: {
              ...prevFormData.rating,
              to: null
            }
          }))
        }
      }
    }
  }, [filterRemove])

  useEffect(() => {
    if (filterRemove) {
      dispatch(fetchGetMoviesByFilters(formData))
    }
  }, [formData])

  function renderActiveFilters() {
    if (activeFilters) {
      return Object.entries(activeFilters).map(([key, value]) => {
        if (Array.isArray(value)) {
          return (
            <div className='active-filters-item' key={key}>
              <div className='active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500'>
                {`${key}:`}
              </div>
              <div className='active-filters-item__wrapper'>
                {value.map((item, index) => (
                  <div className='active-filters-item active-filters-item_multi' key={index}>
                    <div className='active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500'>
                      {item}
                    </div>
                    <div className='active-filters-item__btn'>
                      <Btn
                        type='button'
                        className='btn_close'
                        onClick={() => setFilterRemove({ key, value: item })}
                      >
                        <CloseIcon width="24" height="24" />
                      </Btn>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        } else if (typeof value === 'object' && value !== null) {
          const subFilters = Object.entries(value).map(([key, value]) => (
            <div className='active-filters-item active-filters-item_multi' key={key}>
              <div className='active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500'>
                {`${key}: ${value}`}
              </div>
              <div className='active-filters-item__btn'>
                <Btn
                  type='button'
                  className='btn_close'
                  onClick={() => setFilterRemove({ key, value: value as string })}
                >
                  <CloseIcon width="24" height="24" />
                </Btn>
              </div>
            </div>
          ))
          return (
            <div className='active-filters-item' key={key}>
              <div className='active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500'>
                {`${key}:`}
              </div>
              <div className='active-filters-item__wrapper'>
                {subFilters}
              </div>
            </div>
          )
        } else {
          return (
            <div className='active-filters-item' key={key}>
              <div className='active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500'>
                {`${key}: ${value}`}
              </div>
              <div className='active-filters-item__btn'>
                <Btn
                  type='button'
                  className='btn_close'
                  onClick={() => setFilterRemove({ key, value: value as string })}
                >
                  <CloseIcon width="24" height="24" />
                </Btn>
              </div>
            </div >
          )
        }
      })
    }
  }
  return (
    <div className="active-filters">
      {activeFilters
        ? (renderActiveFilters()
        )
        : (
          null
        )}
    </div>
  )
}
