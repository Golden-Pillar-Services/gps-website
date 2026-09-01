// Animated stat counters. Any element marked `data-counter="1240"` counts up
// from 0 to the target value over 1.6s once it becomes visible.
// Numbers are formatted with Intl.NumberFormat. For Arabic pages we
// deliberately use the `ar-OM` locale (not `ar`/`ar-EG`) — Gulf business
// convention keeps Western (0-9) digits rather than Eastern Arabic numerals,
// and `ar-OM` formats with Western digits by default.
// Respects `prefers-reduced-motion`: reduced-motion users see the final
// value immediately, with no counting animation.

const mq = matchMedia('(prefers-reduced-motion: reduce)');
const DURATION_MS = 1600;

function localeFor(): string {
  const lang = document.documentElement.lang;
  return lang === 'ar' ? 'ar-OM' : 'en-OM';
}

function formatValue(value: number, formatter: Intl.NumberFormat): string {
  return formatter.format(Math.round(value));
}

function animateCounter(el: HTMLElement, target: number, formatter: Intl.NumberFormat): void {
  const start = performance.now();

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION_MS, 1);
    // ease-out for a natural deceleration into the final value
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatValue(target * eased, formatter);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = formatValue(target, formatter);
    }
  }

  requestAnimationFrame(tick);
}

export function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>('[data-counter]');
  const formatter = new Intl.NumberFormat(localeFor());

  if (mq.matches) {
    els.forEach((el) => {
      const target = Number(el.dataset.counter ?? 0);
      el.textContent = formatValue(target, formatter);
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          const el = en.target as HTMLElement;
          const target = Number(el.dataset.counter ?? 0);
          animateCounter(el, target, formatter);
          io.unobserve(el);
        }
      }
    },
    { threshold: 0.2 },
  );

  els.forEach((e) => io.observe(e));
}
