import { useForm, type SubmitHandler } from 'react-hook-form'

import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
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
import { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@renderer/components/ui/popover'
import { cn } from '@renderer/lib/utils'
import { Calendar1Icon } from 'lucide-react'
import { Calendar } from '@renderer/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'

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
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <Calendar1Icon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
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
