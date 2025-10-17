import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { RootState } from '@renderer/app/store'

const portsInjectedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState
  const baseUrl = state.backendApiSlice.expressUrl

  return fetchBaseQuery({ baseUrl })(args, api, extraOptions)
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: portsInjectedBaseQuery,
  endpoints: (build) => ({
    handShake: build.query({ query: () => '' })
  })
})

export const { useHandShakeQuery } = appApi
