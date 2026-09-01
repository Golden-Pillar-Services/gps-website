// Journey timeline entrance animation (About page).
// On first scroll-into-view, adds `.is-drawn` to `[data-timeline]`, which
// triggers (via CSS, see Timeline.astro): the rail's scaleX/scaleY draw-in,
// markers popping in stagger, and cards blur-revealing. Hover/focus lift is
// pure CSS and needs no JS.
// Respects prefers-reduced-motion: the class is applied immediately with no
// animation, matching the guard pattern in reveal.ts/counters.ts.

const mq = matchMedia('(prefers-reduced-motion: reduce)');

export function initTimeline(): void {
  const el = document.querySelector<HTMLElement>('[data-timeline]');
  if (!el) return;

  if (mq.matches) {
    el.classList.add('is-drawn');
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add('is-drawn');
          io.unobserve(el);
        }
      }
    },
    { threshold: 0.2 },
  );

  io.observe(el);
}
