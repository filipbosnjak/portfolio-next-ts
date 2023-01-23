import React from "react";
import styles from "../styles/Home.module.scss";
import {SiJava, SiSpringboot, SiTypescript, SiNextdotjs, SiTensorflow, SiKotlin, SiGraphql} from "react-icons/si";
import { FaBuffer, FaDocker, FaDatabase, FaPython} from "react-icons/fa";
import {DiJavascript} from "react-icons/di"
import {FiAirplay} from "react-icons/fi"

const Skills = () => {
  return (
      <section className={`${styles.section}  ${styles.section2}`}>
          <div id="skills">
              <h1 className={[styles.sectionTitle, styles.title2].join(" ")}>
                  My Skills
              </h1>
              <div className={styles.skills}>
                  <div className={[styles.skill, styles.s1].join(" ")}>
                      <SiJava className={styles.icon}/>
                      <SiSpringboot className={styles.icon}/>
                      <h4>Java & Spring Boot</h4>
                      <p>
                          In over 3 years of my professional Java experience and
                          3 years working on university projects, I've had a chance to work on a huge
                          enterprise projects and also on smaller personal projects.
                      </p>
                  </div>

                  <div className={[styles.skill, styles.s2].join(" ")}>
                      <SiKotlin className={styles.icon}/>
                      <SiGraphql className={styles.icon}/>
                      <h4>Kotlin & GraphQL</h4>
                      <p>
                          After Java I got interested in Kotlin and loved it. In my (1 year)
                          professional experience I used it mostly for GraphQL (& REST) APIs.
                          I used GraphQL with Kotlin integrated via DGS framework (developed by Netflix).
                          It was fun and interesting experience.
                      </p>
                  </div>

                  <div className={[styles.skill, styles.s2].join(" ")}>
                      <SiTypescript className={styles.icon}/>
                      <SiNextdotjs className={styles.icon}/>
                      <h4>Typescript & Next.js</h4>
                      <p>
                          In my free time I was extensively using Typescript with
                          Next.js for frontend and backend of the project. Significant
                          percentage of my hobby projects were built with these technologies.
                      </p>
                  </div>

                  <div className={[styles.skill, styles.s3].join(" ")}>
                          <FaDatabase className={styles.icon}/>
                      <h4>Databases & Docker</h4>
                      <p>
                          While building backend APIs, I was extensively using PostgreSQL databases
                          and docker. I used Docker on the basic level, just to get me to where I
                          was going. I would love to learn and use it on a higher level.
                      </p>
                  </div>

                  <div className={[styles.skill, styles.s5].join(" ")}>
                      <i className={`${styles.icon}`}>
                          <FaBuffer/>
                      </i>
                      <h4>Data Structures and Algorithms</h4>
                      <p>
                          On the university course that was all about data structures and
                          algorithms I learned how to implement a lot of different
                          algorithms (sorting, hashing, searching) and also a lot of
                          different data structures. We built everything i C language.
                      </p>
                  </div>
                  <div className={[styles.skill, styles.s4].join(" ")}>
                      <i className={`${styles.icon}`}>
                          <FaPython/>
                          <SiTensorflow className={styles.icon} />
                      </i>

                      <h4>AI and Machine learning</h4>
                      <p>
                          After mastering Python at university I got interested in deep
                          learning, neural networks and AI. My masters thesis is about
                          using convolutional neural networks for classification of
                          galaxies.{" "}
                      </p>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default Skills;