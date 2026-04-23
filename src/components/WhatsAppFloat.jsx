// WhatsAppFloat.jsx
// Floating WhatsApp button with pulse animation and "Join group" bar

const WHATSAPP_LINK = 'https://chat.whatsapp.com/Jk8TEuezlcC7D8jUHaHHJe?mode=gi_t'

export default function WhatsAppFloat() {
  const handleClick = () => {
    window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="whatsapp-float-wrapper" aria-label="Join our WhatsApp group">
      {/* Join group bar */}
      <button
        onClick={handleClick}
        className="whatsapp-join-bar"
        aria-label="Join WhatsApp group for updates"
      >
        Join group for updates
      </button>

      {/* WhatsApp icon button */}
      <button
        onClick={handleClick}
        className="whatsapp-fab"
        aria-label="Open WhatsApp"
      >
        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          width="28"
          height="28"
          aria-hidden="true"
        >
          <path d="M16.004 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.346.634 4.543 1.738 6.437L2.667 29.333l7.098-1.708A13.28 13.28 0 0016.004 29.333C23.37 29.333 29.333 23.362 29.333 16c0-7.362-5.963-13.333-13.329-13.333zm0 2.666c5.887 0 10.663 4.776 10.663 10.667 0 5.89-4.776 10.667-10.663 10.667a10.62 10.62 0 01-5.438-1.493l-.39-.236-4.216 1.015 1.044-4.097-.257-.402A10.61 10.61 0 015.333 16c0-5.891 4.783-10.667 10.671-10.667zm-3.064 5.6c-.234 0-.614.088-.936.44-.322.353-1.23 1.201-1.23 2.927s1.258 3.396 1.434 3.63c.175.233 2.443 3.887 6.012 5.3 2.971 1.17 3.57.938 4.213.879.643-.059 2.074-.849 2.367-1.668.293-.819.293-1.521.205-1.668-.088-.146-.322-.234-.673-.41-.351-.175-2.074-1.024-2.396-1.14-.322-.117-.555-.175-.789.175-.234.351-.908 1.14-1.112 1.374-.205.234-.41.263-.76.088-.352-.176-1.484-.547-2.826-1.745-1.045-.933-1.75-2.085-1.955-2.436-.205-.351-.022-.54.154-.715.158-.157.352-.41.527-.614.176-.205.234-.351.352-.585.117-.234.059-.44-.03-.614-.087-.175-.778-1.912-1.083-2.61-.27-.638-.551-.643-.789-.651l-.686-.012z" />
        </svg>
      </button>
    </div>
  )
}
