import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Device {
  id: string
}

interface DevicesState {
  devices: Device[]
}

const initialState: DevicesState = {
  devices: []
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload
    },
    filterDevices: (state, action: PayloadAction<string[]>) => {
      // todo: filter devices
      console.log(action.payload)
      return state
    },
  }
})

export const { setDevices, filterDevices } = devicesSlice.actions

export default devicesSlice.reducer