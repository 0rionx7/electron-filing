import { useContext } from 'react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { RoutingContext } from '@renderer/components/routingFlow/RoutingContext'
import { Button } from '@renderer/components/ui/button'

const ThirdStep = (): React.JSX.Element => {
  const { handleNext, handleBack, canNext } = useContext(RoutingContext)

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 mb-4 ml-3">Flow 1 ThirdStep</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button
          type="button"
          variant="outline"
          className="border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2"
          onClick={() => handleBack()}
        >
          back
        </Button>
        {canNext && (
          <Button
            type="button"
            variant="outline"
            className="border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2"
            onClick={() => handleNext()}
          >
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ThirdStep
