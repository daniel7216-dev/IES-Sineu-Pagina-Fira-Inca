(function () {
  'use strict';

  const root = document.body.dataset.root || './';
  const path = window.location.pathname;

  function active(keyword) {
    return path.includes(keyword) ? ' class="active"' : '';
  }

  function activeHome() {
    return (path === '/' || path.endsWith('/index.html')) ? ' class="active"' : '';
  }

  /* ── NAV ── */
  const navHTML = `
<nav class="nav" id="main-nav">
  <a class="nav-brand" href="${root}index.html">
    <img src="${root}media/logo.png" alt="IES Sineu" />
    <span>IES Sineu</span>
  </a>
  <div class="nav-tabs" id="nav-tabs">
    <a href="${root}index.html"${activeHome()}>Inici</a>
    <a href="${root}centre/"${active('/centre/')}>Centre</a>
    <a href="${root}cursos/"${active('/cursos/')}>Cursos</a>
    <a href="${root}apps/"${active('/apps/')}>Apps</a>
    <a href="${root}joc/"${active('/joc/')}>Guanya un dau</a>
  </div>
  <button class="nav-hamburger" id="nav-hamburger" aria-label="Men\u00fa" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>`;

  /* ── FOOTER ── */
  const footerHTML = `
<footer class="site-footer">
  <img src="${root}media/logo.png" alt="IES Sineu" />
  <span>P\u00e0gina feta per l'IES Sineu</span>
</footer>`;

  const navEl = document.getElementById('site-nav');
  if (navEl) navEl.outerHTML = navHTML;

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.outerHTML = footerHTML;

  /* ── HAMBURGER ── */
  const hamburger = document.getElementById('nav-hamburger');
  const tabs      = document.getElementById('nav-tabs');
  if (hamburger && tabs) {
    hamburger.addEventListener('click', () => {
      const isOpen = tabs.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.classList.toggle('open', isOpen);
    });
    tabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        tabs.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('#main-nav')) {
        tabs.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
