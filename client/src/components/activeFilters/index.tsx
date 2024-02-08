import './styles.scss'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchGetMoviesByFilters, setActiveFilters } from '../../redux/movieSlice'
import { FormDataModalFilters } from '../../types/FormDataModalFilters'
import { Btn } from '../Btn'
import { CloseIcon } from '../../images/Icons/CloseIcon'

export function ActiveFilters(): JSX.Element {
  const dispatch = useAppDispatch()

  const { activeFilters } = useAppSelector(state => state.movies)

  const [formData, setFormData] = useState<FormDataModalFilters>(null as unknown as FormDataModalFilters)
  const [isDeleteFilters, setIsDeleteFilters] = useState(false)

  useEffect(() => {
    if (activeFilters) {
      setFormData(activeFilters)
    }
  }, [activeFilters])

  useEffect(() => {
    if (isDeleteFilters) {
      dispatch(fetchGetMoviesByFilters(formData))
      dispatch(setActiveFilters(formData))
      setIsDeleteFilters(false)
    }
  }, [formData, isDeleteFilters, dispatch])

  return (
    <div className="active-filters">
      {(activeFilters && activeFilters.sort) && (
        <>
          <div className="active-filters-item">
            <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500">
              {`Sort by: ${activeFilters.sort.label}`}
            </div>
            <div className="active-filters-item__btn">
              <Btn
                type="button"
                className="btn_close btn_padding_none"
                onClick={() => {
                  setFormData({ ...formData, sort: null })
                  setIsDeleteFilters(true)
                }}
              >
                <CloseIcon width='24' height='24' />
              </Btn>
            </div>
          </div >
          {
            activeFilters.title
              ? <div className="active-filters-item">
                <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500">
                  {`Title: ${activeFilters.title}`}
                </div>
                <div className="active-filters-item__btn">
                  <Btn
                    type="button"
                    className="btn_close btn_padding_none"
                    onClick={() => {
                      setFormData({ ...formData, title: null })
                      setIsDeleteFilters(true)
                    }}
                  >
                    <CloseIcon width='24' height='24' />
                  </Btn>
                </div>
              </div>
              : null
          }
          {
            activeFilters.genre && activeFilters.genre.length > 0
              ? <div className="active-filters-item">
                <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500">
                  Genre:
                </div>
                <div className="active-filters-item__wrapper">
                  {activeFilters.genre.map((item, index) => {
                    return (
                      <div className="active-filters-item active-filters-item_multi" key={index}>
                        <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500"> {item.label}
                        </div>
                        <div className="active-filters-item__btn">
                          <Btn
                            type="button"
                            className="btn_close"
                            onClick={() => {
                              setFormData({ ...formData, genre: formData.genre.filter(genre => genre.value !== item.value) })
                              setIsDeleteFilters(true)
                            }}
                          >
                            <CloseIcon width='24' height='24' />
                          </Btn>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              : null
          }
          {
            activeFilters.years && activeFilters.years.from || activeFilters.years.to
              ? <div className="active-filters-item">
                <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500">
                  Years:
                </div>
                <div className="active-filters-item__wrapper">
                  {Object.entries(activeFilters.years).map(([key, value], index) => {
                    if (value) {
                      return (
                        <div className="active-filters-item active-filters-item_multi" key={index}>
                          <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500"> {key}: {value}
                          </div>
                          <div className="active-filters-item__btn">
                            <Btn
                              type="button"
                              className="btn_close"
                              onClick={() => {
                                if (key === 'from') {
                                  setFormData({ ...formData, years: { ...formData.years, from: null } })
                                  setIsDeleteFilters(true)
                                } else {
                                  setFormData({ ...formData, years: { ...formData.years, to: null } })
                                  setIsDeleteFilters(true)
                                }
                              }}
                            >
                              <CloseIcon width='24' height='24' />
                            </Btn>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
              : null
          }
          {
            activeFilters.rating && activeFilters.rating.from || activeFilters.rating.to
              ? <div className="active-filters-item">
                <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500">
                  Rating:
                </div>
                <div className="active-filters-item__wrapper">
                  {Object.entries(activeFilters.rating).map(([key, value], index) => {
                    if (value) {
                      return (
                        <div className="active-filters-item active-filters-item_multi" key={index}>
                          <div className="active-filters-item__title subtitle subtitle_size_xs subtitle_weight_500"> {key}: {value}
                          </div>
                          <div className="active-filters-item__btn">
                            <Btn
                              type="button"
                              className="btn_close"
                              onClick={() => {
                                if (key === 'from') {
                                  setFormData({ ...formData, rating: { ...formData.rating, from: null } })
                                  setIsDeleteFilters(true)
                                } else {
                                  setFormData({ ...formData, rating: { ...formData.rating, to: null } })
                                  setIsDeleteFilters(true)
                                }
                              }}
                            >
                              <CloseIcon width='24' height='24' />
                            </Btn>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
              : null
          }
        </>
      )}
    </div>
  )
}


