import React, { use } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";

export default function NavbarComponent() {
  const router = useRouter();

  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>

        <h3 className={styles.logo} onClick={() => {
          router.push('/')
        }}>ProConnect</h3>

        <div className={styles.navBarOptionContainer}>

          {authState.profileFetched && <div>
            <div className={styles.userInfoContainer}>
              <p className={styles.greeting}>Hey, {authState.user.userId.name}</p>
              <p className={styles.navLink} onClick={() => {
                router.push('/profile');
              }}>Profile</p>
              <p className={styles.navLink} onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
                dispatch(reset());
              }}>LogOut</p>
            </div>
          </div>}



          {!authState.profileFetched && <div onClick={() => {
            router.push('/login')
          }} className={styles.buttonJoin}>
            <p>Be a part</p>
          </div>}


        </div>

      </nav>

    </div>
  );
}

