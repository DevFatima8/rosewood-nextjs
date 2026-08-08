"use client";

import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const message = encodeURIComponent("Hello rosewood HOTEL, I would like to ask about room availability and reservations.");

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/923706466550?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with rosewood HOTEL on WhatsApp"
    >
      <span className="whatsapp-label"><small>Need help?</small>Chat on WhatsApp</span>
      <span className="whatsapp-icon">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path fill="currentColor" d="M16.05 3A12.9 12.9 0 0 0 5.1 22.72L3.4 29l6.43-1.69A12.95 12.95 0 1 0 16.05 3Zm0 23.72a10.7 10.7 0 0 1-5.47-1.5l-.39-.23-3.81 1 1.02-3.71-.25-.4a10.76 10.76 0 1 1 8.9 4.84Zm5.9-8.07c-.32-.16-1.91-.94-2.21-1.05-.29-.11-.51-.16-.72.16-.22.32-.83 1.05-1.02 1.26-.19.22-.38.24-.7.08-1.89-.94-3.13-1.68-4.38-3.82-.33-.57.33-.53.94-1.76.11-.22.05-.41-.03-.57-.08-.16-.72-1.74-.99-2.38-.26-.63-.53-.54-.72-.55h-.62c-.22 0-.57.08-.86.4-.3.33-1.13 1.11-1.13 2.7s1.16 3.13 1.32 3.35c.16.22 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.62-.37Z" />
        </svg>
      </span>
    </a>
  );
}
