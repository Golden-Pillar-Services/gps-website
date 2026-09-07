// Shared class strings for Button.astro and WhatsAppChooser.astro so a
// dropdown trigger looks pixel-identical to a plain CTA link in the same
// variant, whether it's rendered as <a> or as a <summary>.
export type ButtonVariant = 'gold' | 'outline' | 'ghost-light';

export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300';

export const buttonVariants: Record<ButtonVariant, string> = {
  gold: 'bg-gold text-charcoal shadow-[0_8px_24px_-8px_rgba(201,147,43,0.55)] hover:bg-gold-light hover:shadow-[0_10px_28px_-6px_rgba(201,147,43,0.6)] hover:-translate-y-0.5',
  outline: 'border border-gold text-gold hover:bg-gold hover:text-charcoal',
  'ghost-light': 'gp-btn-ghost text-ivory',
};
