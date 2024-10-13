import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'
import './index.css'
import { DeviceDetails } from './routes/DeviceDetails'
import { Devices } from './routes/Devices'
import { Root } from './routes/Root'
import store from './store'

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
