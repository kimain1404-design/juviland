(() => {
  const isEmbed = window.self !== window.top;
  if (isEmbed) document.documentElement.classList.add('is-embed');

  const section = document.querySelector('.sol');
  if (!section) return;
  const list = section.querySelector('.sol__list');
  const cards = [...section.querySelectorAll('.card')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasIO = 'IntersectionObserver' in window;

  /* =======================================================
     1. 등장 : 헤더 → 01 → 05 순서로 아래에서 올라옴
     ======================================================= */
  if (!reduced && hasIO) {
    const items = [...section.querySelectorAll('.reveal')];
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
  }

  /* =======================================================
     2. 카드 쌓기 : 01 위로 02, 02 위로 03 … 가 겹쳐짐
        · 일반 페이지 : CSS sticky + 덮이는 정도(--p)만 계산
        · iframe 안   : 부모 스크롤을 감지해 sticky를 직접 재현
     ======================================================= */
  const px = (v) => parseFloat(v) || 0;
  const rootVar = (name) => px(getComputedStyle(document.documentElement).getPropertyValue(name));
  let raf = 0;
  const schedule = (fn) => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; fn(); }); };

  const setDepth = (i, p) => {
    if (reduced) return;
    cards[i].style.setProperty('--p', p.toFixed(3));
  };

  if (!isEmbed) {
    // ---------- 일반 페이지 ----------
    const update = () => {
      for (let i = 0; i < cards.length - 1; i += 1) {
        const next = cards[i + 1];
        const h = next.offsetHeight;
        const stuck = px(getComputedStyle(next).top);
        const d = next.getBoundingClientRect().top - stuck;
        setDepth(i, Math.min(1, Math.max(0, 1 - d / h)));
      }
    };
    window.addEventListener('scroll', () => schedule(update), { passive: true });
    window.addEventListener('resize', () => schedule(update));
    update();
    return;
  }

  // ---------- iframe 안 ----------
  if (!hasIO) return;

  // 섹션 전체에 6px 간격으로 보이지 않는 점(probe)을 깔고,
  // 화면에 보이는 점의 범위로 "부모 화면이 섹션의 어디를 보고 있는지" 계산
  const STEP = 6;
  let probes = [];
  const visible = new Set();
  let viewTop = 0;          // 부모 화면 맨 위가 섹션의 몇 px 지점인지
  let viewH = 800;          // 부모 화면 높이 (추정)

  const probeIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const k = +e.target.dataset.k;
      if (e.isIntersecting) visible.add(k); else visible.delete(k);
    });
    if (!visible.size) return;
    let lo = Infinity, hi = -Infinity;
    visible.forEach((k) => { if (k < lo) lo = k; if (k > hi) hi = k; });
    viewTop = lo === 0 ? 0 : lo * STEP;
    if (lo > 0 && hi < probes.length - 1) viewH = (hi - lo) * STEP;
    schedule(layout);
  }, { threshold: 0 });

  const buildProbes = () => {
    probes.forEach((p) => { probeIO.unobserve(p); p.remove(); });
    visible.clear();
    const n = Math.ceil(section.offsetHeight / STEP) + 1;
    const frag = document.createDocumentFragment();
    probes = Array.from({ length: n }, (_, k) => {
      const p = document.createElement('i');
      p.className = 'stack-probe';
      p.dataset.k = k;
      p.style.top = `${k * STEP}px`;
      frag.appendChild(p);
      return p;
    });
    section.appendChild(frag);
    probes.forEach((p) => probeIO.observe(p));
  };

  // 카드의 원래 위치(섹션 기준)
  let tops = [];
  let listBottom = 0;
  // offsetTop은 등장 모션(transform)의 영향을 받지 않음 (.sol 기준)
  const measure = () => {
    tops = cards.map((c) => c.offsetTop);
    listBottom = list.offsetTop + list.offsetHeight;
  };

  function layout() {
    const base = rootVar('--stack-top');
    const step = rootVar('--stack-step');
    const shifts = cards.map((c, i) => {
      const h = c.offsetHeight;
      const stickAt = Math.min(base, viewH - h - 24) + i * step;   // CSS의 top 과 같은 식
      const want = viewTop + stickAt - tops[i];
      const max = listBottom - tops[i] - h;
      return { s: Math.min(Math.max(want, 0), Math.max(max, 0)), stickAt, h };
    });
    shifts.forEach(({ s }, i) => { cards[i].style.translate = `0 ${s.toFixed(1)}px`; });
    for (let i = 0; i < cards.length - 1; i += 1) {
      const n = shifts[i + 1];
      const nextTopInView = tops[i + 1] + n.s - viewTop;
      const d = nextTopInView - n.stickAt;
      setDepth(i, Math.min(1, Math.max(0, 1 - d / n.h)));
    }
  }

  const init = () => { measure(); buildProbes(); layout(); };
  if (document.readyState === 'complete') init(); else window.addEventListener('load', init);
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(init, 150); });
})();
