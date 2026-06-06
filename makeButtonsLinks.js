document.addEventListener('DOMContentLoaded', function () {
  function slugify(str) {
    return str
      .normalize('NFD')
      .replace(/[\u0000-\u036f]/g, '')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  const mapping = [
    { keywords: ['formation', 'formations'], href: 'formations.html' },
    { keywords: ['service', 'services', 'langues', 'modules', 'explorer', 'voir'], href: 'services.html' },
    { keywords: ['contact', 'rendez', 'prendre'], href: 'contact.html' },
    { keywords: ['procéd', 'procedure', 'procedures', 'procédures'], href: 'procedures.html' },
    { keywords: ['a propos', 'propos', 'à propos'], href: 'about.html' },
    { keywords: ['accueil'], href: 'index.html' },
  ];

  function resolveHref(text) {
    const t = (text || '').toLowerCase();
    for (const m of mapping) {
      for (const k of m.keywords) {
        if (t.includes(k)) return m.href;
      }
    }
    const words = t.replace(/[^\w\s-]/g, '').split(/\s+/).filter(Boolean);
    if (words.length) return slugify(words[words.length - 1]) + '.html';
    return '#';
  }

  document.querySelectorAll('button.cta').forEach((btn) => {
    try {
      if (btn.id === 'accept-cookies') return;
      if (btn.type === 'submit' && btn.form) return;

      const href = resolveHref(btn.innerText || btn.textContent || '');
      const a = document.createElement('a');
      a.className = btn.className || '';
      if (btn.id) a.id = btn.id;
      // copy data-* attributes
      Array.from(btn.attributes).forEach((attr) => {
        if (attr.name.startsWith('data-')) a.setAttribute(attr.name, attr.value);
      });
      if (btn.getAttribute('target')) a.setAttribute('target', btn.getAttribute('target'));
      a.href = href;
      a.innerHTML = btn.innerHTML;
      btn.parentNode.replaceChild(a, btn);
    } catch (e) {
      // fail silently
      console.error('makeButtonsLinks error', e);
    }
  });
});
