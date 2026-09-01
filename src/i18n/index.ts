export type Lang = 'en' | 'ar';
export const langs: Lang[] = ['en', 'ar'];
export const dirFor = (l: Lang) => (l === 'ar' ? 'rtl' : 'ltr');
export const localePath = (l: Lang, p: string) => `/${l}${p === '/' ? '/' : p}`;
export const altPath = (l: Lang, current: string) => {
  const other = l === 'en' ? 'ar' : 'en';
  return current.replace(/^\/(en|ar)/, `/${other}`);
};
export { en } from './en';
export { ar } from './ar';
import { en } from './en';
import { ar } from './ar';
export const t = (l: Lang) => (l === 'ar' ? ar : en);
export type Dict = typeof en;
