import Link from "next/link";
import React , {useState, useEffect } from "react";

import styles from "../styles/components/Navbar.module.scss";
import {useRouter} from "next/router";


const LandingNavbar = () => {

    const router = useRouter()

    const [isSticky, setIsSticky] = useState("");
    const [isActive, setIsActive] = useState("");

    const scrollListener = () => {
        window.scrollY >= 20 ? setIsSticky(styles.stickyLanding): setIsSticky(" ");
    };

    const toggle = () => {
        isActive === "" ? setIsActive(styles.active) : setIsActive("");
    };

    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", scrollListener);
            let toggler = document.querySelector("#toggler");
            toggler?.addEventListener("click", toggle);
        }
        return () => {
            window.removeEventListener("scroll", scrollListener);
            if (document.querySelector("#toggler")) {
                let toggler = document.querySelector("#toggler");
                toggler?.removeEventListener("click", toggle);
            }
        };
    }, [isActive]);

  return (
      <div className={styles.container}>
          <nav className={`${styles.navbar} ${isSticky}`}>
              <div className={styles.togglerDiv}>
                  <button id='toggler' className={`${styles.menuToggler} ${isActive}`}>
                      <span></span>
                      <span></span>
                      <span></span>
                  </button>
                  <div className={`${styles.navbarMenu} ${isActive}`}>
                          <div className={styles.link} >
                              <a
                                  onClick={() => {
                                      scroll(0, 0);
                                      toggle();
                                      router.push('/')
                                  }}>
                                  Home
                              </a>
                          </div>
                          <div className={styles.link} >
                              <a onClick={toggle} href="/#about">About Me</a>
                          </div>
                          <div className={styles.link} onClick={() => {
                            router.push('/blog')
                          }
                          }  ><a>My Blog</a></div>
                          <div className={styles.link}>
                              <a onClick={() => {
                                toggle()
                                  router.push('/#skills')
                              }
                              }>Skills</a>
                          </div>
                          <div className={styles.link} >
                              <a onClick={() => {
                                  toggle()
                                  router.push('/#works')
                              }
                              }>My Work</a>
                          </div>
                          <div className={styles.link} >
                              <a onClick={() => {
                                  toggle()
                                  router.push('/#contact')
                              }
                              }>Contact Me</a>
                          </div>
                  </div>
              </div>
          </nav>
      </div>
  )
}

export default LandingNavbar;