import React, {FormEvent, useState} from "react";
import styles from "../styles/components/Contact.module.scss";
import ErrorPopup from "@/components/notifications/ErrorPopup";
import {Message} from "@/types/types";

const Contact = () => {
    const [errorOpen, setErrorOpen] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [message, setMessage] = useState<Message>()
    const showError = (message: string) => {
        setErrorMessage(message)
        setErrorOpen(true)
    }
    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        await fetch('/api/sendemail', {
            method:'POST',
            body: JSON.stringify(message)
        })
    }
    return (
        <>
            <div style={{marginTop: "20px"}}>
                <ErrorPopup message={errorMessage} isOpen={errorOpen} setOpen={setErrorOpen}/>
            </div>
            <section className={`${styles.contact} ${styles.section}`}>
                <div id="contact">
                    <h1 className={`${styles.sectionTitle} ${styles.title5}`}>
                        Contact Me
                    </h1>
                    <div className={styles.contactInfo}>
                        <div className={styles.item}>
                            <i className='fas fa-mobile-alt'></i>
                            +385 91 546 6832
                        </div>

                        <div className={styles.item}>
                            <i className='fas fa-envelope'></i>
                            filipo.bosnjak@gmail.com
                        </div>

                        <div className={styles.item}>
                            <i className='fas fa-map-marker-alt'></i>
                            Zagreb, Croatia
                        </div>
                    </div>

                    <form action='#' className={styles.contactForm} onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className={styles.nameZone}
                            placeholder='Your Full Name'
                            onChange={(e) => {
                                let newMessage: Message  = {to: "filipo.bosnjak@gmail.com", ...message, senderName: e.target.value}
                                setMessage(newMessage)
                                }
                            }
                        />
                        <input
                            type='email'
                            className={styles.emailZone}
                            placeholder='Your Email'
                            onChange={(e) => {
                                let newMessage: Message  = {to: "filipo.bosnjak@gmail.com", ...message, from: e.target.value}
                                setMessage(newMessage)
                            }
                            }
                        />
                        <input
                            type='text'
                            className={styles.subjectZone}
                            placeholder='Subject'
                            onChange={(e) => {
                                let newMessage: Message  = {to: "filipo.bosnjak@gmail.com", ...message, subject: e.target.value}
                                setMessage(newMessage)
                            }
                            }
                        />
                        <textarea className={styles.messageZone} placeholder='Message' onChange={(e) => {
                            let newMessage: Message  = {to: "filipo.bosnjak@gmail.com", ...message, body: e.target.value}
                            setMessage(newMessage)
                        }
                        }/>
                        <input type='submit' value='Send Message' className={styles.btn1}/>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Contact;