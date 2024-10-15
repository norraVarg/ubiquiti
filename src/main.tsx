import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './error-page'
import './index.css'
import store from './store'
import { DeviceDetailsPage } from './routes/device-details'
import { Root } from './routes/root'
import { Devices } from './routes/devices'
import { ModalProvider } from './components/Modal/ModalProvider'

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
        element: <DeviceDetailsPage />,
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
