(() => {
  // iframe 안에 삽입된 경우 스크롤바가 생기지 않도록 표시
  if (window.self !== window.top) document.documentElement.classList.add('is-embed');

  const section = document.querySelector('.road');
  if (!section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  // 숨김 상태로 준비 → 섹션이 화면에 25% 들어오면 한 번만 재생
  // 각 요소의 순서·지연은 CSS의 --d 값으로 정해짐 (STEP 01 → 02 → 03 → 진로 선택 → 연결선 → 두 트랙 → 리더)
  document.documentElement.classList.add('js-ready');

  // 다른 도메인 iframe 안에서는 rootMargin이 무시되므로 threshold만 사용
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      section.classList.add('is-in');
      io.disconnect();
    });
  }, { threshold: 0.25 });
  io.observe(section);
})();
