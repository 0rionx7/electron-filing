import { ControllerRenderProps } from 'react-hook-form'

import { MultiSelect } from '@renderer/components/ui/multi-select'
import { useAppSelector } from '@renderer/app/hooks'
import { FieldLabel } from '@renderer/components/ui/field'
import { GeolocationSelectionsType, selectGeolocations } from '@renderer/slices/geolocationsSlice'

type GeolocationItemsProps = {
  field: ControllerRenderProps<GeolocationSelectionsType, '1' | '2' | '3' | '4' | '5'>
  title: string
  level: number
}

const GeolocationItems = ({ level, title, field }: GeolocationItemsProps): React.JSX.Element => {
  const geolocations = useAppSelector(selectGeolocations)

  const geoEntities = geolocations[level]

  return (
    <>
      <FieldLabel className="text-center p-1 capitalize">
        {title}-{geoEntities.length}
      </FieldLabel>
      <MultiSelect {...field} options={geoEntities} className="p-2 max-h-full" />
    </>
  )
}

export default GeolocationItems
