import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

export default function NavbarComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>

        <h3 onClick={() => {
          router.push('/')
        }} style={{cursor: "pointer"}}>ProConnect</h3>

        <div className="navBarOptionContainer">

          <div onClick={() => {
            router.push('/login')
          }} className={styles.buttonJoin}>
            <p>Be a part</p>
          </div>
        </div>

      </nav>

    </div>
  );
}

