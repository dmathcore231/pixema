import "./styles.scss";

export interface GenresListProps {
  itemList: string[]
}

export function GenresList({ itemList }: GenresListProps): JSX.Element {
  return (
    <div className="genres">
      <ul className="genres__list">
        {itemList.map((item, index) => (
          <li
            key={index}
            className={`genres__item ${index > 0 ? "" : "genres__item_list-style_none"
              } subtitle subtitle_size_xxs
              subtitle_color_secondary
              subtitle_weight_500`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
