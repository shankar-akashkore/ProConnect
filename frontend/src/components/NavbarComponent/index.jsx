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

        <h3 onClick={() => {
          router.push('/')
        }} style={{cursor: "pointer"}}>ProConnect</h3>

        <div className="navBarOptionContainer">

          {authState.profileFetched && <div>
            <div style={{display: "flex", gap: "1.2rem"}}>
              <p>Hey, {authState.user.userId.name}</p>
              <p style={{fontWeight: "bold", cursor: "pointer"}}>Profile</p>
              <p onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
                dispatch(reset());
              }} style={{fontWeight: "bold", cursor: "pointer"}}>LogOut</p>
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

