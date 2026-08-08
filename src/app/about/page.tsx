import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const journey = [
  ["Before arrival", "Direct assistance with room selection, branch information and the details that help you plan with confidence."],
  ["A warm welcome", "A smooth arrival and a helpful team ready to make settling in simple after your journey."],
  ["Throughout your stay", "Thoughtful housekeeping, responsive support and privacy whenever you want it."],
  ["Until next time", "An easy departure and a welcome that will be waiting whenever you return to the city."],
];

export default function AboutPage() {
  return <main><Header />
    <section className="inner-hero about-hero"><img src="7.jpeg" alt="Elegant rosewood Hotel lobby" /><div className="hero-veil" /><div><span className="kicker">THE rosewood STORY</span><h1>Hospitality,<br /><em>made personal.</em></h1></div></section>

    <section className="about-intro"><div><span className="kicker dark">WHO WE ARE</span><h2>Modern stays.<br /><em>Genuine warmth.</em></h2></div><div><p className="large-copy">rosewood HOTEL was created around a simple idea: a city hotel should feel polished without ever feeling impersonal.</p><p>Our spaces bring together contemporary comfort, attentive service and calm surroundings. From a quick business visit to a longer family stay, our team focuses on the details that make every day easier. We believe the best hospitality is natural, responsive and quietly dependable.</p></div></section>

    <section className="about-image-row"><img src="8.jpeg" alt="rosewood bedroom interior" /><div><span>OUR PROMISE</span><h2>Comfort in every detail.</h2><p>Clean, considered rooms. Helpful people. Convenient locations. A dependable experience every time you stay.</p><ul><li>Welcoming, responsive service</li><li>Comfortable and thoughtfully kept spaces</li><li>Excellent access to central city locations</li><li>Direct reservation support</li><li>Standards you can trust across every stay</li></ul></div></section>

    <section className="origin-story"><div><span className="kicker dark">OUR POINT OF VIEW</span><h2>A hotel should be<br />more than a <em>room.</em></h2></div><div className="origin-columns"><p>Travelling asks a lot of you. New schedules, unfamiliar roads, important meetings and time away from the people and routines you know. We created rosewood as a counterpoint to that movement: a place where the day becomes simpler the moment you arrive.</p><p>That idea influences everything—from the atmosphere of our rooms to the way our team responds. We avoid unnecessary formality and focus instead on genuine care, useful service and a consistent sense of calm.</p></div></section>

    <section className="about-collage"><div className="collage-large"><img src="9.jpeg" alt="Refined hotel interior" /></div><div className="collage-small"><img src="interior.jpeg" alt="Hotel room details" /><p>Composed interiors, honest service and a thoughtful welcome—this is the rosewood way.</p></div></section>

    <section className="guest-journey"><div className="journey-heading"><span className="kicker">FROM ARRIVAL TO DEPARTURE</span><h2>A stay shaped<br />around <em>you.</em></h2><p>We look at the complete guest journey, not just the room key.</p></div><div className="journey-list">{journey.map(([title, text], index) => <article key={title}><b>{String(index + 1).padStart(2, "0")}</b><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <section className="values"><div className="gallery-heading"><div><span className="kicker dark">WHAT GUIDES US</span><h2>The rosewood<br /><em>standard.</em></h2></div><p>Our standards are simple enough to remember and important enough to shape every decision we make.</p></div><div className="value-grid"><article><b>01</b><h3>Care</h3><p>We treat every guest with attention, respect and sincere warmth.</p></article><article><b>02</b><h3>Comfort</h3><p>Every space is prepared to help you settle in, switch off and rest well.</p></article><article><b>03</b><h3>Consistency</h3><p>The same considered service awaits across both rosewood locations.</p></article></div></section>

    <section className="about-locations"><div className="about-location-copy"><span className="kicker">WHERE TO FIND US</span><h2>Connected to<br />the <em>city.</em></h2><p>Both rosewood locations place you within reach of the people, places and opportunities that brought you to the city.</p><Link href="/gallery" className="gold-button">See our gallery <span>→</span></Link></div><div className="location-cards"><article><span>ISLAMABAD</span><h3>G-6/3</h3><p>25 Street No. 1<br />G-6/3, Islamabad</p><a href="tel:03116731810">0311 6731810 →</a></article><article><span>KARACHI</span><h3>P.E.C.H.S</h3><p>8-K Shahrah-e-Faisal, P.E.C.H.S<br />Block 2, Block 5, Karachi</p><a href="tel:03706466550">0370 6466550 →</a></article></div></section>

    <section className="about-quote"><span>rosewood HOTEL</span><blockquote>“A familiar sense of comfort,<br />wherever your journey takes you.”</blockquote></section>
    <section className="final-cta"><div><span className="kicker">COME STAY WITH US</span><h2>Experience the<br /><em>rosewood welcome.</em></h2><p>Call our team directly for current availability at Islamabad or Karachi.</p><a className="gold-button" href="tel:03706466550">Call 0370 6466550 <span>→</span></a></div></section>
    <Footer />
  </main>;
}