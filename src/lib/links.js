import { WHATSAPP } from '../data/site'

// Build a WhatsApp deep link with a prefilled message.
export const wa = (text = "Hi NEXSTEG — I'd like to join. Can you share the details?") =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
