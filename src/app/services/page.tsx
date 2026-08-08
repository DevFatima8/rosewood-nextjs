import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hotel Services",
  description: "Explore rosewood HOTEL services, guest comforts, business travel support and thoughtful hospitality in Islamabad and Karachi.",
};

const essentials = [
  { icon: "◌", title: "24-hour guest assistance", text: "A responsive team is available around the clock for questions, requests and practical support throughout your stay." },
  { icon: "⌁", title: "High-speed Wi-Fi", text: "Reliable connectivity in guest rooms and shared spaces for work, calls, entertainment and everyday planning." },
  { icon: "◇", title: "Daily housekeeping", text: "Thoughtful room care and consistent cleanliness so your space always feels calm, fresh and ready for you." },
  { icon: "☕", title: "Breakfast & refreshments", text: "Start your morning comfortably with freshly prepared breakfast options and convenient refreshments." },
  { icon: "P", title: "Secure parking", text: "Convenient parking arrangements and a secure setting for guests arriving with their own vehicle." },
  { icon: "◎", title: "Local guidance", text: "Helpful recommendations and practical directions for dining, meetings, shopping and navigating the city." },
];

const business = ["Comfortable in-room work setting", "Reliable Wi-Fi for calls and meetings", "Central access to key business districts", "Flexible direct reservation support", "Quiet rooms for focused rest", "Assistance with local transport guidance"];
const occasions = [
  ["Business travel", "A composed base for meetings, assignments and productive city visits, with the essentials that keep your schedule moving."],
  ["Family visits", "Comfortable spaces and warm support for guests visiting relatives, attending celebrations or spending time together."],
  ["Weekend city breaks", "An easy place to return to after dining, shopping and discovering Islamabad or Karachi at your own pace."],
  ["Longer stays", "Dependable housekeeping, useful amenities and a welcoming team make extended time away from home feel simpler."],
];

export default function ServicesPage() {
  return <main><Header />
    <section className="inner-hero services-hero"><img src="1.jpeg" alt="rosewood Hotel guest service" /><div className="hero-veil" /><div><span className="kicker">THOUGHTFUL HOSPITALITY</span><h1>Service that<br /><em>feels effortless.</em></h1></div></section>

    <section className="services-intro"><div><span className="kicker dark">THE rosewood APPROACH</span><h2>Everything considered.<br /><em>Nothing overdone.</em></h2></div><div><p className="large-copy">The best hotel service does not interrupt your stay—it quietly makes every part of it easier.</p><p>At rosewood HOTEL, our service begins before you arrive and continues until the moment you leave. We combine practical comforts, responsive people and calm spaces to create a dependable experience for business travellers, families and city visitors alike.</p><a className="arrow-link" href="tel:03706466550">Speak with our team <span>→</span></a></div></section>

    <section className="essential-services"><div className="gallery-heading"><div><span className="kicker dark">STAY ESSENTIALS</span><h2>Comfort built into<br />every <em>day.</em></h2></div><p>Useful, reliable services designed around the way modern guests travel, work and rest.</p></div><div className="essential-grid">{essentials.map((service, index) => <article key={service.title}><span className="service-number">{String(index + 1).padStart(2, "0")}</span><i>{service.icon}</i><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>

    <section className="service-feature"><div className="service-feature-image"><img src="2.jpeg" alt="Attentive hotel team preparing a room" /><span>CARE IN EVERY DETAIL</span></div><div className="service-feature-copy"><span className="kicker dark">HOUSEKEEPING & ROOM CARE</span><h2>A fresh start,<br />every <em>morning.</em></h2><p className="large-copy">Your room should always feel like a place where the day can slow down.</p><p>Our housekeeping team maintains each space with care, consistency and respect for your privacy. From crisp bedding and clean bathrooms to replenished essentials, the details are handled so you can settle in without distraction.</p><div className="mini-stats"><div><b>Daily</b><span>Room care</span></div><div><b>Always</b><span>Fresh essentials</span></div><div><b>Your way</b><span>Privacy respected</span></div></div></div></section>

    <section className="business-service"><div className="business-copy"><span className="kicker">FOR BUSINESS TRAVELLERS</span><h2>Stay focused.<br /><em>Rest completely.</em></h2><p>When the purpose of your trip matters, the hotel around it should simply work. rosewood offers a quiet, well-connected setting where you can prepare, meet, recharge and move through your schedule with confidence.</p><ul>{business.map(item => <li key={item}>{item}</li>)}</ul><a className="gold-button" href="tel:03706466550">Plan a business stay <span>→</span></a></div><div className="business-image"><img src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=1400" alt="Business traveller working comfortably" /></div></section>

    <section className="occasion-section"><div className="gallery-heading"><div><span className="kicker dark">EVERY JOURNEY IS DIFFERENT</span><h2>A stay for every<br /><em>reason.</em></h2></div><p>Whatever brings you to the city, we shape a comfortable base around the pace and purpose of your visit.</p></div><div className="occasion-grid">{occasions.map(([title, text], index) => <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p><a href="tel:03706466550">Check availability →</a></article>)}</div></section>

    <section className="service-panorama"><img src="https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=2200&h=1000" alt="Calm and comfortable hotel room" /><div className="city-shade" /><div><span className="kicker">REST WELL</span><h2>Spaces designed<br />for a better <em>night.</em></h2><p>Supportive beds, calm interiors and thoughtful room details create the right setting to switch off and begin tomorrow refreshed.</p></div></section>

    <section className="service-journey"><div className="journey-title"><span className="kicker dark">YOUR STAY, STEP BY STEP</span><h2>With you from<br /><em>hello to goodbye.</em></h2></div><div className="service-steps"><article><b>01</b><div><h3>Plan</h3><p>Call us directly for branch availability, room guidance and help choosing the right stay.</p></div></article><article><b>02</b><div><h3>Arrive</h3><p>Receive a warm welcome and straightforward assistance to help you settle in quickly.</p></div></article><article><b>03</b><div><h3>Stay</h3><p>Enjoy responsive support, consistent room care and the freedom to follow your own routine.</p></div></article><article><b>04</b><div><h3>Return</h3><p>Leave with an easy experience—and a familiar welcome ready for your next visit.</p></div></article></div></section>

    <section className="two-city-service"><div><img src="5.jpeg" alt="Islamabad city view" /></div><div className="two-city-copy"><span className="kicker dark">TWO CITIES, ONE STANDARD</span><h2>Dependable care,<br />wherever you <em>stay.</em></h2><p>Our Islamabad and Karachi branches share the same commitment to comfortable rooms, helpful service and straightforward hospitality. Choose the location that fits your plans and expect the rosewood standard at both.</p><a className="arrow-link" href="/contact">Contact a branch <span>→</span></a></div><div><img src="6.jpeg" alt="Karachi city view" /></div></section>

    <section className="service-assurance"><span className="kicker dark">OUR SERVICE PROMISE</span><blockquote>“Professional when it matters.<br />Personal where it counts.”</blockquote><p>That balance is at the heart of every rosewood stay.</p></section>

    <section className="final-cta"><div><span className="kicker">LET US TAKE CARE OF THE DETAILS</span><h2>Your next comfortable stay<br />starts with a <em>conversation.</em></h2><p>Call our guest team for rooms, availability and branch information.</p><a className="gold-button" href="tel:03706466550">Call 0370 6466550 <span>→</span></a></div></section>
    <Footer />
  </main>;
}
