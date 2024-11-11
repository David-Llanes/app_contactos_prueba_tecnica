import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import RootLayout from '@/layouts/root'
import Contacts from '@/pages/contacts'
import NotFound from '@pages/not-found'
import contactsLoader from '@/routes/contacts-loader'
import ContactsLayout from './layouts/contacts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<ContactsLayout />}>
        <Route index element={<Contacts />} loader={contactsLoader} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
