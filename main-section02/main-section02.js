(() => {
  // iframe 안에 삽입된 경우 스크롤바가 생기지 않도록 표시
  if (window.self !== window.top) document.documentElement.classList.add('is-embed');

  const section = document.querySelector('.why');
  if (!section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  /* ---------- 숫자 카운트 ---------- */
  const counters = [...section.querySelectorAll('.count')];
  const fmt = (n, comma) => (comma ? Math.round(n).toLocaleString('en-US') : String(Math.round(n)));
  const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
  // 최종 숫자 폭을 미리 고정해 카운트 중 '명', '%'가 흔들리지 않게 함
  const lockWidths = () => counters.forEach((el) => {
    el.style.minWidth = '';
    const txt = el.textContent;
    el.textContent = fmt(Number(el.dataset.to), el.hasAttribute('data-comma'));
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    el.textContent = txt;
  });
  counters.forEach((el) => { el.textContent = fmt(0, el.hasAttribute('data-comma')); });
  lockWidths();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(lockWidths);
  window.addEventListener('resize', lockWidths);

  const countUp = (el) => {
    const to = Number(el.dataset.to);
    const comma = el.hasAttribute('data-comma');
    const dur = to > 1000 ? 1600 : 1200;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(to * easeOutExpo(t), comma);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- 순서대로 등장 ---------- */
  // 머리말 → (모바일) 지표 카드 테두리 → 지표 1·2·3 → 마무리
  const items = [...section.querySelectorAll('.reveal')]
    .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
  document.documentElement.classList.add('js-ready');

  const GAP = 160;
  let shown = -1;
  let queue = Promise.resolve();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const show = (el) => {
    el.classList.add('is-in');
    const c = el.classList.contains('metric') ? el.querySelector('.count') : null;
    if (c) setTimeout(() => countUp(c), 250);
  };
  const revealUpTo = (i) => {
    queue = queue.then(async () => {
      while (shown < i) {
        shown += 1;
        show(items[shown]);
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
  }, { threshold: 0.25 });
  items.forEach((el) => io.observe(el));
})();
