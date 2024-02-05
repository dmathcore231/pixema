import "./styles.scss"

export function Error(): JSX.Element {
  return (
    <div className="error">
      <div className="error__title">
        <h3>Oops! Something went wrong with us! Try again later!</h3>
      </div>
    </div>
  )
}
