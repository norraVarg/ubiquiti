import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetDevicesResponse } from './definitions'

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getDevices: builder.query<GetDevicesResponse, void>({
      query: () => 'data.json',
    }),
  }),
})

export const { useGetDevicesQuery } = devicesApi