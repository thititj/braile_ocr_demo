import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLogo}>Text-to-Braille</Link>
      <div className={styles.navMenu}>
        <Link to="/" className={styles.navItem}>Home</Link>
        <Link to="/about" className={styles.navItem}>About</Link>
        <Link to="/ocr" className={`${styles.navItem} ${styles.ocrButton}`}>OCR</Link>
        <Link to="/braille" className={`${styles.navItem} ${styles.brailleButton}`}>Braille</Link>
      </div>
    </nav>
  );
};

export default Navbar;
