import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './Navbar.module.css';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const renderMobileMenu = () => (
    <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/about" onClick={handleDrawerToggle}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to="/ocr" onClick={handleDrawerToggle}>
          <ListItemText primary="OCR" />
        </ListItem>
        <ListItem button component={Link} to="/braille" onClick={handleDrawerToggle}>
          <ListItemText primary="Braille" />
        </ListItem>
      </List>
    </Drawer>
  );

  const renderDesktopMenu = () => (
    <div className={styles.navMenu}>
      <div className={styles.navButtons}>
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        <Link to="/about" className={styles.navItem}>
          About
        </Link>
        <Link to="/ocr" className={`${styles.navItem} ${styles.ocrButton}`}>
          OCR
        </Link>
        <Link to="/braille" className={`${styles.navItem} ${styles.brailleButton}`}>
          Braille
        </Link>
      </div>
    </div>
  );

  return (
    <div className={styles.navbarContainer}>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Link to="/" className={styles.navLogo}>
            Text-to-Braille
          </Link>
          {isMobile ? null : renderDesktopMenu()}
        </Toolbar>
      </AppBar>

      {isMobile ? renderMobileMenu() : null}
    </div>
  );
};

export default Navbar;
