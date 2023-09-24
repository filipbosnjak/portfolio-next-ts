import React from "react";
import styles from "../styles/components/Works.module.scss";
import Image from "next/image";
import chatApp from "../images/works/chatApp.png";
import gameoflife from "../images/works/gameoflife.png";
import kotlingraphqlapi from "../images/works/kotlingraphqlapi.png";
import apachekafkanodejs from "../images/works/apachekafkanodejs.png"
import kotlinds from "../images/works/kotlinds.png"
import javagmailreader from "../images/works/javagmailreader.png"
import springsecurityjwt from "../images/works/springsecurityjwt.png"
import electronwappbot from "../images/works/electronwhatsappbot.png"
import crudhilla from "../images/works/crudhilla.png"


const Works = () => {
  return (
      <section className={`${styles.works} ${styles.light} ${styles.section}`}>
          <div id="works">
              <h1 className={`${styles.sectionTitle} ${styles.title4}`}>My Work</h1>
              <h2 className={styles.subtitle}>For more backend projects checkout my <a target="_blank" href="https://github.com/filipbosnjak" className={styles.github}>Github.</a></h2>
              <div className={styles.works}>
                  <a
                      href='https://game-of-life-nextjs-ts.vercel.app/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={gameoflife}
                          alt='gameoflife'
                          className={styles.aboutPic}
                      />
                      <div className={styles.info}>
                          <h3>Game of life</h3>
                          <div className={styles.cat}>Nextjs | Typescript</div>
                      </div>
                  </a>
                  <a
                      href='https://spring-boot-react-hilla-production.up.railway.app/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={crudhilla}
                          alt='crudhilla'
                          className={styles.aboutPic}
                      />
                      <div className={styles.info}>
                          <h3>Simple CRUD App</h3>
                          <div className={styles.cat}>React | Spring Boot | Hilla</div>
                      </div>
                  </a>
                  <a
                      href='https://github.com/filipbosnjak/kotlin-graphql-api'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={kotlingraphqlapi}
                          alt='kotlingraphqlapi'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Kotlin/GraphQL API Starter</h3>
                          <div className={styles.cat}>Kotlin, GraphQL (DGS - Netflix)</div>
                      </div>
                  </a>
                  <a
                      href='https://github.com/filipbosnjak/wapp-bot1'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={electronwappbot}
                          alt='electronwappbot'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Whatsapp Bot with Electron</h3>
                          <div className={styles.cat}>Electron, Vite, Typescript</div>
                      </div>
                  </a>
                  <a
                      href='https://github.com/filipbosnjak/apache-kafka-typescript-node'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={apachekafkanodejs}
                          alt='apachekafkanodejs'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Apache Kafka & Nodejs Integration</h3>
                          <div className={styles.cat}>Apache Kafka, Nodejs, Typescript</div>
                      </div>
                  </a>
                  <a
                      href='https://github.com/filipbosnjak/kotlin-data-structures'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={kotlinds}
                          alt='kotlinds'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Data Structures & Algorithms in Kotlin</h3>
                          <div className={styles.cat}>Kotlin</div>
                      </div>
                  </a>
                  <a
                      href='https://github.com/filipbosnjak/java-gmail-reader'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={javagmailreader}
                          alt='javagmailreader'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Gmail Reader in Java</h3>
                          <div className={styles.cat}>Java, Google Gmail API</div>
                      </div>
                  </a>
                  <a
                      href='https://github.com/filipbosnjak/spring-security-jwt'
                      className={styles.work}
                      target='_blank'>
                      <Image
                          src={springsecurityjwt}
                          alt='springsecurityjwt'
                          className={styles.aboutPic}
                      />{" "}
                      <div className={styles.info}>
                          <h3>Spring Security & JWT</h3>
                          <div className={styles.cat}>Java, Spring Security, JWT</div>
                      </div>
                  </a>
                  <a
                      href='http://dominis.phy.hr/~fbosnjak/ChatApp/'
                      target='_blank'
                      className={styles.work}>
                      <Image
                          src={chatApp}
                          alt='chatApp'
                          className={styles.aboutPic}
                      />
                      <div className={styles.info}>
                          <h3>Realtime Chat App</h3>
                          <div className={styles.cat}>Reactjs | Firebase & Redux</div>
                      </div>
                  </a>

                  {/*<div style={{color: "white"}}>Some legacy fronted mini projects :)</div><br/>
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
*/}
              </div>
          </div>
      </section>
  )
}

export default Works;