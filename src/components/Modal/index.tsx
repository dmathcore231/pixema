import "./styles.scss"
import { ModalProps } from "../../types/interfaces/ModalProps"
import { CloseIcon } from "../../images/Icons/CloseIcon"

export function Modal({ isActive, modalClass, title, onClose, onSubmit, children, titleBtnSubmit, titleBtnClose }: ModalProps): JSX.Element | null {
  if (!isActive) {
    return null
  } else {
    return (
      <div className={`modal ${modalClass ? modalClass : ""}`}>
        <div className="modal__content modal__content_height_100">
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button className="btn btn_close modal__btn-close" onClick={onClose}>
              <CloseIcon width="24" height="24" />
            </button>
          </div>
          <div className="modal__body">
            {children}
          </div>
          <div className="modal__footer">
            <button className="btn btn_secondary modal__btn-clear" onClick={onClose}>{titleBtnClose}</button>
            <button className="btn btn_primary modal__btn-submit" onClick={onSubmit}>{titleBtnSubmit}</button>
          </div>
        </div>
      </div>
    )
  }
}
