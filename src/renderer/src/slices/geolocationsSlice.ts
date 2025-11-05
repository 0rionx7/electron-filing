import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { cities, countries, districts, regions, statesProvinces } from '@renderer/data'

export type GeolocationEntity = {
  label: string
  value: string
  renders: string[]
}

type GeolocationType = {
  '1': GeolocationEntity[]
  '2': GeolocationEntity[]
  '3': GeolocationEntity[]
  '4': GeolocationEntity[]
  '5': GeolocationEntity[]
}

export type GeolocationSelectionsType = {
  '1': string[]
  '2': string[]
  '3': string[]
  '4': string[]
  '5': string[]
}
type GeolocationsType = {
  geolocations: GeolocationType
  geolocationSelections: GeolocationSelectionsType
}

export const geolocationsInitials = {
  '1': regions,
  '2': countries,
  '3': statesProvinces,
  '4': cities,
  '5': districts
}

const initialState: GeolocationsType = {
  geolocations: geolocationsInitials,
  geolocationSelections: { '1': [], '2': [], '3': [], '4': [], '5': [] }
}

export const geolocationsSlice = createSlice({
  name: 'geolocations',
  initialState,
  reducers: {
    setSelections: (state, action: PayloadAction<GeolocationSelectionsType>) => {
      state.geolocationSelections = action.payload
    },
    setLocations: (state, action: PayloadAction<{ locations: GeolocationSelectionsType }>) => {
      for (const [key, entities] of Object.entries(geolocationsInitials)) {
        state.geolocations[key] = entities.filter((entry) =>
          action.payload.locations[key].includes(entry.value)
        )
      }
    }
  },
  selectors: {
    selectGeolocations: (geoState) => geoState.geolocations,
    selectGeolocationSelections: (geoState) => geoState.geolocationSelections
  }
})

export const { setSelections, setLocations } = geolocationsSlice.actions
export const { selectGeolocations, selectGeolocationSelections } = geolocationsSlice.selectors
