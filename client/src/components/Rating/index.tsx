import "./styles.scss"
import { useState } from "react"
import { Btn } from "../Btn"
import { Modal } from "../Modal"
import { RatingStarIcon } from "../../images/Icons/RatingStarIcon"

export function Rating(): JSX.Element {
  const [isActiveModal, setIsActiveModal] = useState(false)
  const [valueRating, setValueRating] = useState<number | null>(null)

  function handleClickBtnClose() {
    setIsActiveModal(false)
  }

  function handleClickBtnRemoveRating() {
    setIsActiveModal(false)
    setValueRating(null)
  }

  function handleSubmitRating() {
    setIsActiveModal(false)
    console.log(valueRating)
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
        {valueRating ? "Change rating" : "Rate The Film"}
      </Btn>
      <Modal
        isActive={isActiveModal}
        modalClass="rating__modal"
        title="Rate The Film"
        titleBtnClose={valueRating ? "Remove" : "Close"}
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
              />
              <label htmlFor={`rating-${idName[index + 1]}`}>
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
