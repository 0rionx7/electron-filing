import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { AccountDetailsSchema, AccountDetailsType } from '@renderer/lib/schema'
import { selectFirstStepData, setStep, updateFirstStepData } from '@renderer/slices/registerSlice'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import { Field } from '@renderer/components/ui/field'
import InputField from '@renderer/components/InputField'
import { DevTool } from '@hookform/devtools'

export const fieldLabelClass = `
  absolute left-3 -top-6 font-medium capitalize
  group-has-[input:placeholder-shown]:text-base
  group-has-[input:placeholder-shown]:text-gray-500
  group-has-[input:placeholder-shown]:top-1.5
  group-has-[input:placeholder-shown]:font-light
  group-data-[invalid=true]:!text-destructive
  transition-[top,font-size,font-weight] duration-300 ease-in-out
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

  const handleReset = (): void => form.reset({ username: '', password: '', confirmPassword: '' })

  return (
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 mb-4 ml-3">Provide your account details</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="details-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <InputField name="username" form={form} />
          <InputField name="password" form={form} />
          <InputField name="confirmPassword" form={form} />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            className="border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-xl px-4 py-2"
            onClick={handleReset}
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
      <DevTool control={form.control} />
    </Card>
  )
}
