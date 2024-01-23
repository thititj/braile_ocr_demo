import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.footerLink}>Home</Link>
          <Link to="/about" className={styles.footerLink}>About</Link>
          <Link to="/ocr" className={styles.footerLink}>OCR</Link>
          <Link to="/braille" className={styles.footerLink}>Braille</Link>
        </div>
        <div className={styles.contactInfo}>
          <span>Email: ds.sci.cmu@gmail.com</span>
          {/* Add social media icons here */}
        </div>
        <div className={styles.copyRight}>
          © 2023 Chiang Mai University
        </div>
      </div>
    </footer>
  );
};

export default Footer;
