// FeatureCard.js

import React from 'react';
import styles from './FeatureCard.module.css';

const FeatureCard = ({ feature }) => {
  return (
    <div className={styles.card}  style={{ width: '400px'}}>
      <img src={feature.icon} alt={feature.title + " icon"} style={{ width: '200px'}} className={styles.featureIcon} />

      <h3 className={styles.cardTitle}>{feature.title}</h3>
      <p className={styles.cardDescription}>{feature.description}</p>
    </div>
  );
};

export default FeatureCard;  // export as default
