import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './ErrorPage.tsx'
import './index.css'
import { DeviceDetails } from './routes/DeviceDetails.tsx'
import { Devices } from './routes/Devices.tsx'
import { Root } from './routes/Root.tsx'
import store from './store.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Devices />,
      },
      {
        path: '/device',
        element: <DeviceDetails />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
