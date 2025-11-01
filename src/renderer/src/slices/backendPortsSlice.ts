import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type BackendPortsType = { expressPort: number | null; backendPorts: number[] }
const initialState: BackendPortsType = { expressPort: null, backendPorts: [] }

export const backendPortsSlice = createSlice({
  name: 'backendPorts',
  initialState,
  reducers: {
    setExpressPort: (state, action: PayloadAction<number>) => {
      state.expressPort = action.payload
    },
    setPorts: (state, action: PayloadAction<number[]>) => {
      state.backendPorts = action.payload
    }
  },
  selectors: {
    selectBackendPorts: (portsState) => portsState.backendPorts,
    selectExpressPort: (portsState) => portsState.expressPort
  }
})

export const { setPorts, setExpressPort } = backendPortsSlice.actions
export const { selectBackendPorts, selectExpressPort } = backendPortsSlice.selectors
