import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { FeatureCard } from '../components/FeatureCard';
{ /*import fastIcon from "../assets/fast.svg";*/}


const Home = () => {

    const features = [
        {
            title: "Support for Thai Languages",
            description: "Efficiently handles Thai script for accurate conversions.",
            icon: "path/to/accuracy-icon.svg"
        },
        {
            title: "High Accuracy and Fast Processing",
            description: "Quickly converts images to text with high precision.",
            icon: "path/to/accuracy-icon.svg" 
        },
        {
            title: "Convert Image to Text",
            description: "Seamlessly convert images into editable text.",
            icon: "path/to/accuracy-icon.svg" 
        },
        {
            title: "Convert Text to Braille",
            description: "Easily translate text into Braille for accessibility.",
            icon: "path/to/accuracy-icon.svg"
        },
        {
            title: "Easy to Use",
            description: "User-friendly interface for hassle-free navigation.",
            icon: "path/to/accuracy-icon.svg"
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.homeContainer}>
                    <h1 className={styles.welcomeText}>Welcome to Image-to-Text and Text-to-Braille Converter</h1>
                    <p className={styles.descriptionText}>This is a tool that helps you convert images to text and text to Braille.</p>
                </div>
                <div className={styles.heroButtons}>
                    <Link to="/ocr" className={styles.heroButton}>OCR Service</Link>
                    <Link to="/braille" className={styles.heroButton}>Braille Conversion</Link>
                </div>
            </section>

            {/* Key Features Section */}
            <section className={styles.keyFeatures}>
                <h2>Key Features</h2>
                <div className={styles.featureCards}>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} />
                    ))}
                </div>
            </section>

            {/* Sponsors Section */}
            <section className={styles.sponsors}>
                <h2>Our Sponsors</h2>
                {/* Add sponsor logos or names here */}
            </section>
        </div>
    );
};

export default Home;
