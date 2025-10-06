import { use } from 'react'

import { FilesContext } from '@renderer/components/FilesSelection'
import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@renderer/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'

export function ChooseFiles(): React.JSX.Element | null {
  const { fileEntities } = use(FilesContext)

  if (!fileEntities.length) return null

  const handleSelect = (): void => {}

  return (
    <>
      <Card className="bg-stone-400 space-y-2.5 w-xl shadow-black shadow-md">
        <CardHeader>
          <CardTitle>Please select your files</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <form>
            <FieldGroup>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">File List</FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      {fileEntities.map(({ fileName }) => (
                        <SelectItem key={fileName} value={fileName}>
                          {fileName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </form>
          <Button className="button" onClick={handleSelect}>
            Select
          </Button>
        </CardContent>
      </Card>
      <div className="w-full max-w-md"></div>
    </>
  )
}
