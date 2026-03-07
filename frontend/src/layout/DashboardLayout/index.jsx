import React, { Children } from 'react'
import styles from "./index.module.css";


function DashboardLayout({ children}) {
  return (
    <div>

<div className="container">
        <div className={styles.homeContainer}>

          <div className="homeContainer_left">

          </div>

          <div className="feedContainer">
            {children}
        </div>

        <div className="extraContainer">
          
        </div>

        </div>

        

      </div>



    </div>
  )
}

export default DashboardLayout