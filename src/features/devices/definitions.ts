import { z } from 'zod'

export interface DevicesState {
  all: Device[]
  filteredDevices: Device[]
  filters: ProductLine[]
  viewMode: ViewMode | null
}

export const enum ProductLine {
  UniFi = 'UniFi',
  UniFiLTE = 'UniFi LTE',
  UniFiProtect = 'UniFi Protect',
  UniFiAccess = 'UniFi Access',
  AirMax = 'airMax',
  EdgeMax = 'EdgeMax',
}

export type ViewMode = 'grid' | 'list'

const DeviceIconSchema = z.object({
  id: z.string(),
  resolutions: z.array(z.array(z.number().nullable())),
})

export const DeviceSchema = z.object({
  icon: DeviceIconSchema,
  id: z.string(),
  images: z.object({
    default: z.string(),
    nopadding: z.string(),
    topology: z.string(),
  }),
  line: z.object({
    id: z.string(),
    name: z.string(),
  }),
  product: z.object({
    abbrev: z.string(),
    name: z.string(),
  }),
  compliance: z.object({
    modelName: z.string(),
  }),
  deviceType: z.string(),
  shortnames: z.array(z.string()),
  unifi: z.object({
    adoptability: z.string(),
    network: z.object({
      numberOfPorts: z.number().nullable(),
      bleServices: z.array(
        z.object({
          configured: z.string(),
          default: z.string(),
          features: z.object({
            ucore: z.boolean().nullable(),
          })
        })
      ),
      details: z.object({
        ipsThroughput: z.string(),
        legacyPortRemap: z.boolean().nullable(),
      }),
      radios: z.object({
        na: z.object({
          gain: z.number().nullable(),
          maxPower: z.number().nullable(),
          maxSpeedMegabitsPerSecond: z.number().nullable()
        }),
        ng: z.object({
          gain: z.number().nullable(),
          maxPower: z.number().nullable(),
          maxSpeedMegabitsPerSecond: z.number().nullable()
        }),
      }),
    }),
    deviceCapabilities: z.array(z.string()),
    model: z.string(),
    type: z.string(),
  })
})

export const GetDevicesResponseSchema = z.object({
  devices: z.array(DeviceSchema),
  version: z.string(),
})
export type DeviceIcon = z.infer<typeof DeviceIconSchema>
export type Device = z.infer<typeof DeviceSchema>
export type GetDevicesResponse = z.infer<typeof GetDevicesResponseSchema>

export const GetDeviceResponseSchema = DeviceSchema
export type GetDeviceResponse = z.infer<typeof GetDeviceResponseSchema>

export const DEFAULT_DEVICE_INFORMATION: Device = {
  icon: { id: '--', resolutions: [] },
  id: '--',
  images: { default: '--', nopadding: '--', topology: '--' },
  line: { id: '--', name: '--' },
  product: { abbrev: '--', name: '--' },
  compliance: { modelName: '--' },
  deviceType: '--',
  shortnames: ['--'],
  unifi: {
    adoptability: '--',
    network: {
      numberOfPorts: null,
      bleServices: [
        {
          configured: '--',
          default: '--',
          features: { ucore: null },
        },
      ],
      radios: {
        na: { gain: null, maxPower: null, maxSpeedMegabitsPerSecond: null },
        ng: { gain: null, maxPower: null, maxSpeedMegabitsPerSecond: null },
      },
      details: {
        ipsThroughput: '--',
        legacyPortRemap: null,
      }
    },
    type: '',
    deviceCapabilities: [],
    model: '',
  },
}