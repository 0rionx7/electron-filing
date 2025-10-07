import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type Country } from '../lib/schema'

export type FileEntity = {
  label: string
  value: string
}

type RegisterDataType = {
  firstStep: {
    username: string
    password: string
    confirmPassword: string
  }
  secondStep: {
    firstName: string
    lastName: string
    dateOfBirth: string
    country: Country
  }
  entities: {
    entity1: string[]
    entity2: string[]
  }
  rootDirectory: string
  fileList: FileEntity[]
}

const initialValues: RegisterDataType = {
  firstStep: { username: '', password: '', confirmPassword: '' },
  secondStep: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: 'Greece'
  },
  rootDirectory: '',
  entities: { entity1: [], entity2: [] },
  fileList: []
}

export interface RegisterState {
  step: number
  data: RegisterDataType
}

const initialState: RegisterState = {
  step: 1,
  data: initialValues
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateFirstStepData: (state, action: PayloadAction<Partial<RegisterDataType['firstStep']>>) => {
      state.data.firstStep = { ...state.data.firstStep, ...action.payload }
    },
    updateSecondStepData: (
      state,
      action: PayloadAction<Partial<RegisterDataType['secondStep']>>
    ) => {
      state.data.secondStep = { ...state.data.secondStep, ...action.payload }
    },
    setRootDirectory: (state, action: PayloadAction<string>) => {
      if (state.data.rootDirectory !== action.payload) {
        state.data.entities.entity1 = []
        state.data.entities.entity2 = []
      }
      state.data.rootDirectory = action.payload
    },
    setFileList: (state, action: PayloadAction<FileEntity[]>) => {
      state.data.fileList = action.payload
    },
    toggleEntity: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { value, name } = action.payload
      const set = new Set(state.data.entities[name])
      set.has(value) ? set.delete(value) : set.add(value)
      state.data.entities[name] = [...set]
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    },
    resetEntity: (state, action: PayloadAction<string>) => {
      state.data.entities[action.payload] = []
    },
    reset: () => initialState
  },
  selectors: {
    selectFirstStepData: (formState) => formState.data.firstStep,
    selectSecondStepData: (formState) => formState.data.secondStep,
    selectStep: (formState) => formState.step,
    selectRootDirectory: (formState) => formState.data.rootDirectory,
    selectFileList: (formState) => formState.data.fileList,
    selectEntity1: (formState) => formState.data.entities.entity1,
    selectEntity2: (formState) => formState.data.entities.entity2,
    selectEntities: (formState) => formState.data.entities
  }
})

export const {
  updateFirstStepData,
  updateSecondStepData,
  setStep,
  setRootDirectory,
  setFileList,
  toggleEntity,
  resetEntity,
  reset
} = registerSlice.actions
export const {
  selectFirstStepData,
  selectSecondStepData,
  selectStep,
  selectRootDirectory,
  selectFileList,
  selectEntity1,
  selectEntity2,
  selectEntities
} = registerSlice.selectors
