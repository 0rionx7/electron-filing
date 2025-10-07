import { useEffect } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { Country, PersonalInfoSchema, PersonalInfoType } from '@renderer/lib/schema'
import {
  selectFirstStepData,
  selectSecondStepData,
  setStep,
  updateSecondStepData
} from '@renderer/slice/slice'
import { Card, CardContent, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import DatePicker from '@renderer/components/DatePicker'

export type TitleProps = { title: string }
const countries: Country[] = ['Greece', 'Cyprus', 'Italy', 'Spain']

export default function PersonalInfo({ title }: TitleProps): React.JSX.Element {
  const { username } = useAppSelector(selectFirstStepData)
  const data = useAppSelector(selectSecondStepData)
  const dispatch = useAppDispatch()
  const form = useForm<PersonalInfoType>({
    resolver: zodResolver(PersonalInfoSchema(username)),
    defaultValues: {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date()
    }
  })

  useEffect(() => {
    const subscription = form.watch((data) => {
      const dateOfBirth = data.dateOfBirth!.toISOString()
      dispatch(updateSecondStepData({ ...data, dateOfBirth }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [form, dispatch])

  const onSubmit: SubmitHandler<PersonalInfoType> = (data) => {
    const dateOfBirth = data.dateOfBirth.toISOString()
    dispatch(updateSecondStepData({ ...data, dateOfBirth }))
    dispatch(setStep(3))
  }

  return (
    <Card className="w-full bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FirstName</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LastName</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => <DatePicker field={field} />}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              className="mr-1"
              onClick={() => {
                dispatch(setStep(1))
              }}
            >
              Back
            </Button>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
