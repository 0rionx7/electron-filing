import { addYears, isBefore, isEqual, startOfDay } from 'date-fns'
import { z } from 'zod'

export type Country = 'Greece' | 'Cyprus' | 'Italy' | 'Spain'

export const AccountDetailsSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string()
  })
  .superRefine((val, ctx) => {
    const { password, confirmPassword } = val
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: `passwords don't match`,
        path: ['confirmPassword']
      })
    }
  })

export const PersonalInfoSchema = (username: string) =>
  z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      dateOfBirth: z.date(),
      country: z.enum(['Greece', 'Cyprus', 'Italy', 'Spain'])
    })
    .superRefine((val, ctx) => {
      const userName = username.trim().toLowerCase()
      const lastName = val.lastName.trim().toLowerCase()
      if (lastName && userName.includes(lastName)) {
        ctx.addIssue({
          code: 'custom',
          message: 'username should not contain lastName',
          path: ['lastName']
        })
      }
      const { dateOfBirth } = val
      const eighteenth = addYears(startOfDay(dateOfBirth), 18)
      const today = startOfDay(new Date())
      const isOlderThan18 = isBefore(eighteenth, today) || isEqual(eighteenth, today)
      if (!isOlderThan18)
        ctx.addIssue({
          code: 'custom',
          message: 'You must be over 18',
          path: ['dateOfBirth']
        })
    })

export type AccountDetailsType = z.infer<typeof AccountDetailsSchema>
export type PersonalInfoType = z.infer<ReturnType<typeof PersonalInfoSchema>>
export type FormValuesType = AccountDetailsType & PersonalInfoType
