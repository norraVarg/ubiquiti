// todo: use zod to validate the data
export interface DeviceIcon {
  id: string
  resolutions: number[][]
}

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
    bleServices: {}
    firmware: {
      board: string[]
      platform: string | null
    }
    line: string
    nameLegacy: string[]
  }
  videos: {}
}

