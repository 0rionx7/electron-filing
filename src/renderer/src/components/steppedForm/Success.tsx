import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { selectEntity1, selectEntity2 } from '@renderer/slices/registerSlice'
import { useAppSelector } from '@renderer/app/hooks'
import { Item } from '@renderer/components/ui/item'

const Success = (): React.JSX.Element => {
  const entity1 = useAppSelector(selectEntity1)
  const entity2 = useAppSelector(selectEntity2)

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
      {[...entity1, ...entity2].map((entity) => (
        <Item
          key={entity}
          variant="outline"
          draggable={true}
          onDragStart={(e) => handleDragFile(e, entity)}
        >
          {entity.split('\\').pop()}
        </Item>
      ))}
    </Card>
  )
}

export default Success
