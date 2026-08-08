"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MotionEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = document.querySelectorAll<HTMLElement>("main > section:not(.rosewood-hero):not(.inner-hero)");
    const items = document.querySelectorAll<HTMLElement>("main article, main figure");
    sections.forEach((section) => section.classList.add("motion-section"));
    items.forEach((item, index) => {
      item.classList.add("motion-item");
      item.style.setProperty("--motion-delay", `${(index % 4) * 80}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -45px" });

    sections.forEach((section) => observer.observe(section));
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
