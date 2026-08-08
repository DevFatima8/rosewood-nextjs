import Link from "next/link";

export default function Footer() {
  return <footer className="rosewood-footer">
    <div className="footer-grid">
      <div className="footer-intro"><img src="/logo.png" alt="rosewood Hotel" /><p>Contemporary comfort and thoughtful hospitality in Islamabad and Karachi.</p></div>
      <div><h4>Explore</h4><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/gallery">Gallery</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
      <div><h4>Islamabad</h4><p>Street 58, House No. 5<br />F-8/3, Islamabad</p><a href="tel:03706466550">0370 6466550</a></div>
      <div><h4>Karachi</h4><p>8-K Shahrah-e-Faisal, P.E.C.H.S<br />Block 2, Block 5, Karachi</p><a href="tel:03706466550">0370 6466550</a></div>
    </div>
    <div className="footer-bar"><span>© 2026 rosewood HOTEL. All rights reserved.</span><span>Islamabad · Karachi</span></div>
  </footer>;
}
