import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DEFAULT_DEVICE_INFORMATION, DeviceSchema, GetDevicesResponse, GetDevicesResponseSchema } from './definitions'

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
          // to improve: log parse error for missing or mismatched properties

          const validDevices = response.devices.map((device) => {
            const parsedDevice = DeviceSchema.safeParse(device)
            if (parsedDevice.success) {
              return parsedDevice.data
            } else {
              return { ...DEFAULT_DEVICE_INFORMATION, ...device }
            }
          })

          return { devices: validDevices, version: response.version || '--' }
        }
      },
    }),
  }),
})

export const { useGetDevicesQuery } = devicesApi