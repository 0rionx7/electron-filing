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
      // const { dateOfBirth } = val
      // const today = new Date()
      // const age = today.getFullYear() - dateOfBirth.getFullYear()
      // const hasBirthdayPassed =
      //   today.getMonth() > dateOfBirth.getMonth() ||
      //   (today.getMonth() === dateOfBirth.getMonth() && today.getDate() >= dateOfBirth.getDate())
      // const actualAge = hasBirthdayPassed ? age : age - 1
      // if (actualAge < 18) {
      //   ctx.addIssue({
      //     code: 'custom',
      //     message: 'You must be over 18',
      //     path: ['dateOfBirth']
      //   })
      // }
    })

export type AccountDetailsType = z.infer<typeof AccountDetailsSchema>
export type PersonalInfoType = z.infer<ReturnType<typeof PersonalInfoSchema>>
export type FormValuesType = AccountDetailsType & PersonalInfoType
