import React from "react";

import styles from "../styles/components/Home.module.scss";
import LandingNavbar from "./LandingNavbar";

const LandingSection = () => {
  return (
    <>
      <LandingNavbar/>

        <section className={styles.home}>
            <div className={styles.content}>
                    <div className={styles.headings}>
                        <h1 className={styles.lgHeading}>
                            Filip <span className={styles.textSecondary}>Bošnjak</span>
                        </h1>
                        <h2 className={styles.smHeading}>
                            Computer Science<span className={styles.textSecondary}> Master </span>

                        </h2>
                        <h2 className={styles.smHeading}>
                            <span className={styles.textSecondary}>FullStack </span>{" "}
                            Software Developer
                        </h2>
                    </div>
                <div className={styles.buttons}>
                        <div className={styles.left}>
                            <a href='#contact'>Contact Me</a>
                        </div>

                        <div className={styles.right}>
                            <a
                                href='/filip_bosnjak_resume.pdf'
                                download=''>
                                Download CV
                            </a>
                        </div>
                    <div className={styles.right}>
                        <a
                            href='/filip_bosnjak_masters.pdf'
                            download=''>
                            Master's Degree
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default LandingSection;