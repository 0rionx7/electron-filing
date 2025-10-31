import * as React from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import AreaItem from '@renderer/components/GeoItem'
import * as data from '@renderer/data'

const Area = (): React.JSX.Element => {
  return (
    <Card className="bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 justify-self-center">Area</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-2 grid-rows-[repeat(2,--spacing(62))]">
        <AreaItem GeoEntities={data.regions} />
        <AreaItem GeoEntities={data.countries} />
        <AreaItem GeoEntities={data.statesProvinces} />
        <AreaItem GeoEntities={data.cities} />
        <AreaItem className="row-start-1 col-start-3 row-span-2 " GeoEntities={data.districts} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}

export default Area
