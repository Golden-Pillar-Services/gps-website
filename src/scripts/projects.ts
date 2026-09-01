// Projects page: category filter pills (class-based fade, matching the
// reveal/timeline pattern elsewhere) + a native <dialog> lightbox with
// keyboard/swipe navigation.
//
// Direction handling: the Next/Previous *buttons* always mean "next/previous
// item in list order" — unambiguous regardless of language, and their
// screen position already flips for RTL because they're placed with
// inset-inline-start/end in CSS. Arrow keys and swipe gestures are
// *physical* directions, so they're mapped to reading direction instead:
// in LTR, right = forward (next); in RTL, left = forward (next), since
// that is the direction reading — and therefore "moving on" — proceeds.
// This mirrors the WAI-ARIA carousel pattern's RTL guidance.

const FADE_MS = 250;
const SWIPE_THRESHOLD = 40;

export function initProjects(): void {
  const grid = document.querySelector<HTMLElement>('[data-project-grid]');
  const dialogEl = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  if (!grid || !dialogEl) return;
  // Nested function declarations below don't retain the narrowing above, so
  // bind a definitely-non-null alias for them to close over instead.
  const dialog: HTMLDialogElement = dialogEl;

  const cards = Array.from(grid.querySelectorAll<HTMLButtonElement>('[data-project-card]'));
  const pills = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));

  const image = dialog.querySelector<HTMLImageElement>('[data-lightbox-image]');
  const titleEl = dialog.querySelector<HTMLElement>('[data-lightbox-title]');
  const locationEl = dialog.querySelector<HTMLElement>('[data-lightbox-location]');
  const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]');
  const prevBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const statusEl = document.querySelector<HTMLElement>('[data-filter-status]');

  if (!image || !closeBtn || !prevBtn || !nextBtn) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isRtl = () => document.documentElement.dir === 'rtl';

  let visibleCards: HTMLButtonElement[] = cards;
  let currentIndex = -1;

  // --- Filter ---

  function applyFilter(filter: string): void {
    // Each card's deferred rAF/timeout callback re-checks `targetState`
    // before acting, rather than assuming it's still the most recent
    // request. Without that guard, toggling the filter twice in quick
    // succession — show, then hide again before the first rAF has fired —
    // would let the stale "show" callback remove `is-hidden` after the
    // "hide" branch just added it, leaving the card wrongly visible.
    for (const card of cards) {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.dataset.targetState = matches ? 'show' : 'hide';

      if (matches) {
        card.hidden = false;
        if (reducedMotion) {
          card.classList.remove('is-hidden');
        } else {
          requestAnimationFrame(() => {
            if (card.dataset.targetState === 'show') card.classList.remove('is-hidden');
          });
        }
      } else {
        card.classList.add('is-hidden');
        if (reducedMotion) {
          card.hidden = true;
        } else {
          window.setTimeout(() => {
            if (card.dataset.targetState === 'hide') card.hidden = true;
          }, FADE_MS);
        }
      }
    }

    visibleCards = cards.filter((c) => c.dataset.category === filter || filter === 'all');

    for (const pill of pills) {
      const active = pill.dataset.filter === filter;
      pill.setAttribute('aria-pressed', String(active));
    }

    if (statusEl) {
      statusEl.textContent = String(visibleCards.length);
    }

    // The lightbox indexes into `visibleCards`; if the filter changes while
    // it's open, that index set is no longer valid, so close it rather than
    // risk arrow/swipe nav landing on the wrong (or a hidden) project.
    if (dialog.open) dialog.close();
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => applyFilter(pill.dataset.filter ?? 'all'));
  });

  // --- Lightbox ---

  function renderCurrent(): void {
    const card = visibleCards[currentIndex];
    if (!card || !image) return;
    image.src = card.dataset.fullSrc ?? '';
    image.alt = card.dataset.alt ?? '';
    if (titleEl) titleEl.textContent = card.dataset.title ?? '';
    if (locationEl) locationEl.textContent = card.dataset.location ?? '';
  }

  function step(delta: 1 | -1): void {
    if (visibleCards.length === 0) return;
    currentIndex = (currentIndex + delta + visibleCards.length) % visibleCards.length;
    renderCurrent();
  }

  const goNext = () => step(1);
  const goPrev = () => step(-1);

  /** Map a physical left/right direction to next/prev, reading-direction aware. */
  function handleDirection(dir: 'left' | 'right'): void {
    const isForward = isRtl() ? dir === 'left' : dir === 'right';
    if (isForward) goNext();
    else goPrev();
  }

  function openLightbox(card: HTMLButtonElement): void {
    const index = visibleCards.indexOf(card);
    if (index === -1) return;
    currentIndex = index;
    renderCurrent();
    if (!dialog.open) dialog.showModal();
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => openLightbox(card));
  });

  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);
  closeBtn.addEventListener('click', () => dialog.close());

  // Escape-to-close and the native focus trap are both handled by the
  // dialog element itself via showModal()/close() — no extra JS needed.

  // Click on the backdrop area (the dialog element itself, not its inner
  // content wrapper) closes it.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleDirection('right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleDirection('left');
    }
  });

  dialog.addEventListener('close', () => {
    if (image) image.src = '';
  });

  // --- Swipe ---

  let touchStartX = 0;

  dialog.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0]?.clientX ?? 0;
    },
    { passive: true },
  );

  dialog.addEventListener(
    'touchend',
    (e) => {
      const endX = e.changedTouches[0]?.clientX ?? touchStartX;
      const dx = endX - touchStartX;
      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      handleDirection(dx < 0 ? 'left' : 'right');
    },
    { passive: true },
  );
}
