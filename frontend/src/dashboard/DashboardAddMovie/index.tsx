import './styles.scss'
import { useState } from 'react'
import { FormInput } from '../../components/FormInput'
import { LinkBack } from '../../components/LinkBack'
import { Btn } from '../../components/Btn'
import { MultiSelect } from '../../components/MultiSelect'
import { OptionsSelect } from '../../types/OptionsSelect'
import { GENRE } from '../../helpers'

export function DashboardAddMovie(): JSX.Element {
  const [formMovie, setFormMovie] = useState({
    title: '',
    year: '',
    rating: '',
    imdbId: '',
    genre: [] as OptionsSelect[],
    poster: '',
    description: '',
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log()
  }

  function handleClickCancelBtn() {
    console.log('handleClickCancelBtn')
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
        />
        <FormInput
          label={true}
          htmlFor='rating'
          children='Rating'
          type='number'
          id='rating'
          placeholder='Rating of the movie'
          required={true}
          value={formMovie.rating}
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
        />
        <MultiSelect
          label={true}
          children='Genre'
          id='genre'
          options={GENRE}
          maxActiveOptions={4}
        />
        <FormInput
          label={true}
          htmlFor='poster'
          children='Poster'
          type='file'
          id='poster'
          required={true}
          value={formMovie.poster}
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
        />
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
