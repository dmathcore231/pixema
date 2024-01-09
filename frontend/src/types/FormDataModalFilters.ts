import { OptionsSelect } from '../types/OptionsSelect'

export type FormDataModalFilters = {
  sort: OptionsSelect
  title: string
  genre: OptionsSelect[]
  years: {
    from: number
    to: number
  }
  rating: {
    from: number
    to: number
  }
  country: OptionsSelect[]
}
