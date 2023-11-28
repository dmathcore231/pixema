import "./styles.scss"
import { ArrowLeft } from "../../images/Icons/ArrowLeft"
import { ArrowRight } from "../../images/Icons/ArrowRight"
import { useState } from "react"
import { CarouselProps } from "../../types/interfaces/CarouselProps"

export function Carousel({ data, title }: CarouselProps): JSX.Element {
  const [offset, setOffset] = useState(0)
  const [counterClick, setCounterClick] = useState(0)
  function handleClickRight(): void {
    const carouselBodyElement = document.querySelector(".carousel-body")
    const bodyItemElement = document.querySelector(".carousel-body__item")
    const widthBodyElement = carouselBodyElement?.getBoundingClientRect().width
    const widthBodyItemElement = bodyItemElement?.getBoundingClientRect().width
    const lastSwap = (data.length - 5)
    setCounterClick(counterClick + 1)
    if (counterClick < lastSwap) {
      const newOffset = offset + widthBodyItemElement!
      carouselBodyElement?.scrollTo({
        top: 0,
        left: newOffset,
        behavior: "smooth",
      })
      setOffset(newOffset)
    } else if (counterClick === lastSwap) {
      setCounterClick(counterClick)
      const newOffset = widthBodyElement!
      carouselBodyElement?.scrollTo({
        top: 0,
        left: newOffset,
        behavior: "smooth",
      })
      setOffset(newOffset)
    }
  }
  function handleClickLeft(): void {
    const carouselBodyElement = document.querySelector(".carousel-body")
    const bodyItemElement = document.querySelector(".carousel-body__item")
    const widthBodyItemElement = bodyItemElement?.getBoundingClientRect().width
    setCounterClick(counterClick - 1)
    if (counterClick > 0) {
      const newOffset = offset - widthBodyItemElement!
      carouselBodyElement?.scrollTo({
        top: 0,
        left: newOffset,
        behavior: "smooth",
      })
      setOffset(newOffset)
    } else if (counterClick === 0) {
      setCounterClick(0)
      const newOffset = 0
      carouselBodyElement?.scrollTo({
        top: 0,
        left: newOffset,
        behavior: "smooth",
      })
      setOffset(newOffset)
    }
  }
  console.log(counterClick)

  return (
    <div className="carousel">
      <div className="carousel-header">
        <div className="carousel-header__title">
          <h2>{title}</h2>
        </div>
        <div className="carousel-header__arrow">
          <button
            className=" carousel-header__arrow-prev
          btn btn_padding_none"
            onClick={handleClickLeft}
          >
            <ArrowLeft width="24" height="24" />
          </button>
          <button
            className="carousel-header__arrow-next
          btn btn_padding_none"
            onClick={handleClickRight}
          >
            <ArrowRight width="24" height="24" />
          </button>
        </div>
      </div>
      <div className="carousel-body">
        {data.map((item, index) => (
          <div className="carousel-body__item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
