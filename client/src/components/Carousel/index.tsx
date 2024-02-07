import "./styles.scss"
import { useRef } from "react"
import { useAppSelector } from "../../hooks"
import { ArrowLeft } from "../../images/Icons/ArrowLeft"
import { ArrowRight } from "../../images/Icons/ArrowRight"
import { CarouselProps } from "../../types/interfaces/CarouselProps"
import { NoContent } from "../NoContent"
import { Btn } from "../Btn"
import { Card } from "../Card"

export function Carousel({ data, title }: CarouselProps): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  const carouselBodyElement = useRef<HTMLDivElement>(null)

  function handleClickRight(): void {
    if (carouselBodyElement.current) {
      const item = carouselBodyElement.current
      const itemStyle = getComputedStyle(item)
      const itemWidth = item.offsetWidth + parseFloat(itemStyle.marginRight)
      carouselBodyElement.current.scrollLeft += itemWidth
    }
  }

  function handleClickLeft(): void {
    if (carouselBodyElement.current) {
      const item = carouselBodyElement.current;
      const itemStyle = getComputedStyle(item)
      const itemWidth = item.offsetWidth + parseFloat(itemStyle.marginRight)
      carouselBodyElement.current.scrollLeft -= itemWidth
    }
  }

  return (
    <div className="carousel">
      <div className="carousel-header">
        <div className="carousel-header__title">
          <h2>{title}</h2>
        </div>
        <div className="carousel-header__arrow">
          <Btn
            type="button"
            className="btn_padding_none carousel-header__arrow-prev"
            onClick={handleClickLeft}
          >
            <ArrowLeft width="24" height="24" />
          </Btn>
          <Btn
            type="button"
            className="btn_padding_none carousel-header__arrow-next"
            onClick={handleClickRight}
          >
            <ArrowRight width="24" height="24" />
          </Btn>
        </div>
      </div>
      <div className="carousel-body"
        ref={carouselBodyElement}>
        {data
          ? data.map((item, index) => {
            return (
              <div
                key={index}
                className="carousel-body__item"
              >
                <Card
                  id={item._id}
                  poster={item.poster}
                  title={item.title}
                  genres={item.genre}
                  rating={item.rating.ratingMovie}
                  isRecommended={item.isRecommended}
                  isFavorite={user?.moviesData.favorites.includes(item._id)}
                />
              </div>
            )
          })
          : (
            <div className="carousel-body__item">
              <NoContent text="No content" />
            </div>
          )
        }
      </div>
    </div>
  )
}
