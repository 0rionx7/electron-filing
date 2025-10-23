import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { AccountDetailsSchema, AccountDetailsType } from '@renderer/lib/schema'
import { selectFirstStepData, setStep, updateFirstStepData } from '@renderer/slices/registerSlice'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'

export const fieldLabelClass = `
  absolute left-3.5 -top-[70%] font-medium
  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
  peer-placeholder-shown:top-[20%] peer-placeholder-shown:font-[350]
  transition-all duration-300 ease-in-out
`

export default function AccountDetails(): React.JSX.Element {
  const data = useAppSelector(selectFirstStepData)
  const dispatch = useAppDispatch()
  const form = useForm<AccountDetailsType>({
    resolver: zodResolver(AccountDetailsSchema),
    defaultValues: {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
  })
  const onSubmit: SubmitHandler<AccountDetailsType> = (data) => {
    dispatch(updateFirstStepData(data))
    dispatch(setStep(2))
  }

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600">Provide your account details</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="details-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative mt-3">
                <Input
                  {...field}
                  id="details-form-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="username"
                  autoComplete="off"
                  className="peer placeholder-transparent!"
                />
                <FieldLabel htmlFor="details-form-username" className={fieldLabelClass}>
                  Username
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <Input
                  {...field}
                  id="details-form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="password"
                  autoComplete="off"
                  className="peer placeholder-transparent!"
                />
                <FieldLabel htmlFor="details-form-password" className={fieldLabelClass}>
                  Password
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative">
                <Input
                  {...field}
                  id="details-form-confirmPassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="confirmPassword"
                  autoComplete="off"
                  className="peer placeholder-transparent!"
                />
                <FieldLabel htmlFor="details-form-confirmPassword" className={fieldLabelClass}>
                  Confirm Password
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            className="border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2"
            onClick={() =>
              form.reset({
                username: '',
                password: '',
                confirmPassword: ''
              })
            }
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="details-form"
            data-cy="submit"
            className="bg-black text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
