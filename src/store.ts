import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { devicesApi } from './features/devices/devicesApi'
import devicesReducer from './features/devices/devicesSlice'

export const store = configureStore({
  reducer: {
    [devicesApi.reducerPath]: devicesApi.reducer,
    devices: devicesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(devicesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch