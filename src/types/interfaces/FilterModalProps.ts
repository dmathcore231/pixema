export interface FilterModalProps {
  isActive: boolean
  title: string
  onClose: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
