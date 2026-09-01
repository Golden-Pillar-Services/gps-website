// Centralized company facts. Every value below is a PLACEHOLDER pending
// real details from Golden Pillar Services — swap before launch (see also
// the "Before launch" checklist in the project README, added in Task 12).

export const company = {
  nameEn: 'Golden Pillar Services', // PLACEHOLDER — confirm exact registered trading name
  nameAr: 'الركيزة الذهبية للخدمات', // PLACEHOLDER — confirm exact registered Arabic name

  phone: '+968 9123 4567', // PLACEHOLDER — real contact number
  whatsapp: '+968 9123 4567', // PLACEHOLDER — real WhatsApp number
  whatsappLink: 'https://wa.me/96891234567', // PLACEHOLDER — must match `whatsapp` above, digits only

  email: 'info@goldenpillar.om', // PLACEHOLDER — real inbox
  crNumber: '1234567', // PLACEHOLDER — real Commercial Registration number

  address: {
    en: 'Way 1234, Building 56, Al Khuwair, Muscat, Sultanate of Oman', // PLACEHOLDER — real street address
    ar: 'الطريق 1234، مبنى 56، الخوير، مسقط، سلطنة عُمان', // PLACEHOLDER — real street address
  },

  mapEmbedUrl: 'https://www.google.com/maps?q=Muscat,Oman&output=embed', // PLACEHOLDER — real Google Maps embed URL for the office location

  hours: {
    en: 'Sun – Thu, 8:00 AM – 6:00 PM', // PLACEHOLDER — confirm real working hours
    ar: 'الأحد – الخميس، 8:00 صباحًا – 6:00 مساءً', // PLACEHOLDER — confirm real working hours
  },

  stats: {
    years: 12, // PLACEHOLDER — real years in business
    projects: 240, // PLACEHOLDER — real completed project count
    clients: 90, // PLACEHOLDER — real client count
  },

  socials: {
    instagram: '#', // PLACEHOLDER — real Instagram URL
    linkedin: '#', // PLACEHOLDER — real LinkedIn URL
    facebook: '#', // PLACEHOLDER — real Facebook URL
  },
} as const;
