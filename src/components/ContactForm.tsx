"use client";

import { FormEvent, useState, useRef } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submitTimeRef = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Spam Protection: کم از کم 3 سیکنڈ کا وقفہ
    const now = Date.now();
    if (submitTimeRef.current && now - submitTimeRef.current < 3000) {
      setStatus("error");
      setError("Please wait a moment before submitting again.");
      return;
    }
    submitTimeRef.current = now;

    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    if (!endpoint || !endpoint.startsWith("https://formspree.io/f/")) {
      setStatus("error");
      setError("Contact form is awaiting Formspree configuration. Please call or WhatsApp us for immediate assistance.");
      return;
    }

    try {
      // FormData کو JSON میں تبدیل کریں
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Honeypot چیک کریں
      if (data._gotcha && data._gotcha !== "") {
        throw new Error("Spam detected");
      }

      // FormSpree کو JSON بھیجیں (FormData کے بجائے)
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        // FormSpree کی مخصوص Spam Error
        if (response.status === 403 && result?.error === "Form is spam") {
          throw new Error("Your submission was flagged as spam. Please try again with more detailed information.");
        }

        throw new Error(result?.error || "Your message could not be sent.");
      }

      form.reset();
      setStatus("success");

      // 5 سیکنڈ بعد دوبارہ submit کرنے کی اجازت
      setTimeout(() => {
        submitTimeRef.current = 0;
      }, 5000);

    } catch (reason) {
      setStatus("error");
      setError(reason instanceof Error ? reason.message : "Your message could not be sent. Please try again.");
    }
  }

  if (status === "success") return <div className="contact-success"><span>✓</span><p className="kicker dark">MESSAGE RECEIVED</p><h2>Thank you for<br /><em>getting in touch.</em></h2><p>Our rosewood team will review your inquiry and respond as soon as possible. For urgent reservations, please call 0370 6466550.</p><button onClick={() => setStatus("idle")}>Send another message</button></div>;

  return <form className="contact-form" onSubmit={submit} ref={formRef}>
    <input type="text" name="_gotcha" className="form-honeypot" tabIndex={-1} autoComplete="off" />
    <input type="hidden" name="hotel" value="rosewood HOTEL" />

    {/* Spam Protection کے لیے اضافی Hidden Field */}
    <input type="hidden" name="_subject" value="New Inquiry from rosewood HOTEL" />

    <div className="contact-form-heading"><span>YOUR INQUIRY</span><h2>How can we help?</h2><p>Complete the form and our guest team will get back to you shortly.</p></div>
    <div className="contact-form-row"><label>Full name *<input required name="name" autoComplete="name" placeholder="Your full name" /></label><label>Email address *<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label></div>
    <div className="contact-form-row"><label>Phone number *<input required type="tel" name="phone" autoComplete="tel" placeholder="+92 300 0000000" /></label><label>Preferred branch *<select required name="branch" defaultValue=""><option value="" disabled>Select a branch</option><option>Islamabad — F-8/3</option><option>Karachi — P.E.C.H.S</option><option>Not decided yet</option></select></label></div>
    <div className="contact-form-row"><label>Inquiry type *<select required name="inquiry_type" defaultValue="Reservation"><option>Reservation</option><option>Room information</option><option>Business stay</option><option>Long stay</option><option>General inquiry</option><option>Feedback</option></select></label><label>Number of guests<input type="number" name="guests" min="1" max="20" placeholder="2" /></label></div>
    <div className="contact-form-row"><label>Expected check-in<input type="date" name="check_in" /></label><label>Expected check-out<input type="date" name="check_out" /></label></div>
    <label>Your message *<textarea required name="message" rows={6} placeholder="Tell us how we can make your stay easier..." /></label>
    {status === "error" && <p className="contact-error">{error}</p>}
    <button className="contact-submit" disabled={status === "sending"}>{status === "sending" ? "Sending your message..." : "Send inquiry"}<span>→</span></button>
    <p className="contact-privacy">By submitting this form, you agree that rosewood HOTEL may contact you regarding your inquiry.</p>
  </form>;
}