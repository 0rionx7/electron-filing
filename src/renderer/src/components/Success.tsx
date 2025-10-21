import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { reset, selectEntity1, setStep } from '@renderer/slices/registerSlice'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { Button } from '@renderer/components/ui/button'
import { Item } from '@renderer/components/ui/item'

const Success = (): React.JSX.Element => {
  const entity1 = useAppSelector(selectEntity1)
  const dispatch = useAppDispatch()

  const handleBack = (): void => {
    dispatch(setStep(1))
    dispatch(reset())
  }

  const handleDragFile = (event: React.DragEvent<HTMLDivElement>, entity: string): void => {
    event.preventDefault()
    window.api.startDrag(entity)
  }

  return (
    <Card className="w-full bg-stone-300">
      <CardHeader>
        <CardTitle className="justify-self-center text-gray-600">Congratulations</CardTitle>
      </CardHeader>
      <CardContent>You have successfully submitted your files </CardContent>
      {entity1.map((entity) => (
        <Item
          key={entity}
          variant="outline"
          draggable={true}
          onDragStart={(e) => handleDragFile(e, entity)}
        >
          {entity.split('\\').pop()}
        </Item>
      ))}
      <CardFooter className="justify-center">
        <Button onClick={handleBack}>Back</Button>
      </CardFooter>
    </Card>
  )
}

export default Success
