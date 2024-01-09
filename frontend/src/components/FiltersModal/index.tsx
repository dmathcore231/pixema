import './styles.scss'
import { Tabs } from '../Tabs'
import { OptionsSelect } from '../../types/OptionsSelect'

export function FiltersModal(): JSX.Element {

  function handleClickTabs(option: OptionsSelect) {
    console.log(option)
  }

  return (
    <form className="filters">
      <div className='filters__item'>
        <Tabs
          options={[
            { label: 'Rating', value: 'rating' },
            { label: 'Year', value: 'year' },
          ]}
          onChangeTabs={handleClickTabs}
        />
      </div>
    </form>
  )
}
