import { OptionsSelect } from '../types/OptionsSelect'

export type FormDataModalFilters = {
  sort: OptionsSelect
  title: string | null
  genre: OptionsSelect[]
  years: {
    from: number | null
    to: number | null
  }
  rating: {
    from: number | null
    to: number | null
  }
  country: OptionsSelect[]
}
