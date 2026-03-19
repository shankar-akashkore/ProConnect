import Head from "next/head";
import { useRouter } from "next/router";
import UserLayout from "@/layout/UserLayout";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const FULL_TEXT = "Connect with Friends\nwithout Exaggeration";

export default function Home() {
  const router = useRouter();
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [cursorDone, setCursorDone] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let cancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    async function run() {
      await delay(500);

      for (let i = 0; i < FULL_TEXT.length; i++) {
        if (cancelled) return;
        setTyped(FULL_TEXT.slice(0, i + 1));
        await delay(i < 10 ? 80 : 38 + Math.random() * 30);
      }

      if (cancelled) return;

      // Typing done — now reveal everything
      setCursorDone(true);
      await delay(300);
      setShowBrand(true);
      await delay(200);
      setShowSub(true);
      await delay(150);
      setShowActions(true);
    }

    run();
    return () => { cancelled = true; };
  }, []);

  // Blinking cursor — stops once typing is done
  useEffect(() => {
    if (cursorDone) return;
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, [cursorDone]);

  const lines = typed.split("\n");

  return (
    <UserLayout>
      <Head>
        <title>ProConnect – Connect without Exaggeration</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.hero}>

          {/* Brand badge — appears after typing */}
          <div className={`${styles.brand} ${showBrand ? styles.show : ""}`}>
            <span className={styles.brandDot} />
            ProConnect
          </div>

          {/* Typewriter headline */}
          <h1 className={styles.headline}>
            {lines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < lines.length - 1 && <br />}
              </span>
            ))}
            <span
              className={styles.cursor}
              style={{ opacity: cursorDone ? 0 : showCursor ? 1 : 0 }}
            />
          </h1>

          {/* Subtitle — appears after typing */}
          <p className={`${styles.subtitle} ${showSub ? styles.show : ""}`}>
            A true Social Media platform, with stories no bluf!
          </p>

          {/* Actions — appears after typing */}
          <div className={`${styles.actions} ${showActions ? styles.show : ""}`}>
            <button
              className={styles.btnPrimary}
              onClick={() => router.push("/login")}
            >
              Join Now →
            </button>
            <button className={styles.btnSecondary}>
              Learn more
            </button>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}