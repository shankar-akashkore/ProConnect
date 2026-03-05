import NavbarComponent from '@/components/NavbarComponent';
import React from 'react'

function UserLayout({ children }) {
  return (
    <div>
      <NavbarComponent />
        {children}
    </div>
  )
}

export default UserLayout;