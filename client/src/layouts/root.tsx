import { Outlet } from 'react-router-dom'
import { DevTools } from '@/components/dev'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Outlet />
      <DevTools />
      <Toaster />
    </div>
  )
}
