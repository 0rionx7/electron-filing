import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { Calendar1Icon } from 'lucide-react'
import { format, parse } from 'date-fns'

import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { Calendar } from '@renderer/components/ui/calendar'
import { Input } from '@renderer/components/ui/input'
import useMaskDate from '@renderer/components/dateTime/useMaskDate'
import { Button } from '@renderer/components/ui/button'
import { DateFormType } from '@renderer/components/dateTime/schema'
import { FieldLabel } from '@renderer/components/ui/field'
import { fieldLabelClass } from '@renderer/components/dateTime/DateForm'

const MaskedDate = ({
  field
}: {
  field: ControllerRenderProps<DateFormType, 'date'>
}): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const { maskedDate, setMaskedDay, handleDateChange } = useMaskDate()
  const backSpaceRef = useRef(false)

  const handleDateSelect = (date: Date | undefined): void => {
    if (date) {
      const formatedDate = format(date, 'dd-MM-yyyy')
      field.onChange(formatedDate)
      setMaskedDay(formatedDate)
      setOpen(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const backSpacePressed = backSpaceRef.current
    handleDateChange(e, field, backSpacePressed)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === '-' || e.key === '.') e.preventDefault()
    backSpaceRef.current = e.key === 'Backspace'
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative">
        <FieldLabel htmlFor="date" className={fieldLabelClass}>
          Date
        </FieldLabel>
        <Input
          type="text"
          id="date"
          value={maskedDate}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="dd-mm-yyyy"
          className="px-4 py-0 h-12 placeholder-transparent! text-base!"
        />
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            aria-label="Open date picker"
          >
            <Calendar1Icon />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={parse(field.value, 'dd-MM-yyyy', new Date())}
          onSelect={handleDateSelect}
          disabled={(date) => date > new Date('2099-12-31') || date < new Date('1900-01-01')}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}

export default MaskedDate
