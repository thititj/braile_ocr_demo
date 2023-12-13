import React from 'react';
import styles from './About.module.css';
// Import additional components or images as needed

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.teamSection}>
                <h2>Meet Our Team</h2>
                <div className={styles.teamMembers}>
                    {/* Replace with actual team member details */}
                    <div className={styles.teamMember}>
                        <img src="path_to_image" alt="Team Member" className={styles.memberImage} />
                        <h3>Member Name</h3>
                        <p>Expertise and Experience</p>
                    </div>
                    <div className={styles.teamMember}>
                        <img src="path_to_image" alt="Team Member" className={styles.memberImage} />
                        <h3>Member Name</h3>
                        <p>Expertise and Experience</p>
                    </div>
                    <div className={styles.teamMember}>
                        <img src="path_to_image" alt="Team Member" className={styles.memberImage} />
                        <h3>Member Name</h3>
                        <p>Expertise and Experience</p>
                    </div>
                    <div className={styles.teamMember}>
                        <img src="path_to_image" alt="Team Member" className={styles.memberImage} />
                        <h3>Member Name</h3>
                        <p>Expertise and Experience</p>
                    </div>
                    <div className={styles.teamMember}>
                        <img src="path_to_image" alt="Team Member" className={styles.memberImage} />
                        <h3>Member Name</h3>
                        <p>Expertise and Experience</p>
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
                            width="600"
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
