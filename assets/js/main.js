(() => {
  const header = document.querySelector('.site-header');
  const waFloat = document.querySelector('.wa-float');

  /* Sombra no cabeçalho e botão flutuante conforme a rolagem */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    waFloat.classList.toggle('show', y > window.innerHeight * 0.7);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Animações de entrada */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* Menu: destaca a seção visível e, no celular, desliza a linha até o link ativo */
  const menu = document.querySelector('.nav ul');
  const links = [...document.querySelectorAll('.nav ul a')];
  const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  // seções sem link (início e "além da medicina") limpam o destaque
  ['#inicio', '#alem'].forEach((sel) => { const s = document.querySelector(sel); if (s) sections.push(s); });

  const setActive = (id) => {
    // de volta ao topo: a linha do menu volta para o começo
    if (id === 'inicio') menu.scrollTo({ left: 0, behavior: 'smooth' });
    links.forEach((l) => {
      const on = l.getAttribute('href') === `#${id}`;
      l.classList.toggle('active', on);
      if (on && menu.scrollWidth > menu.clientWidth) {
        menu.scrollTo({ left: l.offsetLeft - menu.offsetLeft - 16, behavior: 'smooth' });
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* Ano no rodapé */
  const year = document.getElementById('ano');
  if (year) year.textContent = new Date().getFullYear();
})();
