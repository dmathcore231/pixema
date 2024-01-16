import { OptionsSelect } from '../types/OptionsSelect'

export type FormDataModalFilters = {
  sort: OptionsSelect | null
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
  country: OptionsSelect[],
  [key: string]: string | number | OptionsSelect[] | null | object
}

