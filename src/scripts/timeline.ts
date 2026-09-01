// Journey timeline entrance animation (About page).
// On first scroll-into-view, adds `.is-drawn` to `[data-timeline]`, which
// triggers (via CSS, see Timeline.astro): the rail's scaleX/scaleY draw-in,
// markers popping in stagger, and cards blur-revealing. Hover/focus lift is
// pure CSS and needs no JS.
// Respects prefers-reduced-motion: the class is applied immediately with no
// animation, matching the guard pattern in reveal.ts/counters.ts.

const mq = matchMedia('(prefers-reduced-motion: reduce)');
const desktopMq = matchMedia('(min-width: 1024px)');

/**
 * Desktop rail sizing: the rail is `position: absolute` inside the
 * scrolling `<ol>` (see Timeline.astro), sized in CSS with a
 * `calc(100% - 3rem)` fallback that only covers the *visible* width, not
 * the full scrollable content (5 milestones wider than the container). So
 * on desktop we measure the true first/last marker positions and set an
 * exact inline `left`/`width` spanning between their centers — this stays
 * correct while scrolling because the rail's containing block (the `<ol>`)
 * is itself the scrolling element, so out-of-flow descendants scroll in
 * lockstep with in-flow content. On mobile the CSS-only vertical rail
 * (top:0; bottom:0) is already correct, so we clear any inline overrides.
 */
function positionRail(): void {
  const list = document.querySelector<HTMLElement>('[data-timeline-list]');
  const rail = document.querySelector<HTMLElement>('[data-timeline-rail]');
  if (!list || !rail) return;

  if (!desktopMq.matches) {
    rail.style.removeProperty('left');
    rail.style.removeProperty('width');
    return;
  }

  const markers = Array.from(list.querySelectorAll<HTMLElement>('.gp-timeline-marker-wrap'));
  if (markers.length < 2) return;

  const listRect = list.getBoundingClientRect();
  const firstRect = markers[0].getBoundingClientRect();
  const lastRect = markers[markers.length - 1].getBoundingClientRect();
  const firstCenter = firstRect.left + firstRect.width / 2 - listRect.left + list.scrollLeft;
  const lastCenter = lastRect.left + lastRect.width / 2 - listRect.left + list.scrollLeft;
  const start = Math.min(firstCenter, lastCenter);
  const width = Math.abs(lastCenter - firstCenter);

  rail.style.left = `${start}px`;
  rail.style.width = `${width}px`;
}

export function initTimeline(): void {
  const el = document.querySelector<HTMLElement>('[data-timeline]');
  if (!el) return;

  positionRail();
  window.addEventListener('resize', positionRail);
  window.addEventListener('load', positionRail);

  if (mq.matches) {
    el.classList.add('is-drawn');
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          el.classList.add('is-drawn');
          positionRail();
          io.unobserve(el);
        }
      }
    },
    { threshold: 0.2 },
  );

  io.observe(el);
}
