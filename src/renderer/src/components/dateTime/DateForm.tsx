import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DevTool } from '@hookform/devtools'

import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'
import { DateFormSchema, DateFormType } from '@renderer/components/dateTime/schema'
import MaskedDate from '@renderer/components/dateTime/MaskedDate'
import MaskedTime from '@renderer/components/dateTime/MaskedTime'

export const fieldLabelClass = `
  absolute left-4 text-xs text-gray-400  font-semibold! text-gray-700!
  group-has-[input:placeholder-shown]:top-1/2
  group-has-[input:placeholder-shown]:-translate-y-1/2
  group-has-[input:placeholder-shown]:text-base
  group-has-[input:placeholder-shown]:font-light
  group-data-[invalid=true]:text-destructive!
  transition-[top,font-size,font-weight] duration-300 ease-in-out
`

export default function DateForm(): React.JSX.Element {
  const form = useForm<DateFormType>({
    resolver: zodResolver(DateFormSchema),
    defaultValues: { date: '', time: '' },
    mode: 'onSubmit'
  })

  const onSubmit: SubmitHandler<DateFormType> = (data) => {
    console.log(data)
  }

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 mb-4 ml-3">Provide date and time</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="date-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="group">
                  <MaskedDate field={field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="time"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="group relative">
                  <div className="relative">
                    <FieldLabel htmlFor="time" className={fieldLabelClass}>
                      Time
                    </FieldLabel>
                    <MaskedTime field={field} />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="date-form"
            data-cy="submit"
            className="bg-black text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
      <DevTool control={form.control} />
    </Card>
  )
}
