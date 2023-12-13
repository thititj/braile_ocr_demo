import React from 'react';
import styles from './FeatureCard.Module.css';


export const FeatureCard = ({ feature }) => {
  return (
    <div className={styles.card}>
      <img src={feature.icon} alt={feature.title + " icon"} className={styles.featureIcon} />
      <h3 className={styles.cardTitle}>{feature.title}</h3>
      <p className={styles.cardDescription}>{feature.description}</p>
    </div>
  );
};
