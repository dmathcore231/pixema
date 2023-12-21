import "./styles.scss"
import { ModalProps } from "../../types/interfaces/ModalProps"
import { CloseIcon } from "../../images/Icons/CloseIcon"
import { Btn } from "../Btn"

export function Modal({ isActive, modalClass, title, onClose, onSubmit, children, titleBtnSubmit, titleBtnClose, classBtnSubmit, classBtnClose }: ModalProps): JSX.Element | null {
  if (!isActive) {
    return null
  } else {
    return (
      <div className={"modal" + (modalClass ? " " + modalClass : "") + ""}>
        <div className="modal__content">
          <div className="modal__header">
            <div className="modal__title">
              <h2>{title}</h2>
            </div>
            <div className="modal__btn-close">
              <Btn
                type='button'
                className='btn_close'
                onClick={onClose}>
                <CloseIcon width="24" height="24" />
              </Btn>
            </div>
          </div>
          <div className="modal__body">
            {children}
          </div>
          <div className="modal__footer">
            <Btn
              type='button'
              className={(classBtnClose ? classBtnClose : "btn_secondary")}
              onClick={onClose}>
              {titleBtnClose}
            </Btn>
            <Btn
              type='submit'
              className={(classBtnSubmit ? classBtnSubmit : "btn_primary")}
              onClick={onSubmit}>
              {titleBtnSubmit}
            </Btn>
          </div>
        </div>
      </div>
    )
  }
}
