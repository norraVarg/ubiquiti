import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { overrideParseErrorPropertiesWithDefaultValues } from '../../utils/utils'
import { DeviceSchema, GetDevicesResponse, GetDevicesResponseSchema } from './definitions'

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getDevices: builder.query<GetDevicesResponse, void>({
      query: () => 'data.json',
      transformResponse: (response: GetDevicesResponse) => {
        const parsedResponse = GetDevicesResponseSchema.safeParse(response)
        if (parsedResponse.success) {
          return parsedResponse.data
        } else {
          // to improve: send parse error for missing or mismatched properties 
          // in sentry or other logging service

          const validDevices = response.devices.map((device) => {
            const parsedDevice = DeviceSchema.safeParse(device)
            if (parsedDevice.success) {
              return parsedDevice.data
            } else {
              const deviceDataWithDefaultValues = overrideParseErrorPropertiesWithDefaultValues(parsedDevice.error.issues, device)
              return deviceDataWithDefaultValues
            }
          })

          return { devices: validDevices, version: response.version || '--' }
        }
      },
    }),
  }),
})

export const { useGetDevicesQuery } = devicesApi
