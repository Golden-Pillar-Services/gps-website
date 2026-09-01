// Journey timeline milestones for the About page.
// PLACEHOLDER data — years and copy are illustrative until the client
// supplies confirmed company history. Ordered chronologically (earliest
// first); consumers render them in this DOM order so the CSS logical-
// property + dir-driven layout (see Timeline.astro) can flip visual
// direction for Arabic without reversing the array.
export interface Milestone {
  year: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
}

export const milestones: Milestone[] = [
  {
    // PLACEHOLDER
    year: '2012',
    title: { en: 'Golden Pillar founded', ar: 'تأسيس الركيزة الذهبية' },
    body: {
      en: 'A small fitout crew begins taking on commercial units across Muscat, built on a simple promise: measure twice, finish clean, hand over on time.',
      ar: 'بدأ فريق صغير متخصص في التشطيبات بتنفيذ وحدات تجارية في مسقط، انطلاقاً من مبدأ بسيط: القياس بدقة، والتشطيب النظيف، والتسليم في الموعد.',
    },
  },
  {
    // PLACEHOLDER
    year: '2015',
    title: { en: 'First major fitout project', ar: 'أول مشروع تشطيبات كبير' },
    body: {
      en: 'A multi-floor commercial fitout in Muscat becomes the largest contract to date, proving the team could hold schedule at scale.',
      ar: 'شكّل مشروع تشطيبات تجاري متعدد الطوابق في مسقط أكبر عقد ننفذه حتى ذلك الحين، وأثبت قدرة الفريق على الالتزام بالجدول الزمني في المشاريع الكبيرة.',
    },
  },
  {
    // PLACEHOLDER
    year: '2018',
    title: { en: 'Joinery workshop opened', ar: 'افتتاح ورشة النجارة' },
    body: {
      en: 'A dedicated joinery workshop brings custom carpentry in-house, sharpening quality control on cabinetry, doors and fixed furniture.',
      ar: 'افتتحت ورشة نجارة متخصصة لتنفيذ أعمال النجارة المخصصة داخلياً، مما رفع مستوى مراقبة الجودة في الخزائن والأبواب والأثاث الثابت.',
    },
  },
  {
    // PLACEHOLDER
    year: '2021',
    title: { en: 'Signage division launched', ar: 'إطلاق قسم اللوحات الإعلانية' },
    body: {
      en: 'Golden Pillar adds signage and branding fabrication, giving clients one contractor for interiors, joinery and exterior identity.',
      ar: 'أضافت الركيزة الذهبية قسماً لتصنيع اللوحات الإعلانية والهوية البصرية، ليحصل العملاء على مقاول واحد للتشطيبات الداخلية والنجارة والهوية الخارجية.',
    },
  },
  {
    // PLACEHOLDER
    year: '2024',
    title: { en: '100th project completed', ar: 'إنجاز المشروع رقم 100' },
    body: {
      en: 'The 100th project is handed over — a milestone marking a decade-plus of on-time delivery across fitout, joinery, signage and facility services.',
      ar: 'تم تسليم المشروع رقم 100، في محطة تُجسّد أكثر من عقد من الالتزام بالمواعيد في أعمال التشطيبات والنجارة واللوحات الإعلانية وخدمات المرافق.',
    },
  },
];
