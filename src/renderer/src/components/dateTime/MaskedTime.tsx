import { ChangeEvent, KeyboardEvent, useRef } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import useMaskTime from '@renderer/components/dateTime/useMaskTime'
import { DateFormType } from '@renderer/components/dateTime/schema'
import { Input } from '@renderer/components/ui/input'

const MaskedTime = ({
  field
}: {
  field: ControllerRenderProps<DateFormType, 'time'>
}): React.JSX.Element => {
  const { maskedTime, handleTimeChange } = useMaskTime()
  const backSpaceRef = useRef(false)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === '.') e.preventDefault()
    backSpaceRef.current = e.key === 'Backspace'
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const backSpacePressed = backSpaceRef.current
    handleTimeChange(e, field, backSpacePressed)
  }

  return (
    <Input
      type="text"
      id="time"
      className="px-4 py-0 h-12 placeholder-transparent! text-base!"
      value={maskedTime}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="time"
    />
  )
}

export default MaskedTime
