import { useEffect } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import DatePicker from '@renderer/components/steppedForm/DatePicker'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'
import { fieldLabelClass } from '@renderer/components/steppedForm/AccountDetails'
import InputField from '@renderer/components/steppedForm/InputField'

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
    <Card className="w-md bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600  mb-4 ml-3">Provide your personal info</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="infos-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <InputField name="firstName" form={form} />
          <InputField name="lastName" form={form} />
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
              <Field data-invalid={fieldState.invalid} className="group relative mt-3">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <FieldLabel htmlFor="infos-form-country" className={fieldLabelClass}>
                      Country
                    </FieldLabel>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
