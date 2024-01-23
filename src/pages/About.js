import React from 'react';
import styles from './About.module.css';
import ajvarin from '../assets/members/ajvarin.jpg'
import ajbenjamas from '../assets/members/ajbenjamas.jpg'
import ice from '../assets/members/ice.jpg'
import meen from '../assets/members/meen.jpg'
import fluke from '../assets/members/fluke.jpg'
// Import additional components or images as needed

const About = () => {
    return (
        <div className={styles.aboutContainer}>

            <section className={styles.teamSection}>
            <h1 className={styles.teamHeading}>Meet Our Team</h1>
                <div className={styles.teamMembers}>

                    {/* Professor 1 */}
                    <div className={`${styles.teamMember} ${styles.professor}`}>
                        <img src={ajvarin} alt="Team Member" className={styles.memberImage} />
                        <h3>รองศาสตราจารย์ ดร.วาริน เชาวทัต</h3>
                        <p>อาจารย์ที่ปรึกษาโครงการ</p>
                    </div>

                    {/* Professor 2 */}
                    <div className={`${styles.teamMember} ${styles.professor}`}>
                        <img src={ajbenjamas} alt="Team Member" className={styles.memberImage} />
                        <h3>ผู้ช่วยศาสตราจารย์ เบญจมาศ ปัญญางาม</h3>
                        <p>อาจารย์ที่ปรึกษาโครงการ</p>
                    </div>
                </div>
            </section>

            <section className={styles.teamSection}>
                <div className={styles.teamMembers}>
                    {/* Student 1 */}
                    <div className={`${styles.teamMember} ${styles.student}`}>
                        <img src={fluke} alt="Team Member" className={styles.memberImage} />
                        <h3>นายฐิติพงศ์ จันทวี</h3>
                        <p>นักศึกษาผู้ช่วยวิจัย</p>
                    </div>

                    {/* Student 2 */}
                    <div className={`${styles.teamMember} ${styles.student}`}>
                        <img src={ice} alt="Team Member" className={styles.memberImage} />
                        <h3>นายภานุพงษ์ เกี๋ยงคำ </h3>
                        <p>นักศึกษาผู้ช่วยวิจัย</p>
                    </div>

                    {/* Student 3 */}
                    <div className={`${styles.teamMember} ${styles.student}`}>
                        <img src={meen} alt="Team Member" className={styles.memberImage} />
                        <h3>นางสาวณัฐจิรา อุดสุข</h3>
                        <p>นักศึกษาผู้ช่วยวิจัย</p>
                    </div>
                </div>
            </section>

            <section className={styles.ctaSection}>
                <h2>Connect With Us</h2>
                <p>หากท่านสนใจอยากสร้างบริการอื่นๆที่เกี่ยวข้องกับ machine learning
                    สามารถติดต่อเราได้ตามแผนที่ด้านล่าง หรือกดปุ่มด้านล่างเพื่อติดต่อเรา และสามารถติดต่อได้ที่ Email : ds.sci.cmu@gmail.com</p>
                <div className={styles.socialMedia}>
                    <a
                        href="https://www.facebook.com/DataScienceCMU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialButton}
                    >
                        ติดต่อเรา
                    </a>
                    {/* Additional social media links or icons */}
                </div>
                <div className={styles.mapsAndSocial}>
                    {/* Embed a map or provide a link to your location */}
                    <div className={styles.map}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d445.61263655375006!2d98.95333930631445!3d18.80344838510773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3a69754ca1d1%3A0x9325c5a7a1d096dd!2sSCB4!5e0!3m2!1sth!2sth!4v1701972499260!5m2!1sth!2sth"
                            width="100% "     
                            height="450"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Our Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
