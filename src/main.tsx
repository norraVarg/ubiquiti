import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import { DeviceDetailsRoute } from './routes/device-details-route'
import { Root } from './routes/root'
import { DevicesRoute } from './routes/devices-route'
import { ModalProvider } from './components/ModalProvider/ModalProvider'
import { store } from './store'
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage'
import { DemosRoute } from './routes/demos-route'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorMessage />,
    children: [
      {
        path: '/',
        element: <DevicesRoute />,
      },
      {
        path: '/devices/:id',
        element: <DeviceDetailsRoute />,
      },
      {
        path: '/devices',
        element: <Navigate to="/" replace />,
      },
      {
        path: '/demos',
        element: <DemosRoute />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </Provider>
  </StrictMode>,
)
