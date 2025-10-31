import { Fragment } from 'react'

import { ScrollArea } from '@renderer/components/ui/scroll-area'
import { Separator } from '@renderer/components/ui/separator'
import { GeoEntity } from '@renderer/data'

type GeoItemProps = {
  GeoEntities: GeoEntity[]
  className?: string
}

const GeoItem = ({ GeoEntities, className }: GeoItemProps): React.JSX.Element => {
  return (
    <ScrollArea className={`w-48 rounded-md border border-gray-500 ${className}`}>
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium text-center">Tags</h4>
        {GeoEntities.map((geoEntity) => (
          <Fragment key={geoEntity.label}>
            <div className="text-sm">{geoEntity.label}</div>
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

export default GeoItem
