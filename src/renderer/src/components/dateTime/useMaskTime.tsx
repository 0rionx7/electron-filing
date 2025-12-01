import { ChangeEvent, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import { DateFormType } from '@renderer/components/dateTime/schema'

type UseMaskTimeReturn = {
  maskedTime: string
  handleTimeChange: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<DateFormType, 'time'>,
    backSpacePressed: boolean
  ) => void
}

const useMaskTime = (): UseMaskTimeReturn => {
  const [maskedTime, setMaskedTime] = useState('')

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<{ date: string; time: string }, 'time'>,
    backSpacePressed: boolean
  ): void => {
    let { value } = e.target
    const checkValue = value.replaceAll(':', '')
    if (isNaN(+checkValue) || checkValue.length > 4) return
    const hour = checkValue.slice(0, 2)
    const mins = checkValue.slice(2, 4)
    const invalidHour = +hour[0] > 2 || +hour > 23
    const invalidMins = +mins[0] > 5 || +mins > 59
    if (invalidHour || invalidMins) return
    if (backSpacePressed) {
      if (value.at(-1) === ':') value = value.slice(0, -1)
    } else {
      if (value.length === 2) value += ':'
      if (value.length === 3 && value[2] !== ':') value = `${value.slice(0, 2)}:${value.slice(2)}`
    }
    setMaskedTime(value)
    field.onChange(value)
  }

  return { maskedTime, handleTimeChange }
}
export default useMaskTime
