import './styles.scss'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchGetMovieById, fetchUpdateMovieById, fetchDeleteMovieById } from '../../redux/movieSlice'
import { LinkBack } from '../../components/LinkBack'
import { FormInput } from '../../components/FormInput'
import { Btn } from '../../components/Btn'
import { MultiSelect } from '../../components/MultiSelect'
import { Switch } from '../../components/Switch'
import { GENRE } from '../../helpers'
import { TextArea } from '../../components/TextArea'
import { Card } from '../../components/Card'
import { OptionsSelect } from '../../types/OptionsSelect'
import { Spinner } from '../../components/Spinner'
import { Error } from '../../components/Error'
import { Modal } from '../../components/Modal'

export function DashboardMovie(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { movieId } = useParams()

  const { movie, loading, error } = useAppSelector(state => state.movies)

  const [formMovie, setFormMovie] = useState({
    title: '',
    year: null as number | null,
    releaseDate: '',
    boxOffice: null as number | null,
    country: '',
    production: '',
    actors: '',
    directors: '',
    writers: '',
    rating: null as number | null,
    imdbRating: null as number | null,
    genre: [] as string[],
    poster: null as File | null,
    duration: null as number | null,
    description: '',
    isRecommended: false
  })
  const [errorField] = useState('')
  const [isCancel, setIsCancel] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [isSubmitModal, setIsSubmitModal] = useState(false)

  function handleMultiSelectChange(activeOptions: OptionsSelect[]) {
    const genreValues = activeOptions.map(item => item.value)
    setFormMovie({ ...formMovie, genre: genreValues })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0]
    setFormMovie({ ...formMovie, poster: file })
  }

  function handleClickCancelBtn() {
    setFormMovie({
      title: '',
      year: null,
      releaseDate: '',
      boxOffice: null,
      country: '',
      production: '',
      actors: '',
      directors: '',
      writers: '',
      rating: null,
      imdbRating: null,
      genre: [],
      poster: null,
      duration: null,
      description: '',
      isRecommended: false
    })
    setIsCancel(prev => !prev)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmit(prev => !prev)
  }

  function handelClickBtnDelete() {
    setIsActiveModal(true)
  }

  function handelSubmitModalDeleteMovie() {
    setIsSubmitModal(true)
    setIsActiveModal(false)
  }

  useEffect(() => {
    if (isSubmit) {
      setIsSubmit(prev => !prev)
      const formData = new FormData()
      formData.append('title', formMovie.title)
      formData.append('year', formMovie.year ? formMovie.year.toString() : 'N/A')
      formData.append('releaseDate', formMovie.releaseDate)
      formData.append('boxOffice', formMovie.boxOffice ? formMovie.boxOffice.toString() : 'N/A')
      formData.append('country', formMovie.country)
      formData.append('production', formMovie.production)
      formData.append('actors', formMovie.actors)
      formData.append('directors', formMovie.directors)
      formData.append('writers', formMovie.writers)
      formData.append('rating', formMovie.rating ? formMovie.rating.toString() : 'N/A');
      formData.append('imdbRating', formMovie.imdbRating ? formMovie.imdbRating.toString() : 'N/A');
      formMovie.genre.forEach((genre, index) => {
        if (genre) {
          formData.append(`genre[${index}]`, genre)
        }
      })
      formData.append('poster', formMovie.poster as File || movie?.poster)
      formData.append('duration', formMovie.duration ? formMovie.duration.toString() : 'N/A')
      formData.append('description', formMovie.description)
      formData.append('isRecommended', formMovie.isRecommended.toString())

      if (movieId) {
        dispatch(fetchUpdateMovieById({ id: movieId, body: formData }))
      }
    }
  }, [formMovie, isSubmit, movieId, dispatch])

  useEffect(() => {
    if (movieId) {
      dispatch(fetchGetMovieById(movieId))
    }
  }, [dispatch, movieId])

  useEffect(() => {
    if (movie) {
      setFormMovie({
        title: movie.title || '',
        year: movie.year || null,
        releaseDate: movie.releaseDate || '',
        boxOffice: movie.boxOffice || null,
        country: movie.country || '',
        production: movie.production || '',
        actors: movie.actors || '',
        directors: movie.directors || '',
        writers: movie.writers || '',
        rating: movie.rating || null,
        imdbRating: movie.imdbRating || null,
        genre: movie.genre || [],
        poster: null as File | null,
        duration: movie.duration || null,
        description: movie.description || '',
        isRecommended: movie.isRecommended || false
      })
    }
  }, [movie])

  useEffect(() => {
    if (isSubmitModal && movieId) {
      setIsSubmitModal(false)
      dispatch(fetchDeleteMovieById(movieId))
      navigate('/dashboard/movies')
    }
  }, [isSubmitModal, dispatch, navigate, movieId])

  if (loading) {
    return (
      <div className='dashboard-movie'>
        <div className='dashboard-movie__title'>
          <h2>Movie Update</h2>
        </div>
        <LinkBack />
        <div className='dashboard-movie__loader'>
          <Spinner width='40' height='40' />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='dashboard-movie'>
        <div className='dashboard-movie__title'>
          <h2>Movie Update</h2>
        </div>
        <LinkBack />
        <div className='dashboard-movie__error'>
          <Error />
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-movie">
      <div className='dashboard-movie__title'>
        <h2>Movie Update</h2>
      </div>
      <LinkBack />
      <form className='movie-update-form' onSubmit={handleSubmit}>
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
          value={formMovie.year ?? ''}
          onChange={e => setFormMovie({ ...formMovie, year: (isNaN(parseFloat(e.target.value)) ? null : parseFloat(e.target.value)) })}
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
          value={formMovie.boxOffice ?? ''}
          onChange={(e) => setFormMovie({ ...formMovie, boxOffice: (isNaN(parseFloat(e.target.value)) ? null : parseFloat(e.target.value)) })}
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
          value={formMovie.rating ?? ''}
          onChange={(e) => setFormMovie({ ...formMovie, rating: (isNaN(parseFloat(e.target.value)) ? null : parseFloat(e.target.value)) })}
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
          value={formMovie.imdbRating ?? ''}
          onChange={(e) => setFormMovie({ ...formMovie, imdbRating: (isNaN(parseFloat(e.target.value)) ? null : parseFloat(e.target.value)) })}
          className={errorField === 'imdbRating' ? 'primary-input_error' : ''}
        />
        <MultiSelect
          label={true}
          children='Genre'
          id='genre'
          options={GENRE}
          maxActiveOptions={3}
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
          value={formMovie.duration ?? ''}
          onChange={e => setFormMovie({ ...formMovie, duration: (isNaN(parseFloat(e.target.value)) ? null : parseFloat(e.target.value)) })}
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
          <div className='movie-form__item'>
            <Switch
              isChecked={formMovie.isRecommended}
              onChange={e => setFormMovie({ ...formMovie, isRecommended: e.target.checked })} />
          </div>

        </div>
        <div className='movie-update-form__btn-delete'>
          <Btn
            type='button'
            className='btn_danger'
            onClick={handelClickBtnDelete}
          >
            Delete
          </Btn>
        </div>
        <div className='movie-form-preview'>
          <label htmlFor="movie-form-preview" className="movie-form-preview__label subtitle subtitle_size_xxs">Preview Card</label>
          <div className='movie-form-preview__item'>
            <div className='movie-form-preview__wrapper'>
              <Card
                title={formMovie.title ? formMovie.title : ''}
                poster={formMovie.poster ? URL.createObjectURL(formMovie.poster) : movie ? movie.poster : ''}
                genres={formMovie.genre ? formMovie.genre : []}
                rating={formMovie.rating ? formMovie.rating : 0}
                isRecommended={formMovie.isRecommended ? formMovie.isRecommended : false}
              />
            </div>
          </div>
        </div>
        <div className='movie-update-form__btn'>
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
            Update
          </Btn>
        </div>
        <Modal
          isActive={isActiveModal}
          modalSubmit={true}
          modalClass="modal_delete-movie"
          title="Delete Movie"
          titleBtnSubmit="Delete"
          titleBtnClose="Cancel"
          onClose={() => setIsActiveModal(false)}
          onSubmit={handelSubmitModalDeleteMovie}
          children={
            <div className="modal_delete-movie__text">
              Are you sure you want to delete this movie?
            </div>}
          classBtnSubmit="btn_danger"
        />
      </form>
    </div>
  )
}
