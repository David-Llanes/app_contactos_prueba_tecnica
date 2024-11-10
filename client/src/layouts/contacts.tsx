import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

import { Outlet } from 'react-router-dom'

function ContactsLayout() {
  return (
    <div className="grid grid-rows-[auto,1fr,auto] h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ContactsLayout
