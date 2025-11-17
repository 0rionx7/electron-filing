import { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { makeData } from '@renderer/components/Virtualization/makeData'
import List from '@renderer/components/Virtualization/List'

const ListContainer = (): React.JSX.Element => {
  const [places] = useState(() => makeData(120_000))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Places</CardTitle>
      </CardHeader>

      <CardContent className="h-[60vh] w-[70vw]">
        <List places={places} />
      </CardContent>
    </Card>
  )
}

export default ListContainer
