import { useForm, type SubmitHandler } from 'react-hook-form'

import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { AccountDetailsSchema, AccountDetailsType } from '@renderer/lib/schema'
import { selectFirstStepData, setStep, updateFirstStepData } from '@renderer/slices/registerSlice'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              data-cy="submit"
              className="rounded-xl px-4 py-2 shadow bg-black text-white"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
