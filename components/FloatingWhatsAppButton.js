import { contact } from "@/lib/full-site-data";

export function FloatingWhatsAppButton() {
  return (
    <a
      className="floating-whatsapp"
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with HR Greenroots Landscaping on WhatsApp"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L.1 24l6.3-1.6a11.9 11.9 0 0 0 5.7 1.4h.1c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.3-6.2-3.6-8.4ZM12.1 21.8h-.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.9 9.9 0 0 1-1.5-5.3c0-5.5 4.4-9.9 9.9-9.9 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.9-9.9 9.9Zm5.4-7.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5L9 6.9c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.2-.3-.5-.4Z"
        />
      </svg>
    </a>
  );
}
