import UserLayout from '@/layout/UserLayout';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import styles from "./style.module.css";
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';


function LoginComponent() {

  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard")
    }
  }, [authState.loggedIn])

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard")
    }
  }, [])

  useEffect(() => {
    dispatch(emptyMessage())
  }, [userLoginMethod])

  const handleRegister = () => {
    console.log("HarHari");
    dispatch(registerUser({ username, name, email, password }))
  }

  const handleLogin = () => {
    console.log("Login Function is called");
    dispatch(loginUser({ email, password }));
  }



  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>

          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
            <p style={{ color: authState.isError ? "red" : "green" }}>{authState.message}</p>

            <div className={styles.inputContainer}>

              {!userLoginMethod && <div className={styles.inputRow}>
                <input onChange={(e) => setUserName(e.target.value)} className={styles.inputFeild} type='text' placeholder='Username' />
                <input onChange={(e) => setName(e.target.value)} className={styles.inputFeild} type='text' placeholder='Name' />
              </div>}

              <input onChange={(e) => setEmailAddress(e.target.value)} className={styles.inputFeild} type='text' placeholder='Email' />
              <input onChange={(e) => setPassword(e.target.value)} className={styles.inputFeild} type='password' placeholder='Password' />

              <div onClick={() => {
                if (userLoginMethod) {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }}
                className={styles.buttonWithOutline}>
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>
            </div>

          </div>

          <div className={styles.cardContainer_right}>

            {userLoginMethod ? <p>Don't Have an Account?</p> : <p>Already Have an Account?</p>}
            <div onClick={() => {
              setUserLoginMethod(!userLoginMethod)
            }}
              style={{ color: "black", backgroundColor: "white", textAlign: "center", marginTop: "0.8rem" }}
              className={styles.buttonWithOutline}>
              <p>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
            </div>
          </div>

        </div>
      </div>
    </UserLayout>
  )
}

export default LoginComponent;