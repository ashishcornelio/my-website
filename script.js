(() => {
  const loader = document.querySelector('.preloader');
  let loaderHidden = false;
  const hideLoader = () => {
    if (loaderHidden) return;
    loaderHidden = true;
    loader?.classList.add('done');
  };
  const loaderFallback = setTimeout(hideLoader, 5000);
  window.addEventListener('load', () => {
    clearTimeout(loaderFallback);
    setTimeout(hideLoader, 1250);
  }, { once: true });
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    }), { threshold: .12, rootMargin: '0px 0px -35px 0px' });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('visible'));

  const bar = document.querySelector('.progress i');
  const update = () => { const max = document.documentElement.scrollHeight - innerHeight; bar.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`; };
  addEventListener('scroll', update, { passive: true }); update();

  const dot = document.querySelector('.dot'), ring = document.querySelector('.ring');
  if (matchMedia('(pointer:fine)').matches) {
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; });
    const cursor = () => { dot.style.left = `${x}px`; dot.style.top = `${y}px`; rx += (x-rx)*.16; ry += (y-ry)*.16; ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; requestAnimationFrame(cursor); };
    cursor();
    document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter', () => ring.classList.add('hover')); el.addEventListener('mouseleave', () => ring.classList.remove('hover')); });
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('pointermove', e => { const r=el.getBoundingClientRect(); el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`; });
      el.addEventListener('pointerleave', () => el.style.transform='');
    });
  }
  const menu = document.querySelector('.menu'), nav = document.querySelector('nav');
  menu?.addEventListener('click', () => nav.classList.toggle('open'));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  const orbit = document.querySelector('.orbit');
  addEventListener('pointermove', e => { if (orbit && matchMedia('(pointer:fine)').matches) { orbit.style.marginLeft=`${(e.clientX/innerWidth-.5)*12}px`; orbit.style.marginTop=`${(e.clientY/innerHeight-.5)*12}px`; } }, { passive:true });
})();
