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
                            <span className={styles.textSecondary}>Computer Science </span>
                            Master
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
                                href='/resume.pdf'
                                download=''>
                                Download CV
                            </a>
                        </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default LandingSection;