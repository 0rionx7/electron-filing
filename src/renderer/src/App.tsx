import Versions from './components/Versions'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { Label } from '@renderer/components/ui/label'

function App(): React.JSX.Element {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
          <Label htmlFor="input">Label</Label>
          <Input id="input" placeholder="Type here" className="input" />
          <Button className="button">Button</Button>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  )
}

export default App
