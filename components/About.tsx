import React from "react";
import styles from "../styles/components/About.module.scss";
import Image from "next/image";
import portrait from "../images/portrait.jpg";

const About = () => {
  return (
    <section className={styles.section}>
      <div id="about" className={styles.about}>
        <h1 className={styles.sectionTitle}>About Me</h1>
        <div className={styles.aboutContent}>
          <div className={styles.aboutPic}>
            <Image
              src={portrait}
              alt="Filip Bošnjak"
              className={styles.aboutPic}
            />
          </div>

          <div className={styles.aboutText}>
            <p>
              Senior Software Consultant (freelance) specializing in enterprise-grade
              solutions and helping businesses achieve their goals.</p> <p>With a
              proven track record of delivering high-quality software solutions.
            </p>

            <ul className={styles.expertiseList} style={{ paddingLeft: "20px", paddingTop: "10px", paddingBottom: "10px", }}>
              <li>
                <strong>Enterprise Expertise:</strong> 5+ years of professional
                experience building scalable backend systems and full-stack
                applications
              </li>
              <li>
                <strong>Technical Leadership:</strong> Proven track record in
                Java/Spring Boot, Kotlin/GraphQL, and modern web technologies
              </li>
              <li>
                <strong>Innovation Focus:</strong> Passionate about AI/ML
                applications and emerging technologies in software development
              </li>
                <li>
                    <strong>Advanced Education:</strong> Master's degree in Physics
                    and Computer Science from{" "}
                    <a href="http://www.pmf.unizg.hr/phy/en" target="_blank">
                        University of Zagreb
                    </a>
                </li>
            </ul>

            <h3>
              <span>Senior Consultant</span>
              <span>Technical Leader</span>
              <span>Solution Architect</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
