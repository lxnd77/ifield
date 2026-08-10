/**
 * Scroll reveal — adds `.is-visible` to every `.reveal` element as it
 * enters the viewport, then stops observing it.
 *
 * Thresholds match the homepage design source: 8% visible, with a 30px
 * bottom margin so an element resolves just before it is fully in frame.
 *
 * Under `prefers-reduced-motion` the CSS already renders `.reveal` at
 * full opacity, so this simply does nothing rather than leaving content
 * invisible — the usual failure mode when motion is disabled.
 */

const REVEAL_SELECTOR = '.reveal:not(.is-visible)';

export function initReveal(root: ParentNode = document): void {
  const elements = root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
  if (elements.length === 0) return;

  if (
    typeof IntersectionObserver === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
  );

  elements.forEach((el) => observer.observe(el));
}
