import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, DevicesState, ProductLine, ViewMode } from './definitions'

const initialState: DevicesState = {
  all: [],
  filteredDevices: [],
  filters: [],
  viewMode: null
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    fetchDevicesSuccess: (state, action: PayloadAction<Device[]>) => {
      state.all = action.payload
      state.filteredDevices = action.payload
    },
    setFilters: (state, action: PayloadAction<ProductLine[]>) => {
      state.filters = action.payload
      state.filteredDevices = action.payload.length > 0 ?
        state.all.filter((device) => state.filters.includes(device.line.name as ProductLine)) :
        state.all
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
    },
  },
})

export const { fetchDevicesSuccess, setFilters, setViewMode } = devicesSlice.actions
export default devicesSlice.reducer