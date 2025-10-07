import { useAppDispatch } from '@renderer/app/hooks'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { reset, setStep } from '@renderer/slice/slice'

const Success = (): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const handleClick = (): void => {
    dispatch(setStep(1))
    dispatch(reset())
  }

  return (
    <Card className="w-full bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600">Congratulations</CardTitle>
      </CardHeader>
      <CardContent>You have successfully submitted your files </CardContent>
      <CardFooter>
        <Button onClick={handleClick}>Back</Button>
      </CardFooter>
    </Card>
  )
}

export default Success
