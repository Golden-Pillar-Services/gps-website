import type { ImageMetadata } from 'astro';
import type { ServiceSlug } from './services';

import project01 from '../assets/img/project-01.jpg';
import project02 from '../assets/img/project-02.jpg';
import project03 from '../assets/img/project-03.jpg';
import project04 from '../assets/img/project-04.jpg';
import project05 from '../assets/img/project-05.jpg';
import project06 from '../assets/img/project-06.jpg';
import project07 from '../assets/img/project-07.jpg';
import project08 from '../assets/img/project-08.jpg';

export interface Project {
  id: string;
  title: { en: string; ar: string };
  category: ServiceSlug;
  location: { en: string; ar: string };
  image: ImageMetadata;
}

// PLACEHOLDER — representative project names/locations, not real client
// case studies. Swap for verified project data when available.
export const projects: Project[] = [
  {
    id: 'project-01',
    title: { en: 'Retail Fitout — Al Khuwair', ar: 'تشطيبات محل تجاري — الخوير' },
    category: 'fitout-construction',
    location: { en: 'Al Khuwair, Muscat', ar: 'الخوير، مسقط' },
    image: project01,
  },
  {
    id: 'project-02',
    title: { en: 'Post-Construction Clean — Ghala Industrial', ar: 'تنظيف ما بعد الإنشاء — غلا الصناعية' },
    category: 'cleaning-services',
    location: { en: 'Ghala, Muscat', ar: 'غلا، مسقط' },
    image: project02,
  },
  {
    id: 'project-03',
    title: { en: 'Custom Joinery — Qurum Residence', ar: 'أعمال نجارة مخصصة — مجمع سكني بالقرم' },
    category: 'joinery',
    location: { en: 'Qurum, Muscat', ar: 'القرم، مسقط' },
    image: project03,
  },
  {
    id: 'project-04',
    title: { en: '3D Signage Installation — Seeb Mall', ar: 'تركيب لوحات ثلاثية الأبعاد — مول السيب' },
    category: 'signage',
    location: { en: 'Seeb, Muscat', ar: 'السيب، مسقط' },
    image: project04,
  },
  {
    id: 'project-05',
    title: { en: 'Office Fitout — Ruwi Business District', ar: 'تشطيبات مكتبية — منطقة روي التجارية' },
    category: 'fitout-construction',
    location: { en: 'Ruwi, Muscat', ar: 'روي، مسقط' },
    image: project05,
  },
  {
    id: 'project-06',
    title: { en: 'Facade Cleaning — Qurum Tower', ar: 'تنظيف واجهات — برج القرم' },
    category: 'cleaning-services',
    location: { en: 'Qurum, Muscat', ar: 'القرم، مسقط' },
    image: project06,
  },
  {
    id: 'project-07',
    title: { en: 'Kitchen Joinery — Al Mouj Villa', ar: 'أعمال نجارة مطابخ — فيلا الموج' },
    category: 'joinery',
    location: { en: 'Al Mouj, Muscat', ar: 'الموج، مسقط' },
    image: project07,
  },
  {
    id: 'project-08',
    title: { en: 'Wayfinding Signage — Muscat Grand Mall', ar: 'لوحات إرشادية — مسقط جراند مول' },
    category: 'signage',
    location: { en: 'Bawshar, Muscat', ar: 'بوشر، مسقط' },
    image: project08,
  },
];
