export type ServiceSlug =
  | 'fitout-construction'
  | 'cleaning-services'
  | 'joinery'
  | 'signage';

export interface Service {
  slug: ServiceSlug;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  scope: { en: string[]; ar: string[] };
  /** Four-step delivery process, in display order. */
  process: { en: string; ar: string }[];
  // No shared imagery field here: per-service imagery is currently owned
  // directly by each consuming page/component (services/index.astro,
  // services/[slug].astro, FeaturedProjects.astro) rather than centralized
  // here. Accepted tradeoff, not a bug — see fix-wave task 3.
}

// The four-step process is the same standard workflow across every trade.
const process: Service['process'] = [
  { en: 'Consultation & site visit', ar: 'استشارة وزيارة الموقع' },
  { en: 'Proposal & quotation', ar: 'العرض الفني وتحديد السعر' },
  { en: 'Execution', ar: 'التنفيذ' },
  { en: 'Handover & support', ar: 'التسليم والمتابعة' },
];

export const services: Service[] = [
  {
    slug: 'fitout-construction',
    title: { en: 'Fitout & Construction', ar: 'التشطيبات والإنشاءات' },
    tagline: {
      en: 'Commercial interiors built to spec and delivered on schedule.',
      ar: 'تشطيبات داخلية تجارية تُنفَّذ وفق المواصفات وتُسلَّم في الموعد المحدد.',
    },
    scope: {
      en: [
        'Commercial fitout',
        'Retail fitout',
        'Office fitout',
        'F&B fitout',
        'Renovation & refurbishment',
        'MEP coordination',
      ],
      ar: [
        'تشطيبات تجارية',
        'تشطيبات المحال التجارية',
        'تشطيبات المكاتب',
        'تشطيبات المطاعم والمقاهي',
        'التجديد والترميم',
        'تنسيق الأعمال الكهروميكانيكية',
      ],
    },
    process,
  },
  {
    slug: 'cleaning-services',
    title: { en: 'Cleaning Services', ar: 'خدمات التنظيف' },
    tagline: {
      en: 'Scheduled and one-off cleaning for commercial and construction sites.',
      ar: 'خدمات تنظيف دورية وفورية للمواقع التجارية ومواقع الإنشاءات.',
    },
    scope: {
      en: [
        'Deep cleaning',
        'Facade & external cleaning',
        'Post-construction cleaning',
        'Scheduled commercial cleaning',
      ],
      ar: [
        'التنظيف العميق',
        'تنظيف الواجهات والأسطح الخارجية',
        'تنظيف ما بعد أعمال البناء',
        'التنظيف التجاري الدوري',
      ],
    },
    process,
  },
  {
    slug: 'joinery',
    title: { en: 'Joinery', ar: 'النجارة' },
    tagline: {
      en: 'Custom joinery and millwork, built in-house and fitted on site.',
      ar: 'أعمال نجارة مخصصة تُصنَّع في ورشتنا وتُركَّب في الموقع.',
    },
    scope: {
      en: ['Doors', 'Wardrobes', 'Kitchens', 'Custom furniture', 'Commercial millwork'],
      ar: ['الأبواب', 'الخزائن', 'المطابخ', 'الأثاث المخصص', 'أعمال النجارة التجارية'],
    },
    process,
  },
  {
    slug: 'signage',
    title: { en: 'Signage', ar: 'اللوحات الإعلانية' },
    tagline: {
      en: 'Signage that gets noticed — fabricated and installed end to end.',
      ar: 'لوحات إعلانية لافتة للنظر، نُصنّعها ونُركّبها من الألف إلى الياء.',
    },
    scope: {
      en: [
        '3D letters',
        'Lightbox signage',
        'Wayfinding signage',
        'Vehicle branding',
        'Installation & maintenance',
      ],
      ar: [
        'الحروف البارزة ثلاثية الأبعاد',
        'اللوحات المضيئة',
        'لوحات الإرشاد والتوجيه',
        'تغليف السيارات الإعلاني',
        'التركيب والصيانة',
      ],
    },
    process,
  },
];
