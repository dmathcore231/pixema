import "./styles.scss"

export interface GenresListProps {
  itemList: string[]
}

export function GenresList({ itemList }: GenresListProps): JSX.Element {

  function renderGenresList(): JSX.Element[] {
    const genreItems: JSX.Element[] = []

    for (let i = 0; i < itemList.length; i++) {
      genreItems.push(
        <li
          className={`genres__item ${i > 0 ? "" : "genres__item_list-style_none"
            } subtitle subtitle_size_xxs
            subtitle_color_secondary
            subtitle_weight_500`}
        >
          {itemList[i]}
        </li>
      )
    }

    return genreItems
  }

  return (
    <div className="genres">
      <ul className="genres__list">
        {renderGenresList()}
      </ul>
    </div>
  )
}
