import UserLayout from '@/layout/UserLayout';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import styles from "./style.module.css";


function LoginComponent() {

  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  
  useEffect(() => {
    if(authState.loggedIn) {
      router.push("/dashboard")
    }
  })



  return (
    <UserLayout>
        <div className={styles.container}>
        <div className={styles.cardContainer}>
          
          <div className={styles.cardContainer_left}>

            <p className={styles.cardleft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>

            <div className={styles.inputContainer}>

              <div className={styles.inputRow}>
                <input className={styles.inputFeild} type='text' placeholder='Username' />
                <input className={styles.inputFeild} type='text' placeholder='Name' />
              </div>
              <input className={styles.inputFeild} type='text' placeholder='Email' />
              <input className={styles.inputFeild} type='password' placeholder='Password' />

              <div className={styles.buttonWithOutline}>
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            </div>

          </div>

          <div className={styles.cardContainer_right}>

          </div>

        </div>
        </div>
    </UserLayout>
  )
}

export default LoginComponent;