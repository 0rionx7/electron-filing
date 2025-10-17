import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type PortsState = { ports: string[] }
const initialState: PortsState = { ports: [] }

export const portsSlice = createSlice({
  name: 'portsSlice',
  initialState,
  reducers: {
    setPorts: (state, action: PayloadAction<string[]>) => {
      state.ports = action.payload
    }
  },
  selectors: {
    selectPorts: (portsState) => portsState.ports
  }
})

export const { setPorts } = portsSlice.actions
export const { selectPorts } = portsSlice.selectors
