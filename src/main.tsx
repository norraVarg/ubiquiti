import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorPage } from './error-page'
import './index.css'
import store from './store'
import { DeviceDetailsRoute } from './routes/device-details-route'
import { Root } from './routes/root'
import { DevicesRoute } from './routes/devices-route'
import { ModalProvider } from './components/Modal/ModalProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <DevicesRoute />,
      },
      {
        path: '/device',
        element: <DeviceDetailsRoute />,
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
