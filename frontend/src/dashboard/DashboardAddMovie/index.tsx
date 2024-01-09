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
import { TextArea } from '../../components/TextArea'
import { Switch } from '../../components/Switch'

export function DashboardAddMovie(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formMovie, setFormMovie] = useState({
    title: '',
    year: '',
    releaseDate: '',
    boxOffice: 0,
    country: '',
    production: '',
    actors: '',
    directors: '',
    writers: '',
    rating: 0,
    imdbRating: 0,
    genre: [] as string[],
    poster: null as File | null,
    duration: 0,
    description: '',
    isRecommended: false
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorField, setErrorField] = useState('')
  const [isCancel, setIsCancel] = useState(false)
  const { status, message } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(prev => !prev)
      const formData = new FormData()
      formData.append('title', formMovie.title)
      formData.append('year', formMovie.year)
      formData.append('releaseDate', formMovie.releaseDate)
      formData.append('boxOffice', formMovie.boxOffice.toString())
      formData.append('country', formMovie.country)
      formData.append('production', formMovie.production)
      formData.append('actors', formMovie.actors)
      formData.append('directors', formMovie.directors)
      formData.append('writers', formMovie.writers)
      formData.append('rating', formMovie.rating.toString());
      formData.append('imdbRating', formMovie.imdbRating.toString());
      formMovie.genre.forEach((genre, index) => {
        if (genre) {
          formData.append(`genre[${index}]`, genre)
        }
      })
      formData.append('poster', formMovie.poster as File)
      formData.append('duration', formMovie.duration.toString())
      formData.append('description', formMovie.description)
      formData.append('isRecommended', formMovie.isRecommended.toString())

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

  useEffect(() => {
    if (isCancel) {
      setIsCancel(prev => !prev)
    }
  }, [isCancel])
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(prev => !prev)
  }

  function handleClickCancelBtn() {
    setFormMovie({
      title: '',
      year: '',
      releaseDate: '',
      boxOffice: 0,
      country: '',
      production: '',
      actors: '',
      directors: '',
      writers: '',
      rating: 0,
      imdbRating: 0,
      genre: [],
      poster: null,
      duration: 0,
      description: '',
      isRecommended: false
    })
    setIsCancel(prev => !prev)
  }

  function handleMultiSelectChange(activeOptions: OptionsSelect[]) {
    const genreValues = activeOptions.map(item => item.value)
    setFormMovie({ ...formMovie, genre: genreValues })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    setFormMovie({ ...formMovie, poster: file })
  }

  function handleChangeNumberInput(value: string, key: string) {
    if (value) {
      setFormMovie({ ...formMovie, [key]: parseFloat(value) })
    } else {
      setFormMovie({ ...formMovie, [key]: '' as unknown as number })
    }
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
          htmlFor='releaseDate'
          children='Release Date'
          type='text'
          id='releaseDate'
          placeholder='Release Date of the movie'
          required={true}
          value={formMovie.releaseDate}
          onChange={e => setFormMovie({ ...formMovie, releaseDate: e.target.value })}
          className={errorField === 'releaseDate' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='boxOffice'
          children='Box Office'
          type='number'
          min={0}
          id='boxOffice'
          placeholder='Box Office of the movie'
          required={true}
          value={formMovie.boxOffice}
          onChange={e => handleChangeNumberInput(e.target.value, 'boxOffice')}
          className={errorField === 'boxOffice' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='country'
          children='Country'
          type='text'
          id='country'
          placeholder='Country of the movie'
          required={true}
          value={formMovie.country}
          onChange={e => setFormMovie({ ...formMovie, country: e.target.value })}
          className={errorField === 'country' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='production'
          children='Production'
          type='text'
          id='production'
          placeholder='Production of the movie'
          required={true}
          value={formMovie.production}
          onChange={e => setFormMovie({ ...formMovie, production: e.target.value })}
          className={errorField === 'production' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='actors'
          children='Actors'
          type='text'
          id='actors'
          placeholder='Actors of the movie'
          required={true}
          value={formMovie.actors}
          onChange={e => setFormMovie({ ...formMovie, actors: e.target.value })}
          className={errorField === 'actors' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='directors'
          children='Directors'
          type='text'
          id='directors'
          placeholder='Directors of the movie'
          required={true}
          value={formMovie.directors}
          onChange={e => setFormMovie({ ...formMovie, directors: e.target.value })}
          className={errorField === 'directors' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='writers'
          children='Writers'
          type='text'
          id='writers'
          placeholder='Writers of the movie'
          required={true}
          value={formMovie.writers}
          onChange={e => setFormMovie({ ...formMovie, writers: e.target.value })}
          className={errorField === 'writers' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='rating'
          children='Rating'
          type='number'
          min={1}
          max={10}
          step={"0.1"}
          id='rating'
          placeholder='Rating of the movie'
          required={true}
          value={formMovie.rating}
          onChange={e => handleChangeNumberInput(e.target.value, 'rating')}
          className={errorField === 'rating' ? 'primary-input_error' : ''}
        />
        <FormInput
          label={true}
          htmlFor='imdbRating'
          children='IMDb Rating'
          type='number'
          min={1}
          max={10}
          step={"0.1"}
          id='imdbRating'
          placeholder='IMDb Rating of the movie'
          required={true}
          value={formMovie.imdbRating}
          onChange={e => handleChangeNumberInput(e.target.value, 'imdbRating')}
          className={errorField === 'imdbRating' ? 'primary-input_error' : ''}
        />
        <MultiSelect
          label={true}
          children='Genre'
          id='genre'
          options={GENRE}
          maxActiveOptions={4}
          getActiveOptions={(activeOptions) => handleMultiSelectChange(activeOptions)}
          clearActiveOptions={isCancel}
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
          htmlFor='duration'
          children='Duration'
          type='number'
          id='duration'
          placeholder='Duration of the movie'
          required={true}
          value={formMovie.duration}
          onChange={e => setFormMovie({ ...formMovie, duration: parseInt(e.target.value) })}
          className={errorField === 'duration' ? 'primary-input_error' : ''}
          min={1}
        />
        <TextArea
          label={true}
          htmlFor='description'
          children='Description'
          maxlength={800}
          minlength={10}
          id='description'
          placeholder='Description of the movie'
          required={true}
          value={formMovie.description}
          onChange={e => setFormMovie({ ...formMovie, description: e.target.value })}
          className={errorField === 'description' ? 'text-area_error' : ''}
        />
        <div className='movie-form-recommended'>
          <div className='movie-form-recommended__item'>
            <label className='movie-form-recommended__label subtitle subtitle_size_xxs'>
              Recommended
            </label>
            <div className='movie-form-recommended__placeholder'>
              Add a movie to recommendations
            </div>
          </div>
          <div className='movie-form-c__item'>
            <Switch onChange={e => setFormMovie({ ...formMovie, isRecommended: e.target.checked })} />
          </div>

        </div>
        <div className='movie-form-preview'>
          <label htmlFor="movie-form-preview" className="movie-form-preview__label subtitle subtitle_size_xxs">Preview Card</label>
          <div className='movie-form-preview__item'>
            <div className='movie-form-preview__wrapper'>
              <Card
                title={formMovie.title}
                poster={formMovie.poster ? URL.createObjectURL(formMovie.poster) : ''}
                genres={formMovie.genre}
                rating={formMovie.rating}
                isRecommended={formMovie.isRecommended}
              />
            </div>
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
