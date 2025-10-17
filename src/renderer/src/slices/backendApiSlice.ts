import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type PortsState = { expressUrl: string; ports: string[] }
const initialState: PortsState = { expressUrl: '', ports: [] }

export const backendApiSlice = createSlice({
  name: 'backendApiSlice',
  initialState,
  reducers: {
    setPorts: (state, action: PayloadAction<string[]>) => {
      state.ports = action.payload
    },
    setExpressUrl: (state, action: PayloadAction<string>) => {
      state.expressUrl = action.payload
    }
  },
  selectors: {
    selectPorts: (portsState) => portsState.ports,
    selectExpressUrl: (portsState) => portsState.expressUrl
  }
})

export const { setPorts, setExpressUrl } = backendApiSlice.actions
export const { selectPorts, selectExpressUrl } = backendApiSlice.selectors
