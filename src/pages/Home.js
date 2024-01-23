import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import FeatureCard from '../components/FeatureCard';
import thai from './../assets/1.svg';
import fast from './../assets/2.svg';
import imagetotext from './../assets/3.svg';
import texttobraille from './../assets/4.svg';
import easy from './../assets/5.svg';


const Home = () => {

    const features = [
        {
            title: "รองรับหนังสือภาษาไทย",
            description: "รองรับข้อความภาษาไทย",
            icon: thai
        },
        {
            title: "ประมวลผลได้อย่างรวดเร็วและแม่นยำ",
            description: "สามารถแปลงรูปภาพเป็นข้อความและแปลงข้อความเป็นภาษาเบรลล์ได้อย่างรวดเร็ว",
            icon: fast
        },
        {
            title: "แปลงรูปภาพเป็นข้อความ",
            description: "บริการแปลงรูปถ่ายเอกสารเป็นข้อความ",
            icon: imagetotext
        },
        {
            title: "แปลงข้อความเป็นภาษาเบรลล์",
            description: "บริการแปลงข้อความเป็นภาษาเบรลล์",
            icon: texttobraille
        },
        {
            title: "ใช้งานง่าย",
            description: "หน้าเว็บใช้งานง่ายและเข้าถึงได้จากทุกที่",
            icon: easy
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.homeContainer}>
                    <h1 className={styles.welcomeText}>OCR & Text to Braille</h1>
                    <p className={styles.descriptionText}>เว็บแอปพลิเคชันบริการแปลงรูปถ่ายเอกสารเป็นข้อความ (OCR) และบริการแปลงข้อความเป็นอักษรเบรลล์ (Braille)</p>
                </div>
                <div className={styles.heroButtons}>
                    <Link to="/ocr" className={styles.heroButton}>OCR</Link>
                    <Link to="/braille" className={styles.heroButton}>Braille</Link>
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
        </div>
    );
};

export default Home;
