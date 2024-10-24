import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { overrideParseErrorPropertiesWithDefaultValues } from '../../utils/utils'
import { DeviceSchema, GetDeviceResponse, GetDevicesResponse } from './definitions'
import data from '../../data.json'

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getDevices: builder.query<GetDevicesResponse, void>({
      // mocking the api call with a local json file
      queryFn: async () => {
        const validDevices = data.devices.map((device) => {
          const parsedDevice = DeviceSchema.safeParse(device)
          if (parsedDevice.success) {
            return parsedDevice.data
          } else {
            const deviceDataWithDefaultValues = overrideParseErrorPropertiesWithDefaultValues(parsedDevice.error.issues, device)
            return deviceDataWithDefaultValues
          }
        })

        return { data: { devices: validDevices, version: '--' } }
      },
    }), getDevice: builder.query<GetDeviceResponse, string>({
      // mocking the api call with a local json file
      queryFn: async (id) => {
        const device = data.devices.find((device) => device.id === id)
        if (device) {
          const parsedDevice = DeviceSchema.safeParse(device)
          if (parsedDevice.success) {
            return { data: parsedDevice.data }
          } else {
            // to improve: send parse error for missing or mismatched properties 
            // in sentry or other logging service

            const deviceDataWithDefaultValues = overrideParseErrorPropertiesWithDefaultValues(parsedDevice.error.issues, device)
            return { data: deviceDataWithDefaultValues }
          }
        } else {
          return { error: { status: 404, data: 'Device not found' } }
        }
      },
    }),
  }),
})

export const { useGetDevicesQuery, useGetDeviceQuery } = devicesApi
