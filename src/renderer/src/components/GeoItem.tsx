import { ControllerRenderProps } from 'react-hook-form'

import { GeolocationSelectionsType, selectGeolocations } from '@renderer/slices/geolocationsSlice'
import { GeoMultiselect } from '@renderer/components/GeoMultiselect'
import { useAppSelector } from '@renderer/app/hooks'

type GeoItemProps = {
  field: ControllerRenderProps<GeolocationSelectionsType, '1' | '2' | '3' | '4' | '5'>
  title: string
  level: number
}

const GeoItem = ({ level, title, field }: GeoItemProps): React.JSX.Element => {
  const geolocations = useAppSelector(selectGeolocations)

  const geoEntities = geolocations[level]

  return (
    <>
      <h3 className="text-center p-1 capitalize">
        {title}-{geoEntities.length}
      </h3>
      <GeoMultiselect {...field} options={geoEntities} level={level} />
    </>
  )
}

export default GeoItem
