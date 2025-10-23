import { useEffect } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
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
} from '@renderer/slices/registerSlice'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@renderer/components/ui/select'
import DatePicker from '@renderer/components/DatePicker'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'
import { fieldLabelClass } from '@renderer/components/AccountDetails'

const countries: Country[] = ['Greece', 'Cyprus', 'Italy', 'Spain']

export default function PersonalInfo(): React.JSX.Element {
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
        <CardTitle className="text-gray-600">Provide your personal info</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="infos-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative mt-3">
                <Input
                  {...field}
                  id="infos-form-firstName"
                  aria-invalid={fieldState.invalid}
                  placeholder="firstName"
                  autoComplete="off"
                  className="peer placeholder-transparent!"
                />
                <FieldLabel htmlFor="infos-form-firstName" className={fieldLabelClass}>
                  FirstName
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative mt-3">
                <Input
                  {...field}
                  id="infos-form-lastName"
                  aria-invalid={fieldState.invalid}
                  placeholder="lastName"
                  autoComplete="off"
                  className="peer placeholder-transparent!"
                />
                <FieldLabel htmlFor="infos-form-lastName" className={fieldLabelClass}>
                  LastName
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field, fieldState }) => (
              <DatePicker field={field} fieldState={fieldState} label="Date of birth" />
            )}
          />
          <Controller
            name="country"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="relative mt-3">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldLabel htmlFor="infos-form-country" className={fieldLabelClass}>
                  Country
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
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl px-4 py-2"
            onClick={() => {
              dispatch(setStep(1))
            }}
          >
            Back
          </Button>
          <Button
            form="infos-form"
            type="submit"
            className="bg-black text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
          >
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
