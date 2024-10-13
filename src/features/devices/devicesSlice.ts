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

export interface DevicesState {
  all: Device[]
  filters: ProductLine[]
}
const initialState: DevicesState = {
  all: [],
  filters: [],
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
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

export const { setAll, setFilters, filterDevices } = devicesSlice.actions
export default devicesSlice.reducer