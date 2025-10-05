import { useState } from 'react'
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
  const [msg, setMsg] = useState('')

  const handleSelect = async (): Promise<void> => {
    try {
      await window.api.openFolder()
      setMsg('Folder selection received.')
    } catch (error) {
      setMsg('Folder selection failed.Please try again.')
    }
  }

  return (
    <>
      <Card className="bg-stone-400 space-y-2.5 w-xl shadow-black shadow-md">
        <CardHeader>
          <CardTitle>Folder selection utility</CardTitle>
          <CardDescription>Please select a folder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <Button className="button" onClick={handleSelect}>
            Select
          </Button>
        </CardContent>
        <CardFooter>
          <p>{msg}</p>
        </CardFooter>
      </Card>
    </>
  )
}

export default App
