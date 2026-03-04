import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  const router = useRouter(); 

  return (
    <>
      <div className={styles.container}>
        <div className="mainContainer">

          <div className="mainContainer_left">
            <p>Connect with Friends without Exaggeration</p>
            <p>A true Social Media platform, with stories no bluf!</p>

            <div onClick={() => {
              router.push("/login")
            }}className="buttonJoin">
              <p>Join Now</p>
            </div>
          </div>


          <div className="mainContainer_right">
            <img src="images/home.png" />
          </div>
        </div>
      </div>
    </>
  );
}
