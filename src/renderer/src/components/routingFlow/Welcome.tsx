import { useContext } from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { RoutingContext } from '@renderer/components/routingFlow/RoutingContext'
import { Button } from '@renderer/components/ui/button'

const Welcome = (): React.JSX.Element => {
  const { handleNext } = useContext(RoutingContext)

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 mb-4 ml-3">Hello!</CardTitle>
      </CardHeader>
      <CardContent>Welcome</CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          className="border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2"
          onClick={() => handleNext()}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Welcome
