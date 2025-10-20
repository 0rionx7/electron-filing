import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryReturnValue
} from '@reduxjs/toolkit/query/react'
import { RootState } from '@renderer/app/store'

const delay = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms))

const getBaseQuery = (
  port: number
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  fetchBaseQuery({ baseUrl: `http://localhost:${port}` })

const dynamicInjectedPortsBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const getPort = (): number | null => (api.getState() as RootState).backendPorts.expressPort

  const atemptFetch = async (
    retriesCount = 0
  ): Promise<QueryReturnValue<unknown, FetchBaseQueryError, object>> => {
    const port = getPort()

    if (port) {
      return getBaseQuery(port)(args, api, extraOptions)
    } else if (retriesCount < 5) {
      await delay(700)
      return atemptFetch(retriesCount + 1)
    }
    return getBaseQuery(3000)(args, api, extraOptions)
  }

  return atemptFetch()
}

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: dynamicInjectedPortsBaseQuery,
  endpoints: (build) => ({
    handShakeExpress: build.query({ query: () => '' })
  })
})

export const { useHandShakeExpressQuery } = appApi
