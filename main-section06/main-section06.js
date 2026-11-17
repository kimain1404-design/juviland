(() => {
  // iframe 안에 삽입된 경우 스크롤바가 생기지 않도록 표시
  if (window.self !== window.top) document.documentElement.classList.add('is-embed');

  const section = document.querySelector('.ppl');
  if (!section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  // 머리말 → 대표 카드 → 이력 1·2·3·4 → 함께하는 전문가
  const items = [...section.querySelectorAll('.reveal')]
    .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
  document.documentElement.classList.add('js-ready');

  const GAP = 140;
  let shown = -1;
  let queue = Promise.resolve();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const revealUpTo = (i) => {
    queue = queue.then(async () => {
      while (shown < i) {
        shown += 1;
        items[shown].classList.add('is-in');
        if (shown < i) await wait(GAP);
      }
    });
  };

  // 다른 도메인 iframe 안에서는 rootMargin이 무시되므로 threshold만 사용
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      revealUpTo(items.indexOf(e.target));
      io.unobserve(e.target);
    });
  }, { threshold: 0.2 });
  items.forEach((el) => io.observe(el));
})();
