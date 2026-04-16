import UserLayout from '@/layout/UserLayout';
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux'
import styles from "./style.module.css";
import { useDispatch } from 'react-redux';
import { registerUser, loginUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';
import Toast from '@/components/Toast';


function LoginComponent() {

  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ open: false, variant: "info", title: "", message: "" });
  const toastTimerRef = useRef(null);
  const authModeTimerRef = useRef(null);
  const previousLoadingRef = useRef(authState.isLoading);
  const previousLoggedInRef = useRef(authState.loggedIn);
  const authRequestTypeRef = useRef(null);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard")
    }
  }, [authState.loggedIn, router])

  useEffect(() => {
    dispatch(emptyMessage())
  }, [dispatch, userLoginMethod])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      if (authModeTimerRef.current) {
        clearTimeout(authModeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const showToast = (variant, title, message, duration = 2600) => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      setToast({ open: true, variant, title, message });

      if (duration > 0) {
        toastTimerRef.current = setTimeout(() => {
          setToast((currentToast) => ({ ...currentToast, open: false }));
        }, duration);
      }
    };

    const wasLoading = previousLoadingRef.current;
    const wasLoggedIn = previousLoggedInRef.current;
    const requestType = authRequestTypeRef.current;

    if (!wasLoading && authState.isLoading && requestType === "login") {
      showToast("info", "Signing you in", "Checking your credentials and opening your workspace.", 0);
    } else if (!wasLoading && authState.isLoading && requestType === "register") {
      showToast("info", "Creating your account", "Setting up your profile and saving your details.", 0);
    } else if (wasLoading && !authState.isLoading && authState.loggedIn && !wasLoggedIn && requestType === "login") {
      showToast("success", "Welcome back", "Login successful. Redirecting to your dashboard.");
      authRequestTypeRef.current = null;
    } else if (wasLoading && !authState.isLoading && authState.isSuccess && requestType === "register") {
      showToast("success", "Account created", "Your sign-up was successful. Please sign in to continue.");
      authModeTimerRef.current = setTimeout(() => {
        setPassword("");
        setUserLoginMethod(true);
      }, 900);
      authRequestTypeRef.current = null;
    } else if (wasLoading && !authState.isLoading && authState.isError && authState.message && requestType === "login") {
      showToast("error", "Login failed", authState.message);
      authRequestTypeRef.current = null;
    } else if (wasLoading && !authState.isLoading && authState.isError && authState.message && requestType === "register") {
      showToast("error", "Sign-up failed", authState.message);
      authRequestTypeRef.current = null;
    }

    previousLoadingRef.current = authState.isLoading;
    previousLoggedInRef.current = authState.loggedIn;
  }, [authState.isError, authState.isLoading, authState.isSuccess, authState.loggedIn, authState.message]);

  const handleRegister = () => {
    console.log("HarHari");
    authRequestTypeRef.current = "register";
    dispatch(registerUser({ username, name, email, password }))
  }

  const handleLogin = () => {
    console.log("Login Function is called");
    authRequestTypeRef.current = "login";
    dispatch(loginUser({ email, password }));
  }

  const handleAuthModeChange = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    if (authModeTimerRef.current) {
      clearTimeout(authModeTimerRef.current);
    }

    authRequestTypeRef.current = null;
    setToast((currentToast) => ({ ...currentToast, open: false }));
    setUserLoginMethod((currentValue) => !currentValue);
  }



  return (
    <UserLayout>
      <Toast
        open={toast.open}
        variant={toast.variant}
        title={toast.title}
        message={toast.message}
      />
      <div className={styles.container}>
        <div className={styles.cardContainer}>

          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>

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

            {userLoginMethod ? <p>Don&apos;t Have an Account?</p> : <p>Already Have an Account?</p>}
            <div onClick={handleAuthModeChange}
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
