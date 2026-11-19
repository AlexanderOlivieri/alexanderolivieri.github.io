const sectionFiles = [
  ['inicio', 'html/inicio.html'],
  ['sobre-mi', 'html/about.html'],
  ['proyectos', 'html/proyectos.html'],
  ['habilidades', 'html/habilidades.html'],
  ['cv', 'html/cv.html'],
  ['contacto', 'html/contacto.html']
];

async function loadSections() {
  const main = document.getElementById('portfolio-content');
  const sections = await Promise.all(sectionFiles.map(async ([id, path]) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
    return response.text();
  }));
  main.innerHTML = sections.join('\n');
}

function initNavigation() {
  const links = document.querySelectorAll('.nav__link, .footer__nav a, a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', event => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('nav__link--active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

function initSearch() {
  const input = document.getElementById('search');
  if (!input) return;
  const sections = document.querySelectorAll('main section');
  input.addEventListener('keydown', event => {
    if (event.key !== 'Enter') return;
    const query = input.value.trim().toLowerCase();
    if (!query) return;
    const found = Array.from(sections).find(section =>
      section.id.toLowerCase().includes(query) || section.textContent.toLowerCase().includes(query)
    );
    if (found) found.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else alert('No se encontró ninguna sección.');
  });
}

(async function initPortfolio() {
  try {
    await Promise.all([loadSiteComponents(), loadSections()]);
    initNavigation();
    initSearch();
  } catch (error) {
    const main = document.getElementById('portfolio-content');
    if (main) main.innerHTML = '<section class="section section--dark"><div class="container"><h2>No se pudo cargar el portafolio.</h2><p>Verifica que el sitio se esté ejecutando desde un servidor web.</p></div></section>';
    console.error(error);
  }
})();
