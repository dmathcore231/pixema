import './styles.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { FormInput } from '../../components/FormInput'
import { LinkBack } from '../../components/LinkBack'
import { Btn } from '../../components/Btn'
import { MultiSelect } from '../../components/MultiSelect'
import { GENRE } from '../../helpers'
import { OptionsSelect } from '../../types/OptionsSelect'
import { fetchCreateMovie } from '../../redux/movieSlice'
import { Card } from '../../components/Card'

export function DashboardAddMovie(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formMovie, setFormMovie] = useState({
    title: '',
    year: '',
    rating: 0,
    imdbId: '',
    genre: [] as string[],
    poster: null as File | null,
    description: '',
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorField, setErrorField] = useState('')

  const { status, message } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(prev => !prev)
      const formData = new FormData()
      formData.append('title', formMovie.title)
      formData.append('year', formMovie.year)
      formData.append('rating', formMovie.rating.toString());
      formData.append('imdbId', formMovie.imdbId)
      formMovie.genre.forEach((genre, index) => {
        if (genre) {
          formData.append(`genre[${index}]`, genre)
        }
      })
      formData.append('poster', formMovie.poster as File)
      formData.append('description', formMovie.description)
      dispatch(fetchCreateMovie(formData))
    }
  }, [formMovie, isSubmit, dispatch])

  useEffect(() => {
    if (status === 400 && message === 'Missing fields: Genre') {
      setErrorField('genre')
    } else if (status === 400 && message === 'Missing fields: Poster') {
      setErrorField('poster')
    } else if (status === 400 && message === 'Missing fields: Title' || status === 400 && message === 'Title already exists') {
      setErrorField('title')
    } else if (status === 400 && message === 'Missing fields: Year') {
      setErrorField('year')
    } else if (status === 400 && message === 'Missing fields: Rating') {
      setErrorField('rating')
    } else if (status === 400 && message === 'Missing fields: ImdbId') {
      setErrorField('imdbId')
    } else if (status === 400 && message === 'Missing fields: Description') {
      setErrorField('description')
    } else if (status === 201) {
      setErrorField('')
      navigate('/dashboard/movies')
    }
  }, [status, message, navigate])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(prev => !prev)
  }

  function handleClickCancelBtn() {
    setFormMovie({
      title: '',
      year: '',
      rating: 0,
      imdbId: '',
      genre: [],
      poster: null,
      description: '',
    })
  }

  function handleMultiSelectChange(activeOptions: OptionsSelect[]) {
    const genreValues = activeOptions.map(item => item.value)
    setFormMovie({ ...formMovie, genre: genreValues })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    setFormMovie({ ...formMovie, poster: file })
  }

  return (
    <div className='dashboard-add-new-movie'>
      <div className='dashboard-add-new-movie__title'>
        <h2>Add new movie</h2>
      </div>
      <LinkBack />
      <form className='movie-form' onSubmit={handleSubmit}>
        <FormInput
          label={true}
          htmlFor='title'
          children='Title'
          type='text'
          id='title'
          placeholder='Title of the movie'
          required={true}
          value={formMovie.title}
          onChange={e => setFormMovie({ ...formMovie, title: e.target.value })}
          className={errorField === 'title' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='year'
          children='Year'
          type='number'
          id='year'
          placeholder='Year of the movie'
          required={true}
          value={formMovie.year}
          onChange={e => setFormMovie({ ...formMovie, year: e.target.value })}
          className={errorField === 'year' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='rating'
          children='Rating'
          type='number'
          min={1}
          max={10}
          id='rating'
          placeholder='Rating of the movie'
          required={true}
          value={formMovie.rating}
          onChange={e => setFormMovie({ ...formMovie, rating: parseInt(e.target.value) })}
          className={errorField === 'rating' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='imdbId'
          children='IMDB ID'
          type='text'
          id='imdbId'
          placeholder='IMDB ID of the movie'
          required={true}
          value={formMovie.imdbId}
          onChange={e => setFormMovie({ ...formMovie, imdbId: e.target.value })}
          className={errorField === 'imdbId' ? 'primary-input_error' : ''}
        />
        <MultiSelect
          label={true}
          children='Genre'
          id='genre'
          options={GENRE}
          maxActiveOptions={4}
          getActiveOptions={(activeOptions) => handleMultiSelectChange(activeOptions)}
          className={errorField === 'genre' && formMovie.genre.length === 0 ? 'multi-select-error' : ''
          }
        />
        <FormInput
          label={true}
          htmlFor='poster'
          children='Poster'
          type='file'
          id='poster'
          required={true}
          onChange={handleFileChange}
          className={errorField === 'poster' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='description'
          children='Description'
          type='text'
          id='description'
          placeholder='Description of the movie'
          required={true}
          value={formMovie.description}
          onChange={e => setFormMovie({ ...formMovie, description: e.target.value })}
          className={errorField === 'description' ? 'primary-input_error' : ''}
        />
        <div className='movie-form-preview'>
          <div className='movie-form-preview__item'>
            <Card
              title={formMovie.title}
              img={formMovie.poster ? URL.createObjectURL(formMovie.poster) : ''}
              genres={formMovie.genre}
              rating={formMovie.rating}
            />
          </div>
        </div>
        <div className='movie-form__btn'>
          <Btn
            type='button'
            className='btn_secondary'
            onClick={handleClickCancelBtn}
          >
            Cancel
          </Btn>
          <Btn
            type="submit"
            className="btn_primary"
          >
            Add
          </Btn>
        </div>
      </form>
    </div>
  )
}
