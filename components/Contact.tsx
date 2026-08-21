"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaMobileAlt } from "react-icons/fa";
import Toast from "@/components/Toast";
import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import type { ContactPayload } from "@/types/types";

const contactItems = [
  { icon: FaMobileAlt, text: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: FaEnvelope, text: site.email, href: `mailto:${site.email}` },
  {
    icon: FaMapMarkerAlt,
    text: site.location,
    href: "https://maps.google.com/?q=Zagreb,Croatia",
  },
];

const Contact = () => {
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
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
  };

  return (
    <>
      <Toast
        message={errorMessage}
        isOpen={errorOpen}
        onClose={() => setErrorOpen(false)}
        severity="error"
      />
      <Toast
        message="Message sent. Thanks for reaching out!"
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        severity="success"
      />
      <section id="contact" className="ds-container scroll-mt-24 py-[120px]">
        <Reveal>
          <Badge>Get in touch</Badge>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="ds-text-heading mt-4 mb-14 max-w-[600px] text-white">
            Try it now or send a message
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="ds-card flex h-full flex-col gap-3 p-10">
              <h3 className="ds-text-title text-white">Direct channels</h3>
              <p className="ds-text-body text-ds-description">
                Prefer email, a call, or a pin on the map. All of it still
                lands in the same inbox.
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {contactItems.map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex items-center gap-3 rounded-[10px] border border-ds-border bg-ds-surface-1 px-4 py-3 text-[15px] text-white transition-colors hover:border-white/20"
                    >
                      <Icon className="text-ds-description" />
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              className="ds-card flex h-full flex-col gap-3 p-10"
              onSubmit={handleSubmit}
            >
              <h3 className="ds-text-title text-white">Send a message</h3>
              <p className="ds-text-body mb-1 text-ds-description">
                Name, email, subject, and a few lines — that is enough.
              </p>
              <input
                type="text"
                className="ds-input"
                placeholder="Your full name"
                value={payload.senderName ?? ""}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, senderName: e.target.value }))
                }
              />
              <input
                type="email"
                className="ds-input"
                placeholder="Your email"
                value={payload.from ?? ""}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, from: e.target.value }))
                }
              />
              <input
                type="text"
                className="ds-input"
                placeholder="Subject"
                value={payload.subject ?? ""}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, subject: e.target.value }))
                }
              />
              <textarea
                className="ds-input min-h-[160px] resize-y py-3.5"
                placeholder="Message"
                value={payload.body ?? ""}
                onChange={(e) =>
                  setPayload((p) => ({ ...p, body: e.target.value }))
                }
              />
              <div className="group relative mt-2 self-start">
                {(isSending || isCoolingDown) && (
                  <div className="absolute bottom-[calc(100%+10px)] left-0 hidden w-60 rounded-[10px] border border-ds-border bg-[#262626] p-2.5 text-center text-sm leading-snug text-white group-hover:block">
                    {isSending
                      ? "Your message is being sent."
                      : "You cannot send another message right now."}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSending || isCoolingDown}
                  className="ds-btn ds-btn-primary ds-btn-m"
                >
                  {isSending && (
                    <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                  )}
                  {isSending
                    ? "Sending..."
                    : isCoolingDown
                      ? "Message sent"
                      : "Send message"}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
