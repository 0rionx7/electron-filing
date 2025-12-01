import { z } from 'zod'
import { isValid, parse } from 'date-fns'

export const DateFormSchema = z
  .object({
    date: z.string(),
    time: z.string()
  })
  .superRefine((val, ctx) => {
    const parsedDate = parse(val.date, 'dd-MM-yyyy', new Date())
    const parsedTime = parse(val.time, 'HH:mm', new Date())
    if (!isValid(parsedDate) || val.date.length !== 10) {
      ctx.addIssue({
        code: 'custom',
        message: 'You must provide a valid date',
        path: ['date']
      })
    }
    if (!isValid(parsedTime) || val.time.length !== 5) {
      ctx.addIssue({
        code: 'custom',
        message: 'You must provide a valid time',
        path: ['time']
      })
    }
  })

export type DateFormType = z.infer<typeof DateFormSchema>
