import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'

import { DateFormType } from '@renderer/components/dateTime/schema'

const monthsOf31Days = [1, 3, 5, 7, 8, 10, 12]

const isInvalidMonth = (month: string, day: string): boolean => {
  if (month === '00') return true
  const dayValue = +day
  const monthValue = +month
  const isInvalid =
    +month[0] > 1 ||
    monthValue > 12 ||
    (dayValue === 31 && !monthsOf31Days.includes(monthValue)) ||
    (dayValue > 29 && monthValue === 2)

  return isInvalid
}

const isValidYear = (year: string, day: string, month: string): boolean => {
  switch (year.length) {
    case 1:
      return ['1', '2'].includes(year[0])
    case 2:
      return year.slice(0, 2) === '19' || year.slice(0, 2) === '20'
    case 4: {
      if (day === '29' && month === '02') return isLeapYear(year)
    }
  }
  return true
}

const isLeapYear = (year: string): boolean => {
  const yearValue = +year
  if (yearValue % 100 === 0 && yearValue % 400 !== 0) return false
  if (yearValue % 4 === 0) return true
  return false
}

type DateChangeHandlerType = (
  e: ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<DateFormType, 'date'>,
  backSpacePressed: boolean
) => void

type UseMaskDateReturn = {
  maskedDate: string
  setMaskedDay: Dispatch<SetStateAction<string>>
  handleDateChange: DateChangeHandlerType
}

const useMaskDate = (): UseMaskDateReturn => {
  const [maskedDate, setMaskedDay] = useState('')

  const handleDateChange: DateChangeHandlerType = (e, field, backSpacePressed): void => {
    let { value } = e.target
    const checkValue = value.replaceAll('-', '')
    if (isNaN(+checkValue) || checkValue.length > 8) return
    const day = checkValue.slice(0, 2)
    const month = checkValue.slice(2, 4)
    const year = checkValue.slice(4)
    const invalidDay = +day[0] > 3 || +day > 31 || day === '00'
    if (invalidDay) return
    if (month && isInvalidMonth(month, day)) return
    if (year && !isValidYear(year, day, month)) return
    if (backSpacePressed) {
      if (value.at(-1) === '-' || value.length === 2 || value.length === 5)
        value = value.slice(0, -1)
    } else {
      if (value.length === 2 || value.length === 5) value += '-'
      if (value.length === 3 && value.at(-1) !== '-') value = `${value.slice(0, 2)}-${value.at(-1)}`
      if (value.length === 6 && value.at(-1) !== '-') value = `${value.slice(0, 5)}-${value.at(-1)}`
    }

    setMaskedDay(value)
    field.onChange(value)
  }

  return { maskedDate, setMaskedDay, handleDateChange }
}

export default useMaskDate
