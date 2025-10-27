import { Controller, FieldValues, UseFormReturn, Path } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'
import { fieldLabelClass } from '@renderer/components/AccountDetails'
import { Input } from '@renderer/components/ui/input'

interface InputFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
}

export const InputField = <T extends FieldValues>({
  name,
  form
}: InputFieldProps<T>): React.JSX.Element => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="group relative">
          <FieldLabel htmlFor={name} className={fieldLabelClass}>
            {name}
          </FieldLabel>
          <Input
            {...field}
            id={name}
            aria-invalid={fieldState.invalid}
            placeholder={name}
            autoComplete="off"
            className="placeholder-transparent!"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default InputField
