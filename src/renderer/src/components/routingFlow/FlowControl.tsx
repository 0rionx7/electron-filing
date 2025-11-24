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
            <SelectItem value="flow1">Flow1</SelectItem>
            <SelectItem value="flow2">Flow2</SelectItem>
            <SelectItem value="flow3">Flow3</SelectItem>
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
