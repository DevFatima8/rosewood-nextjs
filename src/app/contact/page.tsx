import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact rosewood HOTEL Islamabad or Karachi for room reservations, availability and guest assistance. Call 0370 6466550.",
};

const faqs = [
  ["How can I confirm room availability?", "Call or WhatsApp us on 0370 6466550, or submit the inquiry form with your preferred branch and dates. Our team will confirm current availability directly."],
  ["Can I contact both branches on the same number?", "Yes. The rosewood reservations number serves inquiries for both Islamabad and Karachi. Please mention your preferred city when contacting us."],
  ["Can I request a longer stay?", "Absolutely. Select “Long stay” in the form and share your expected dates so our team can guide you on suitable room options."],
  ["How quickly will the team reply?", "We aim to respond as promptly as possible. For same-day or urgent arrival questions, calling or WhatsApp is the fastest option."],
];

export default function ContactPage() {
  return <main><Header />
    <section className="inner-hero contact-hero"><img src="https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2200&h=1200" alt="rosewood Hotel reception and guest assistance" /><div className="hero-veil" /><div><span className="kicker">WE ARE HERE TO HELP</span><h1>Let&apos;s plan<br />your <em>stay.</em></h1></div></section>

    <section className="contact-intro"><div><span className="kicker dark">CONTACT rosewood</span><h2>Questions, plans<br />or special <em>requests?</em></h2></div><div><p className="large-copy">Our guest team is ready to help you choose a branch, find the right room and prepare for a comfortable arrival.</p><p>Reach us directly by phone or WhatsApp for immediate assistance, or send a detailed inquiry using the form below.</p></div></section>

    <section className="contact-channels"><a href="tel:03706466550"><span>01</span><i>☎</i><div><small>CALL US</small><h3>0370 6466550</h3><p>For availability and direct reservations</p></div><b>→</b></a><a href="https://wa.me/923706466550?text=Hello%20rosewood%20HOTEL%2C%20I%20would%20like%20to%20ask%20about%20a%20stay." target="_blank" rel="noopener noreferrer"><span>02</span><i>◉</i><div><small>WHATSAPP</small><h3>Message our team</h3><p>Quick questions and reservation support</p></div><b>↗</b></a></section>

    <section className="contact-form-section"><div className="contact-form-aside"><span className="kicker">SEND AN INQUIRY</span><h2>Tell us what<br />you <em>need.</em></h2><p>Provide a few details and we will help make the next step straightforward.</p><div className="response-note"><b>Guest assistance</b><span>Available for both branches</span></div><div className="response-note"><b>Direct contact</b><span>0370 6466550</span></div></div><ContactForm /></section>

    <section className="contact-locations"><div className="gallery-heading"><div><span className="kicker dark">OUR LOCATIONS</span><h2>Find your<br /><em>rosewood.</em></h2></div><p>Two well-connected city locations, one consistent standard of thoughtful hospitality.</p></div><div className="contact-location-grid"><article><div className="location-image"><img src="11.jpeg" alt="Islamabad city location" /><span>01</span></div><div className="location-info"><small>ISLAMABAD BRANCH</small><h3>F-8/3, Islamabad</h3><p>Street 58, House No. 5<br />F-8/3, Islamabad</p><a href="tel:03706466550">0370 6466550</a><a className="location-map" href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x38dfc1e263d0bcf1:0xb5356609220259bc?entry=s&sa=X&ved=2ahUKEwiTlLnnlpGWAxXG3gIHHQ15B4MQ4kB6BAgWEAA&hl=en" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div></article><article><div className="location-image"><img src="12.jpeg" alt="Karachi city location" /><span>02</span></div><div className="location-info"><small>KARACHI BRANCH</small><h3>Shahrah-e-Faisal</h3><p>8-K Shahrah-e-Faisal, P.E.C.H.S<br />Block 2, Block 5, Karachi</p><a href="tel:03706466550">0370 6466550</a><a className="location-map" href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x3eb33f004c73575d:0xb7766fe24574aea0?entry=s&sa=X&ved=2ahUKEwiolZnFlpGWAxWc0wIHHcKFOV8Q4kB6BAgXEAA&hl=en" target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></div></article></div></section>

    <section className="arrival-help"><div><span className="kicker">BEFORE YOU ARRIVE</span><h2>A smoother journey<br />starts with good <em>information.</em></h2></div><div className="arrival-grid"><article><b>01</b><h3>Share your timing</h3><p>Let us know your expected arrival so the team can prepare for a straightforward welcome.</p></article><article><b>02</b><h3>Confirm your branch</h3><p>Check whether Islamabad or Karachi best suits your meetings, family plans and city schedule.</p></article><article><b>03</b><h3>Ask us anything</h3><p>Room preferences, longer stays or local directions—share what matters before you travel.</p></article></div></section>

    <section className="contact-faq"><div className="faq-title"><span className="kicker dark">FREQUENTLY ASKED</span><h2>Useful answers,<br />before you <em>ask.</em></h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}<b>＋</b></summary><p>{answer}</p></details>)}</div></section>

    <section className="final-cta"><div><span className="kicker">PREFER TO SPEAK DIRECTLY?</span><h2>We are only a<br /><em>phone call away.</em></h2><p>Contact the rosewood guest team for current room availability.</p><a className="gold-button" href="tel:03706466550">Call 0370 6466550 <span>→</span></a></div></section>
    <Footer />
  </main>;
}
