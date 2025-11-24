import { useContext } from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { RoutingContext } from '@renderer/components/routingFlow/RoutingContext'
import { Button } from '@renderer/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import { routingMap } from '@renderer/main'

const FlowControl = (): React.JSX.Element => {
  const { handleNext, handleBack } = useContext(RoutingContext)

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 mb-4 ml-3">Choose a flow</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleNext}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Flow" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(routingMap).map((key) =>
              key === 'base' ? null : (
                <SelectItem value={key} key={key}>
                  {key}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          className="border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2"
          onClick={() => handleBack()}
        >
          back
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FlowControl
