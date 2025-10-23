import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar1Icon } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Calendar } from '@renderer/components/ui/calendar'
import { FormControl, FormItem, FormLabel, FormMessage } from '@renderer/components/ui/form'
import { Button } from '@renderer/components/ui/button'
import { cn } from '@renderer/lib/utils'
import { PersonalInfoType } from '@renderer/lib/schema'

type DatePickerProps = {
  field: ControllerRenderProps<PersonalInfoType, 'dateOfBirth'>
}
const DatePicker = ({ field }: DatePickerProps): React.JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Date of birth</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
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
          </FormControl>
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
      <FormMessage />
    </FormItem>
  )
}

export default DatePicker
