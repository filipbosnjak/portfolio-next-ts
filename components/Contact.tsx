import React, {FormEvent, useState} from "react";
import styles from "../styles/components/Contact.module.scss";

const Contact = () => {

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [text, setText] = useState<string>("");
    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log(fullName, email, subject, text)
/*        const messageObject = {
            fromName: e.target,
            from: e.target[1].value,
            subject: e.target[2].value,
            message: e.target[3].value
        }
        await fetch('/api/mail', {
            method:'POST',
            body: JSON.stringify(messageObject)
        })*/
    }
    return (
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

                <form action='#' className={styles.contactForm} onSubmit={handleSubmit} >
                    <input
                        type='text'
                        className={styles.nameZone}
                        placeholder='Your Full Name'
                        onChange={(e) => {
                        setFullName(e.target.value)}
                        }
                    />
                    <input
                        type='email'
                        className={styles.emailZone}
                        placeholder='Your Email'
                        onChange={(e) => {
                            setEmail(e.target.value)}
                        }
                    />
                    <input
                        type='text'
                        className={styles.subjectZone}
                        placeholder='Subject'
                        onChange={(e) => {
                            setSubject(e.target.value)}
                        }
                    />
                    <textarea className={styles.messageZone} placeholder='Message' onChange={(e) => {
                        setText(e.target.value)}
                    }/>
                    <input type='submit' value='Send Message' className={styles.btn1} />
                </form>
            </div>
        </section>
    )
}

export default Contact;