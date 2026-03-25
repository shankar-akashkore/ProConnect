// import FooterComponent from '@/components/FooterComponent';
// import NavbarComponent from '@/components/NavbarComponent';
// import React from 'react'

// function UserLayout({ children }) {
//   return (
//     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <NavbarComponent />
//         <div style={{ flex: 1 }}>{children}</div>
//       <FooterComponent />
//     </div>
//   )
// }

// export default UserLayout;




import FooterComponent from '@/components/FooterComponent';
import NavbarComponent from '@/components/NavbarComponent';
import React from 'react'

function UserLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* <NavbarComponent /> */}
        <div style={{ flex: 1, paddingTop: '72px' }}>{children}</div>
      {/* <FooterComponent /> */}
    </div>
  )
}

export default UserLayout;