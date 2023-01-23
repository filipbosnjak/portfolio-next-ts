import React from "react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import portrait from "../images/portrait.jpg";

const About = () => {
  return (
      <section className={styles.section}>
          <div id='about' className={styles.about}>
              <h1 className={styles.sectionTitle}>About Me</h1>
              <div className={styles.aboutContent}>
                      <div className={styles.aboutPic}>
                          <Image
                              src={portrait}
                              alt='Filip Bošnjak'
                              className={styles.aboutPic}
                          />
                      </div>

                  <div className={styles.aboutText}>
                      <h2>
                          Hello. I'm <div className={styles.name}>Filip Bošnjak.</div>
                      </h2>
                      <p>
                          I'm am experienced fullstack developer with passion for web application
                          development and for backend programming. <br/>I love
                          everything that has to do with new tech and is a good challenge.
                          <br/>I'm a master of physics and computer science at{" "}
                          <a href='http://www.pmf.unizg.hr/phy/en' target="_blank">
                              Department of Physics, Faculty of Science, University of Zagreb{" "}
                          </a>
                          (
                          <a href='http://www.pmf.unizg.hr/phy/en/nastava/predmeti/prof_fizike_i_informatike' target="_blank">
                              Physics and Computer Science Education
                          </a>
                          ). <br/>
                          I aspire towards a career that will satisfy my curiosity and my
                          hunger for learning new things.
                      </p>
                      <p style={{ margin: 10 + "px" + 0 }}>
                          In my free time when I'm not coding I bike, play cello and read.
                      </p>

                      <h3>
                          <span>Programmer</span>
                          <span>Software Developer</span>
                          <span>Coding Enthusiast</span>
                      </h3>
                  </div>
              </div>
          </div>
      </section>
  )
}

export default About;