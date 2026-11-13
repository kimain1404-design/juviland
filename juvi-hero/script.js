(() => {
  // iframe 안에 삽입된 경우 스크롤바가 생기지 않도록 표시
  if (window.self !== window.top) document.documentElement.classList.add('is-embed');

  const hero = document.getElementById('hero');
  if (!hero) return;

  // 모션 최소화 설정이면 완성된 화면을 그대로 보여줌
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  hero.classList.add('js-ready');

  // 섹션이 화면에 들어오면 등장 모션 1회 재생
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      hero.classList.add('is-in');
      io.disconnect();
    }
  }, { threshold: 0.15 });
  io.observe(hero);
})();
