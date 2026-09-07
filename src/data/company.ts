// Centralized company facts. Every value below is a PLACEHOLDER pending
// real details from Golden Pillar Services — swap before launch (see also
// the "Before launch" checklist in the project README, added in Task 12).

export const company = {
  nameEn: 'Golden Pillar Services', // PLACEHOLDER — confirm exact registered trading name
  nameAr: 'الركيزة الذهبية للخدمات', // PLACEHOLDER — confirm exact registered Arabic name

  // Two live phone lines, each a named contact person, both also
  // WhatsApp-reachable. `phone` is kept as a single value for the
  // JSON-LD schema (which expects one string); everywhere a visitor
  // actually sees/calls a number, both show with their contact's name.
  phone: '+968 7774 0100',
  phones: [
    { name: 'Salman Shoukat', label: '+968 7774 0100', tel: 'tel:+96877740100' },
    { name: 'Abdullah Ahmed', label: '+968 9377 7171', tel: 'tel:+96893777171' },
  ],

  // Same two numbers, WhatsApp deep links — the WhatsApp button/float
  // shows both as a named chooser rather than picking one. Using
  // api.whatsapp.com/send rather than wa.me: wa.me redirects through
  // WhatsApp's link-shortener domain, which has been unreliable on some
  // Omani carriers/networks; api.whatsapp.com/send is WhatsApp's other
  // official click-to-chat endpoint and opens directly.
  whatsappNumbers: [
    { name: 'Salman Shoukat', label: '+968 7774 0100', link: 'https://api.whatsapp.com/send?phone=96877740100' },
    { name: 'Abdullah Ahmed', label: '+968 9377 7171', link: 'https://api.whatsapp.com/send?phone=96893777171' },
  ],

  email: 'info@goldenpillar.om',
  crNumber: '1534792',

  // Registered SME with Riyada (Oman's Public Authority for SME
  // Development, sme.gov.om). No verified official logo/QR badge for
  // self-display found — shown as a text credential for now. Swap in
  // the real Riyada Card logo/QR image once provided.
  riyadaUrl: 'https://www.sme.gov.om',

  address: {
    en: 'Building 7481, Office 8, Beside Sultan Center, Al Amerat, Muscat, Sultanate of Oman',
    ar: 'مبنى 7481، مكتب 8، بجانب مركز سلطان، العامرات، مسقط، سلطنة عُمان',
  },

  mapEmbedUrl: 'https://www.google.com/maps?q=Sultan+Center+Al+Amerat+Muscat+Oman&output=embed',

  hours: {
    en: 'Sun – Thu, 8:00 AM – 6:00 PM', // PLACEHOLDER — confirm real working hours
    ar: 'الأحد – الخميس، 8:00 صباحًا – 6:00 مساءً', // PLACEHOLDER — confirm real working hours
  },

  stats: {
    years: 12, // PLACEHOLDER — real years in business
    projects: 240, // PLACEHOLDER — real completed project count
    clients: 90, // PLACEHOLDER — real client count
  },

  // Empty string = not set yet. Footer renders each icon only when its
  // URL is non-empty, and hides the whole social row if none are set —
  // add a real URL here and it appears automatically.
  socials: {
    instagram: '', // e.g. 'https://instagram.com/goldenpillarservices'
    linkedin: '',
    facebook: '',
  },
} as const;
