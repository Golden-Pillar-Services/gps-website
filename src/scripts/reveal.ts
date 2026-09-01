// Scroll-triggered blur/fade/rise reveal system.
// Any element marked `data-reveal` animates opacity 0→1, translateY 24px→0,
// and blur 8px→0 once it crosses 20% visibility. `data-reveal-delay="1..6"`
// staggers the animation start in steps of 80ms.
// Respects `prefers-reduced-motion`: reduced-motion users get elements shown
// immediately, with no animation and no risk of being stuck invisible.

const mq = matchMedia('(prefers-reduced-motion: reduce)');

export function initReveals(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (mq.matches) {
    els.forEach((e) => e.classList.add('revealed'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          const el = en.target as HTMLElement;
          const d = Number(el.dataset.revealDelay ?? 0) * 80;
          setTimeout(() => el.classList.add('revealed'), d);
          io.unobserve(el);
        }
      }
    },
    { threshold: 0.2 },
  );

  els.forEach((e) => io.observe(e));
}
