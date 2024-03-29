import { ReactNode } from 'react'

export interface ModalProps {
  isActive: boolean
  title: string
  modalClass?: string
  modalSubmit: boolean
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onCloseInFooter?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  children: ReactNode
  titleBtnSubmit?: string
  titleBtnClose?: string
  classBtnSubmit?: string
  classBtnClose?: string
}
