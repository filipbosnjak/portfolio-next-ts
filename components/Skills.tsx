import React from "react";
import styles from "../styles/components/Skills.module.scss";
import {
  SiSpringboot,
  SiTypescript,
  SiNextdotjs,
  SiTensorflow,
  SiKotlin,
  SiGraphql,
} from "react-icons/si";
import { FaBuffer, FaDatabase, FaPython } from "react-icons/fa";

const Skills = () => {
  return (
    <section className={`${styles.section}  ${styles.section2}`}>
      <div id="skills">
        <h1 className={[styles.sectionTitle, styles.title2].join(" ")}>
          My Skills
        </h1>
        <div className={styles.skills}>
          <div className={[styles.skill, styles.s1].join(" ")}>
            <SiSpringboot className={styles.icon} />
            <h4>Java & Spring Boot</h4>
          </div>

          <div className={[styles.skill, styles.s2].join(" ")}>
            <SiKotlin className={styles.icon} />
            <SiGraphql className={styles.icon} />
            <h4>Kotlin & GraphQL</h4>
          </div>

          <div className={[styles.skill, styles.s2].join(" ")}>
            <SiTypescript className={styles.icon} />
            <SiNextdotjs className={styles.icon} />
            <h4>Typescript & Next.js</h4>
          </div>

          <div className={[styles.skill, styles.s3].join(" ")}>
            <FaDatabase className={styles.icon} />
            <h4>Databases & Docker</h4>
          </div>

          <div className={[styles.skill, styles.s5].join(" ")}>
            <i className={`${styles.icon}`}>
              <FaBuffer />
            </i>
            <h4>Data Structures and Algorithms</h4>
          </div>
          <div className={[styles.skill, styles.s4].join(" ")}>
            <i className={`${styles.icon}`}>
              <FaPython />
              <SiTensorflow className={styles.icon} />
            </i>

            <h4>AI and Machine learning</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
