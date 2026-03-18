import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";


// import styles from './FooterComponent.module.css';



export default function FooterComponent() {
  return (
    <footer className={styles.footer}>

      {/* ── Top grid: categories + link columns ── */}
      <div className={styles.top}>

        {/* Left — large category links */}
        <ul className={styles.categories}>
          {['Connect', 'Grow', 'Hire', 'Learn'].map((item) => (
            <li key={item} className={styles.catItem}>
              <a href="#" className={styles.catLink}>{item}</a>
            </li>
          ))}
        </ul>

        {/* Company */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Company</h4>
          <ul className={styles.linkList}>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press & Media</a></li>
          </ul>
        </div>

        {/* Community */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Community</h4>
          <ul className={styles.linkList}>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Developer API</a></li>
          </ul>
        </div>

        {/* Account */}
        <div className={styles.linkCol}>
          <h4 className={styles.colHeading}>Account</h4>
          <ul className={styles.linkList}>
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Create Profile</a></li>
            <li><a href="#">Premium Plans</a></li>
          </ul>
        </div>
      </div>

      {/* ── Social icons + legal bar ── */}
      <div className={styles.bar}>
        <div className={styles.socials}>

          {/* LinkedIn */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className={styles.socialBtn} aria-label="LinkedIn">
            <svg className={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className={styles.socialBtn} aria-label="Instagram">
            <svg className={styles.socialIcon} viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>

          {/* TikTok */}

          {/* YouTube */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
             className={styles.socialBtn} aria-label="YouTube">
            <svg className={styles.socialIcon} viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" stroke="none"/>
            </svg>
          </a>
        </div>

        <div className={styles.legalLinks}>
          <a href="#">Press Inquiries</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>

      {/* ── Giant brand word ── */}
      <div className={styles.bigWord}>
        <span className={styles.bigWordText}>PROCONNECT.</span>
        <div className={styles.cursor} aria-hidden="true" />
      </div>

    </footer>
  );
}