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

export interface DeviceIcon {
  id: string
  resolutions: number[][]
}

// todo: use zod to validate the data
export interface Device {
  guids: string[]
  icon: DeviceIcon
  id: string
  images: {
    default: string
    nopadding: string
    topology: string
  },
  line: {
    id: string
    name: string
  },
  product: {
    abbrev: string
    name: string
  },
  compliance?: {
    modelName: string
  }
  deviceType?: string
  shortnames: string[]
  sku: string
  sysid?: string
  sysids: string[]
  triplets: {
    k1?: string
    k2?: string
    k3?: string
  }[]
  uisp?: {
    bleServices: object
    firmware: {
      board: string[]
      platform: string | null
    }
    line: string
    nameLegacy: string[]
  }
  unifi?: {
    network?: {
      model: string
      details?: {
        ipsThroughput: string
      }
      numberOfPorts?: number
      radios?: {
        na?: {
          gain?: number,
          maxPower?: number,
          maxSpeedMegabitsPerSecond?: number
        }
        ng?: {
          gain?: number,
          maxPower?: number,
          maxSpeedMegabitsPerSecond?: number
        }
      }
    }
    power?: {
      capacity: number
    }
  },
  videos: object
}

