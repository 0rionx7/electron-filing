import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@renderer/components/ui/card'

import { useAppDispatch, useAppSelector } from '@renderer/app/hooks'
import { Field, FieldError } from '@renderer/components/ui/field'
import { Button } from '@renderer/components/ui/button'
import GeolocationItems from '@renderer/components/GeolocationItems'
import { cities, countries, districts, regions, statesProvinces } from '@renderer/data'
import {
  GeolocationEntity,
  GeolocationSelectionsType,
  geolocationsInitials,
  selectGeolocationSelections,
  setLocations,
  setSelections
} from '@renderer/slices/geolocationsSlice'

const KEYS = ['1', '2', '3', '4', '5'] as const
const TITLES = ['regions', 'countries', 'statesProvinces', 'cities', 'districts']

const Geolocations = (): React.JSX.Element => {
  const geolocationSelections = useAppSelector(selectGeolocationSelections)
  const dispatch = useAppDispatch()
  const { control, handleSubmit, watch, reset } = useForm<GeolocationSelectionsType>({
    defaultValues: geolocationSelections
  })

  useEffect(() => {
    const subscription = watch((data, { type }) => {
      if (type === 'change') {
        const { newData, acceptedValues } = filterData(data as GeolocationSelectionsType)
        dispatch(setLocations({ locations: acceptedValues }))
        dispatch(setSelections(newData))
        reset(newData, { keepDirty: true, keepTouched: true })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch, watch, reset])

  const onSubmit: SubmitHandler<GeolocationSelectionsType> = async (values) => {
    console.log('submit geolocations:', values)
  }

  return (
    <Card className="w-4xl h-[80vh] bg-stone-300">
      <CardHeader>
        <CardTitle className="text-gray-600 justify-self-center">Geolocation</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden flex-1">
        <form
          id="geo-form"
          onSubmit={handleSubmit(onSubmit)}
          className="h-full grid grid-cols-3 grid-rows-[repeat(2,1fr)] gap-2"
        >
          {TITLES.map((title, i) => {
            const name = KEYS[i]
            const className = `${i === 4 ? 'row-start-1 col-start-3 row-span-2 ' : ''}overflow-auto`

            return (
              <Controller
                key={title}
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className={className}>
                    <GeolocationItems title={title} level={i + 1} field={field} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            )
          })}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          form="geo-form"
          className="bg-green-600 text-white hover:bg-neutral-800 shadow rounded-xl px-4 py-2"
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Geolocations

const getValues = (areas: GeolocationEntity[]): string[] => areas.map((area) => area.value)
const getRenders = (data: string[], level: number): string[] => {
  const areas = geolocationsInitials[level].filter((geo) => data.includes(geo.value))
  return areas.flatMap((area) => area.renders)
}

const initialAccepted = {
  1: getValues(regions),
  2: getValues(countries),
  3: getValues(statesProvinces),
  4: getValues(cities),
  5: getValues(districts)
}

function filterData(data: GeolocationSelectionsType): {
  newData: GeolocationSelectionsType
  acceptedValues: GeolocationSelectionsType
} {
  const acceptedValues = { ...initialAccepted }
  const newData = {} as GeolocationSelectionsType

  Object.entries(data).forEach(([key, selectedValues]) => {
    const index = Number(key)
    const dataSet = new Set(selectedValues)
    const acceptedSet = new Set(acceptedValues[index])
    newData[index] = [...dataSet.intersection(acceptedSet)]
    if (index === 5) return
    const rendersFrom = newData[index].length ? newData[index] : acceptedValues[index]
    acceptedValues[index + 1] = getRenders(rendersFrom, index)
  })

  return { newData, acceptedValues }
}
