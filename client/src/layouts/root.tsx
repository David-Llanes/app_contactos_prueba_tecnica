import { Outlet } from 'react-router-dom'
import { DevTools } from '@/components/dev'

export default function RootLayout() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Outlet />
      <DevTools />
    </div>
  )
}
