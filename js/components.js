const componentCache = new Map();

async function loadComponent(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;
  if (!componentCache.has(path)) {
    componentCache.set(path, fetch(path).then(response => {
      if (!response.ok) throw new Error(`No se pudo cargar ${path}`);
      return response.text();
    }));
  }
  target.innerHTML = await componentCache.get(path);
}

async function loadSiteComponents() {
  await Promise.all([
    loadComponent('#site-header', 'components/nav.html'),
    loadComponent('#site-footer', 'components/footer.html')
  ]);
}
