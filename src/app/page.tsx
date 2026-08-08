import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
  ["01", "Prime locations", "Stay close to the business, dining and cultural districts of Islamabad and Karachi."],
  ["02", "Refined comfort", "Calm interiors, thoughtful details and everything needed for a seamless stay."],
  ["03", "Warm service", "Personal hospitality and responsive assistance, from arrival to departure."],
];
const rooms = [
  { name: "Deluxe King", text: "A peaceful retreat with a generous king bed, considered lighting and room to unwind.", image: "/king-bed.jpeg" },
  { name: "Executive Room", text: "Designed for productive city stays, with a comfortable work setting and refined details.", image: "/executive.jpeg" },
  { name: "Clean Washroom", text: "More space for longer stays and shared moments, without compromising privacy or comfort.", image: "/clean-washroom.jpeg" },
];
const services = ["Daily housekeeping", "High-speed Wi-Fi", "24-hour guest assistance", "Air-conditioned rooms", "Secure surroundings", "Direct reservation support"];

export default function HomePage() {
  return <main>
    <Header />
    <section className="rosewood-hero">
      <img src="/hero.jpeg" alt="Elegant luxury hotel exterior" />
      <div className="hero-veil" />
      <div className="rosewood-hero-copy"><span className="kicker">ISLAMABAD · KARACHI</span><h1>Stay well.<br /><em>Feel at home.</em></h1><p>Thoughtful city stays, warm hospitality and comfort that feels effortless.</p><div className="hero-buttons"><a className="gold-button" href="tel:03706466550">Reserve your stay <span>→</span></a><Link href="/gallery" className="ghost-link">Explore the hotel</Link></div></div>
      <div className="hero-address"><span>Two cities</span><b>One standard of care</b></div>
    </section>

    <section className="welcome-wrap">
      <div className="title-block"><span className="kicker dark">WELCOME TO rosewood</span><h2>A better way<br />to <em>stay.</em></h2></div>
      <div className="welcome-copy"><p className="large-copy">Designed for guests who value calm, convenience and genuine hospitality.</p><p>Whether you are travelling for business, meeting family or exploring a new city, rosewood HOTEL gives you a composed and comfortable place to return to. Every detail is shaped around an uncomplicated stay—from a warm welcome to a restful night.</p><Link className="arrow-link" href="/about">Discover our story <span>→</span></Link></div>
    </section>

    <section className="feature-band">{features.map(([n, t, d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</section>

    <section className="rooms-showcase">
      <div className="gallery-heading"><div><span className="kicker dark">ROOMS & SUITES</span><h2>Made for<br /><em>restful nights.</em></h2></div><p>Quiet colours, comfortable beds and practical details come together in spaces designed to help you recharge.</p></div>
      <div className="room-showcase-grid">{rooms.map((room, index) => <article key={room.name}><div><img src={room.image} alt={`${room.name} at rosewood Hotel`} /><span>0{index + 1}</span></div><h3>{room.name}</h3><p>{room.text}</p><a href="tel:03706466550">Ask about this room →</a></article>)}</div>
    </section>

    <section className="service-story">
      <div className="service-photo"><img src="3.jpeg" alt="Warm hotel service" /><div><span>rosewood HOSPITALITY</span><b>Here when you need us.</b></div></div>
      <div className="service-copy"><span className="kicker dark">EVERYDAY COMFORTS</span><h2>Everything you need.<br /><em>Nothing complicated.</em></h2><p className="large-copy">Good hospitality is often felt in the smallest moments.</p><p>It is a smooth check-in after a long journey, a clean and calm room, helpful local guidance and someone available when plans change. Our team takes care of those details so you can focus on the reason you came.</p><div className="service-list">{services.map((service, index) => <div key={service}><span>{String(index + 1).padStart(2, "0")}</span>{service}</div>)}</div></div>
    </section>
    <section className="home-gallery">
      <div className="gallery-heading"><div><span className="kicker dark">A GLIMPSE INSIDE</span><h2>Spaces with<br /><em>character.</em></h2></div><Link className="arrow-link" href="/gallery">View full gallery <span>→</span></Link></div>
      <div className="home-gallery-grid"><img src="2.jpeg" alt="rosewood hotel bedroom" /><img src="3.jpeg" alt="Comfortable hotel suite" /><img src="4.jpeg" alt="Hotel lounge" /></div>
    </section>

    <section className="guest-words"><span className="quote-mark">“</span><span className="kicker dark">GUEST IMPRESSIONS</span><blockquote>rosewood gave us exactly what we needed—a quiet, beautifully kept room, a central location and a team that made every request feel easy.</blockquote><div className="rating">★★★★★</div><p><b>A recent rosewood guest</b><span>Business stay · Islamabad</span></p></section>

    <section className="branches-section" id="locations"><div className="branches-copy"><span className="kicker">FIND YOUR rosewood</span><h2>Two addresses.<br /><em>One welcome.</em></h2><p>Choose the city that suits your journey. At both locations, you will find the same considered comfort and responsive support. Call us directly for availability and reservations.</p><a className="gold-button" href="tel:03706466550">Call 0370 6466550 <span>→</span></a></div><div className="branch-list"><article><b>01</b><div><span>ISLAMABAD</span><h3>Street 58, House No. 5<br />F-8/3, Islamabad</h3><a href="tel:03706466550">0370 6466550</a></div></article><article><b>02</b><div><span>KARACHI</span><h3>8-K Shahrah-e-Faisal, P.E.C.H.S<br />Block 2, Block 5, Karachi</h3><a href="tel:03706466550">0370 6466550</a></div></article></div></section>

    <section className="final-cta"><div><span className="kicker">YOUR ROOM IS WAITING</span><h2>Make your next city stay<br /><em>feel effortless.</em></h2><p>Speak directly with our team for room options, branch availability and reservation support.</p><a className="gold-button" href="tel:03706466550">Plan your stay <span>→</span></a></div></section>
    <Footer />
  </main>;
}
