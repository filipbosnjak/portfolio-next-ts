import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "../styles/components/Contact.module.scss";
import ErrorPopup from "@/components/notifications/ErrorPopup";
import type { ContactPayload } from "@/types/types";

const Contact = () => {
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isCoolingDown, setIsCoolingDown] = useState<boolean>(false);
  const cooldownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [payload, setPayload] = useState<ContactPayload>({});

  useEffect(() => {
    return () => {
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, []);

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setErrorOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (isSending || isCoolingDown) {
      return;
    }

    const from = payload.from?.trim();
    const senderName = payload.senderName?.trim();
    const subject = payload.subject?.trim();
    const body = payload.body?.trim();

    if (!from || !senderName || !subject || !body) {
      showError("Please fill in all fields.");
      return;
    }

    let response: Response;
    setIsSending(true);
    try {
      response = await fetch("/api/sendemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, senderName, subject, body }),
      });
    } catch {
      setIsSending(false);
      showError("Network error. Please try again.");
      return;
    }

    let data: { message?: string; error?: boolean };
    try {
      data = (await response.json()) as { message?: string; error?: boolean };
    } catch {
      setIsSending(false);
      showError("Unexpected server response.");
      return;
    }

    setIsSending(false);

    if (!response.ok || data.error) {
      showError(data.message ?? "Could not send message.");
      return;
    }

    setIsCoolingDown(true);
    cooldownTimeoutRef.current = setTimeout(() => {
      setIsCoolingDown(false);
      cooldownTimeoutRef.current = null;
    }, 60000);
    setSuccessOpen(true);
    setPayload({});
    form.reset();
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <ErrorPopup
          message={errorMessage}
          isOpen={errorOpen}
          setOpen={setErrorOpen}
          severity="error"
        />
        <ErrorPopup
          message="Message sent. Thanks for reaching out!"
          isOpen={successOpen}
          setOpen={setSuccessOpen}
          severity="success"
        />
      </div>
      <section className={`${styles.contact} ${styles.section}`}>
        <div id="contact">
          <h1 className={`${styles.sectionTitle} ${styles.title5}`}>
            Contact Me
          </h1>
          <div className={styles.contactInfo}>
            <div className={styles.item}>
              <i className="fas fa-mobile-alt"></i>
              +385 91 546 6832
            </div>

            <div className={styles.item}>
              <i className="fas fa-envelope"></i>
              filipo.bosnjak@gmail.com
            </div>

            <div className={styles.item}>
              <i className="fas fa-map-marker-alt"></i>
              Zagreb, Croatia
            </div>
          </div>

          <form
            action="#"
            className={styles.contactForm}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className={styles.nameZone}
              placeholder="Your Full Name"
              onChange={(e) =>
                setPayload((p) => ({ ...p, senderName: e.target.value }))
              }
            />
            <input
              type="email"
              className={styles.emailZone}
              placeholder="Your Email"
              onChange={(e) =>
                setPayload((p) => ({ ...p, from: e.target.value }))
              }
            />
            <input
              type="text"
              className={styles.subjectZone}
              placeholder="Subject"
              onChange={(e) =>
                setPayload((p) => ({ ...p, subject: e.target.value }))
              }
            />
            <textarea
              className={styles.messageZone}
              placeholder="Message"
              onChange={(e) =>
                setPayload((p) => ({ ...p, body: e.target.value }))
              }
            />
            <div
              className={styles.submitWrapper}
              data-tooltip={
                isSending
                  ? "Your message is being sent."
                  : isCoolingDown
                    ? "You cannot send another message right now."
                    : undefined
              }
            >
              <button
                type="submit"
                className={styles.btn1}
                disabled={isSending || isCoolingDown}
              >
                {isSending && <span className={styles.spinner}></span>}
                {isSending
                  ? "Sending..."
                  : isCoolingDown
                    ? "Message Sent"
                    : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
