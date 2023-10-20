import "./styles.scss"
import { useState } from "react"

export interface SliderProps {
  data: string[]
}

export function Carousel({ data }: SliderProps): JSX.Element {
  const [prev, setPrev] = useState(0)
  const [next, setNext] = useState(4)
  const [activeSlide, setActiveSlide] = useState(data.slice(prev, next))

  function handleClickPrev() {
    if (prev > 0) {
      setPrev(prev - 1)
      setNext(next - 1)
      setActiveSlide(data.slice(prev - 1, next - 1))
    }
  }

  function handleClickNext() {
    if (next < data.length) {
      setPrev(prev + 1)
      setNext(next + 1)
      setActiveSlide(data.slice(prev + 1, next + 1))
    }
  }

  return (
    <div className="carousel">
      <div className="carousel__btn-group">
        <button className="btn"
          type="button"
          onClick={handleClickPrev}>Prev</button>
        <button className="btn"
          type="button"
          onClick={handleClickNext}>Next</button>
      </div>
      <div className="carousel__content">
        {activeSlide}
      </div>
    </div>
  )
}
