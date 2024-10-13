import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device } from './definitions'

export const enum ProductLine {
  UniFi = 'UniFi',
  UniFiLTE = 'UniFi LTE',
  UniFiProtect = 'UniFi Protect',
  UniFiAccess = 'UniFi Access',
  AirMax = 'airMax',
  EdgeMax = 'EdgeMax',
}

export type ViewMode = 'grid' | 'list'

export interface DevicesState {
  all: Device[]
  filters: ProductLine[]
  viewMode: ViewMode | null
}
const initialState: DevicesState = {
  all: [],
  filters: [],
  viewMode: null
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
    setAll: (state, action: PayloadAction<Device[]>) => {
      state.all = action.payload
    },
    setFilters: (state, action: PayloadAction<ProductLine[]>) => {
      state.filters = action.payload
    },
    filterDevices: (state, action: PayloadAction<string[]>) => {
      // todo: filter devices
      console.log(action.payload)
      return state
    },
  },
})

export const { setViewMode, setAll, setFilters, filterDevices } = devicesSlice.actions
export default devicesSlice.reducer