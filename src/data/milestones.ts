// Journey timeline milestones for the About page.
// The founding entry is real, confirmed against the Oman Business
// Platform Commercial Registration Certificate (CR 1534792, established
// 05/02/2024, registered 06/02/2024, licensed for building/construction
// contracting and general cleaning of buildings). A prior version of this
// file invented a fake 2012-2024 five-entry history — the company is
// actually about two and a half years old; that timeline was a direct
// fabrication and has been removed. Add further entries once real project
// history/dates are confirmed — don't backfill invented ones.
//
// Ordered chronologically (earliest first); consumers render them in this
// DOM order so the CSS logical-property + dir-driven layout (see
// Timeline.astro) can flip visual direction for Arabic without reversing
// the array.
export interface Milestone {
  year: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
}

export const milestones: Milestone[] = [
  {
    year: '2024',
    title: { en: 'Golden Pillar Services Establishment LLC founded', ar: 'تأسيس مؤسسة الخدمات للأعمدة الذهبية' },
    body: {
      en: 'Registered in Muscat as a limited liability company, licensed for building and construction contracting and general cleaning of buildings.',
      ar: 'تأسست المؤسسة في مسقط كشركة ذات مسؤولية محدودة، مرخّصة لمقاولات البناء والتشييد والتنظيف العام للمباني.',
    },
  },
];
