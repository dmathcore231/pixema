import "./styles.scss"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Btn } from "../Btn"
import { Modal } from "../Modal"
import { RatingStarIcon } from "../../images/Icons/RatingStarIcon"
import { fetchSetMovieRating } from "../../redux/movieSlice"

export function Rating(): JSX.Element {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { user } = useAppSelector(state => state.user)
  const { movie } = useAppSelector(state => state.movies)
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [isSubmitRating, setIsSubmitRating] = useState(false)
  const [isRemoveRating, setIsRemoveRating] = useState(false)
  const [valueRating, setValueRating] = useState<number | null>(null)

  useEffect(() => {
    if (isSubmitRating && user && id) {
      dispatch(fetchSetMovieRating({ body: { formSetRatingMovie: { userId: user._id, rating: valueRating!, remove: false } }, id }))
    }

  }, [dispatch, isSubmitRating])

  useEffect(() => {
    if (movie && user) {
      const foundUserRating = movie.rating.userRating.find((item) => item.userId === user._id)
      setValueRating(foundUserRating ? foundUserRating.rating : null)
    }
  }, [movie, user])

  useEffect(() => {
    if (isRemoveRating) {
      if (user && id) {
        dispatch(fetchSetMovieRating({ body: { formSetRatingMovie: { userId: user._id, rating: valueRating!, remove: true } }, id }))
      }
      setValueRating(null)
      setIsRemoveRating(false)
    }
  }, [dispatch, isRemoveRating])


  function handleClickBtnClose() {
    setIsActiveModal(false)
  }

  function handleClickBtnRemoveRating() {
    if (valueRating) {
      setIsActiveModal(false)
      setIsRemoveRating(true)
    } else {
      setIsActiveModal(false)
    }
  }

  function handleSubmitRating() {
    if (valueRating) {
      setIsActiveModal(false)
      setIsSubmitRating(true)
    }

  }

  const idName: Record<number, string> = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
  }

  return (
    <div className="rating">
      <Btn
        type="button"
        className="btn_secondary rating__btn"
        onClick={() => setIsActiveModal(true)}
      >
        {movie?.rating.userRating.find((item) => item.userId === user?._id) ? "Change rating" : "Rate The Film"}
      </Btn>
      <Modal
        isActive={isActiveModal}
        modalClass="rating__modal"
        title="Rate The Film"
        titleBtnClose={movie?.rating.userRating.find((item) => item.userId === user?._id) ? "Remove" : "Close"}
        modalSubmit={true}
        onClose={handleClickBtnClose}
        onCloseInFooter={handleClickBtnRemoveRating}
        onSubmit={handleSubmitRating}
      >
        <form className="rating-list" action="rating">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="rating-list__item">
              <input
                type="radio"
                id={`rating-${idName[index + 1]}`}
                name="rating"
                value={(index + 1)}
                onChange={(e) => setValueRating(parseFloat(e.target.value))}
                checked={valueRating === (index + 1)}
              />
              <label
                className="rating-list__label"
                htmlFor={`rating-${idName[index + 1]}`}
              >
                <RatingStarIcon width="24" height="24" />
                {index + 1}
              </label>
            </div>
          ))}
        </form>
      </Modal>
    </div>
  )
}
