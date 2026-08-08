"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  return <header className={`main-header ${solid ? "header-solid" : ""}`}>
    <Link href="/" className="logo-link" aria-label="rosewood Hotel home"><img src="/logo.png" alt="rosewood Hotel logo" /></Link>
    <nav className={open ? "main-nav nav-open" : "main-nav"}>
      {links.map(link => <Link key={link.href} className={pathname === link.href ? "active" : ""} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
    </nav>
    <a className="call-link" href="tel:03706466550"><span>Reservations</span>0370 6466550</a>
    <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><i /><i /><i /></button>
  </header>;
}
