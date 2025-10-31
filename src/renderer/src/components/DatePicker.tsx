import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar1Icon } from 'lucide-react'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Calendar } from '@renderer/components/ui/calendar'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { PersonalInfoType } from '@renderer/lib/schema'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'
import { fieldLabelClass } from '@renderer/components/AccountDetails'

type DatePickerProps = {
  field: ControllerRenderProps<PersonalInfoType, 'dateOfBirth'>
  fieldState: ControllerFieldState
  label: string
}
const DatePicker = ({ field, fieldState, label }: DatePickerProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <Field
      data-invalid={fieldState.invalid}
      className="group relative mt-3"
      aria-invalid={fieldState.invalid}
    >
      <FieldLabel htmlFor="infos-form-lastName" className={fieldLabelClass}>
        {label}
      </FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-60 pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground'
            )}
          >
            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
            <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => {
              field.onChange(date)
              setOpen(false)
            }}
            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )
}

export default DatePicker
