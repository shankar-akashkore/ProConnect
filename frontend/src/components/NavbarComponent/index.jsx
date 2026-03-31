import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";

export default function NavbarComponent() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleNavigate = (path) => {
    setIsMobileMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsMobileMenuOpen(false);
    router.push("/login");
    dispatch(reset());
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h3 className={styles.logo} onClick={() => {
          handleNavigate("/");
        }}>ProConnect</h3>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>

        <div
          className={`${styles.navBarOptionContainer} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
        >

          {authState.profileFetched && <div>
            <div className={styles.userInfoContainer}>
              <p className={styles.greeting}>Hey, {authState.user.userId.name}</p>
              <p className={styles.navLink} onClick={() => {
                handleNavigate("/profile");
              }}>Profile</p>
              <p className={styles.navLink} onClick={() => {
                handleLogout();
              }}>LogOut</p>
            </div>
          </div>}



          {!authState.profileFetched && <div onClick={() => {
            handleNavigate("/login");
          }} className={styles.buttonJoin}>
            <p>Be a part</p>
          </div>}


        </div>

      </nav>

    </div>
  );
}
