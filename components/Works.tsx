import React from "react";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import chatApp from "../images/works/chatApp.png";
import movieApp from "../images/works/movieApp.png";
import multistepform from "../images/works/multistepform.png";
import parallax from "../images/works/parallax.png";
import pizzaApp from "../images/works/pizzaApp.png";
import reactNavbar from "../images/works/reactNavbar.png";
import sassLogin from "../images/works/sassLogin.png";
import sassLogin1 from "../images/works/sassLogin1.png";
import sassPortfolio from "../images/works/sassPortfolio.png";
import searchBar from "../images/works/searchBar.png";
import snakeGame from "../images/works/snakeGame.png";
import todoApp from "../images/works/todoApp.png";
import todoAppReactRedux from "../images/works/todoAppReactRedux.png";
import weatherApp from "../images/works/weatherApp.png";

const Works = () => {
  return (
      <section className={`${styles.works} ${styles.light} ${styles.section}`}>
          <div id="works">
              <h1 className={`${styles.sectionTitle} ${styles.title4}`}>My Work</h1>
              <div className={styles.works}>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/weather-app/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={weatherApp}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />
                      <div className={styles.info}>
                          <h3>Weather App</h3>
                          <div className={styles.cat}>Reactjs | Redux</div>
                      </div>
                  </a>

                  <a
                      href='http://dominis.phy.hr/~fbosnjak/ChatApp/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={chatApp}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />
                      <div className={styles.info}>
                          <h3>Realtime Chat App</h3>
                          <div className={styles.cat}>Reactjs | Firebase & Redux</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/PizzaApp/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={pizzaApp}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />
                      <div className={styles.info}>
                          <h3>Pizza App</h3>
                          <div className={styles.cat}>Reactjs | Redux & Framer Motion</div>
                      </div>
                  </a>

                  <a
                      href='http://dominis.phy.hr/~fbosnjak/TodoApp_Redux/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={todoAppReactRedux}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>To-do App</h3>
                          <div className={styles.cat}>Reactjs | Redux</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/movieAppReact/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={movieApp}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Movie Search App</h3>
                          <div className={styles.cat}>React.js</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/TodoApp_React.js/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={todoApp}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>To-do App</h3>
                          <div className={styles.cat}>React.js</div>
                      </div>
                  </a>

                  <a
                      href='http://dominis.phy.hr/~fbosnjak/React.js-MultiStepForm/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={multistepform}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Multi Step Form</h3>
                          <div className={styles.cat}>React.js</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/React%20Navbar/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={reactNavbar}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Navigation Menu</h3>
                          <div className={styles.cat}>React.js</div>
                      </div>
                  </a>

                  <a
                      href='http://dominis.phy.hr/~fbosnjak/Snake/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={snakeGame}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Snake Game</h3>
                          <div className={styles.cat}>JavaScript</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/movieApp/idx.html'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={movieApp}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Movie App</h3>
                          <div className={styles.cat}>Javascript</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/SassPortfolio/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={sassPortfolio}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Business Portfolio (Responsive)</h3>
                          <div className={styles.cat}>HTML5,Sass</div>
                      </div>
                  </a>

                  <a
                      href='http://dominis.phy.hr/~fbosnjak/LoignForm_Sass/'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={sassLogin}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Login Form</h3>
                          <div className={styles.cat}>HTML5, Sass</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/Animated%20Search%20Bar/'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={searchBar}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Animated Search Bar</h3>
                          <div className={styles.cat}>HTML5, Sass</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/LoginFormAnimatedSass/'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={sassLogin1}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Login Form 2</h3>
                          <div className={styles.cat}>HTML5, Sass</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/Parallax%20Landing%20Page%20-%20Rellax.js/'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={parallax}
                          alt='Filip Bošnjak'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Simple Landing Page</h3>
                          <div className={styles.cat}>HTML5, CSS3, Parallax.js</div>
                      </div>
                  </a>
              </div>
          </div>
      </section>
  )
}

export default Works;