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
  geolocationsSelections: GeolocationSelectionsType
}

export type Level = 1 | 2 | 3 | 4 | 5
export const geolocationsInitials = {
  1: regions,
  2: countries,
  3: statesProvinces,
  4: cities,
  5: districts
}

const initialState: GeolocationsType = {
  geolocations: geolocationsInitials,
  geolocationsSelections: { '1': [], '2': [], '3': [], '4': [], '5': [] }
}

export const geolocationsSlice = createSlice({
  name: 'geolocations',
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<{ key: Level; selections: string[] }>) => {
      const { key, selections } = action.payload
      console.log(key, selections)
      state.geolocationsSelections[key] = selections
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
    selectGeolocationsSelections: (geoState) => geoState.geolocationsSelections
  }
})

export const { setSelection, setLocations } = geolocationsSlice.actions
export const { selectGeolocations, selectGeolocationsSelections } = geolocationsSlice.selectors

// function createFilter(state: WritableDraft<GeolocationsType>): void {
//   const filter: string[] = []
//   for (let i = 1; i < 6; i++) {
//     if (state.geolocationsSelections[i].length) {
//       for (const value of state.geolocationsSelections[i]) {
//         const area = geolocationsInitials[i].find((loc) => loc.value === value)
//         filter.push(...area.renders)
//       }
//       filterAreas(i + 1, filter, state)
//     } else if (!filter.length) {
//       state.geolocations[i + 1] = geolocationsInitials[i + 1]
//     }
//   }
// }
// function filterAreas(
//   level: number,
//   filter: string[],
//   state: WritableDraft<GeolocationsType>
// ): void {
//   if (level === 6) return
//   const filter2: string[] = []
//   state.geolocations[level] = geolocationsInitials[level].filter((geo) => {
//     if (filter.includes(geo.value)) {
//       filter2.push(...geo.renders)
//       return true
//     }
//     return false
//   })
//   filterAreas(level + 1, filter2, state)
// }
