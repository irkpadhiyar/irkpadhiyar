/**
 * app.js — Tab manager, file navigation, activity bar, typing animation.
 */

const App = (() => {

  let openTabs    = [];
  let activeFile  = null;
  let typingTimer = null;

  const FILES = [
    { name: 'home.tsx',      icon: '⚛',  dot: 'dot-tsx',  label: 'home.tsx'       },
    { name: 'experience.ts', icon: '📋', dot: 'dot-ts',   label: 'experience.ts'  },
    { name: 'skills.css',    icon: '🎨', dot: 'dot-css',  label: 'skills.css'     },
    { name: 'projects.json', icon: '{}', dot: 'dot-json', label: 'projects.json'  },
    { name: 'about.md',      icon: '📝', dot: 'dot-md',   label: 'about.md'       },
    { name: 'contact.html',  icon: '✉',  dot: 'dot-html', label: 'contact.html'   },
  ];

  /* Topbar nav IDs mapped to filenames */
  const TOPBAR_MAP = {
    'home.tsx':      'tnav-about',
    'experience.ts': 'tnav-experience',
    'skills.css':    'tnav-skills',
    'projects.json': 'tnav-projects',
    'contact.html':  'tnav-contact',
  };

  const el = id => document.getElementById(id);

  /* ── Splash ──────────────────────────────────────── */
  function hideSplash() {
    setTimeout(() => {
      el('splash').classList.add('hidden');
      openFile('home.tsx');
      setTimeout(startTypingAnimation, 700);
    }, 2000);
  }

  /* ── Build file tree ─────────────────────────────── */
  const EXT_META = {
    tsx:  { bg: '#61afef', color: '#fff',    label: 'TSX'  },
    ts:   { bg: '#3178c6', color: '#fff',    label: 'TS'   },
    css:  { bg: '#7b50c8', color: '#fff',    label: 'CSS'  },
    json: { bg: '#cbcb41', color: '#1a1a1a', label: 'JSON' },
    md:   { bg: '#4a90d9', color: '#fff',    label: 'MD'   },
    html: { bg: '#e44d26', color: '#fff',    label: 'HTML' },
  };

  function buildFileTree() {
    const list = el('file-tree-list');
    if (!list) return;
    list.innerHTML = '';
    FILES.forEach(f => {
      const ext  = f.name.split('.').pop();
      const meta = EXT_META[ext] || { bg: '#666', color: '#fff', label: ext.toUpperCase() };
      const li   = document.createElement('li');
      li.className = 'file-item';
      li.dataset.file = f.name;
      li.innerHTML = `
        <span class="file-ext-badge" style="background:${meta.bg};color:${meta.color}">${meta.label}</span>
        <span class="file-name">${f.name}</span>`;
      li.addEventListener('click', () => openFile(f.name));
      list.appendChild(li);
    });
  }

  /* ── Open file ───────────────────────────────────── */
  function openFile(filename) {
    activeFile = filename;
    if (!openTabs.includes(filename)) openTabs.push(filename);

    renderTabs();
    renderEditorContent(filename);
    updateSidebarActive(filename);
    updateActivityBarActive(filename);
    updateStatusBar(filename);
    updateTopbar(filename);
  }

  /* ── Close tab ───────────────────────────────────── */
  function closeTab(filename, e) {
    e.stopPropagation();
    if (filename === 'home.tsx') return; // home tab is always pinned
    const idx = openTabs.indexOf(filename);
    openTabs.splice(idx, 1);
    if (activeFile === filename) {
      openFile(openTabs[Math.max(0, idx - 1)] || 'home.tsx');
      return;
    }
    renderTabs();
  }

  /* ── Render tab bar ──────────────────────────────── */
  function renderTabs() {
    const bar = el('tab-bar');
    if (!bar) return;
    bar.innerHTML = '';
    openTabs.forEach(filename => {
      const info = FILES.find(f => f.name === filename) || { icon: '📄', dot: '' };
      const tab = document.createElement('div');
      tab.className = `tab${filename === activeFile ? ' active' : ''}`;
      tab.dataset.file = filename;
      const pinned = filename === 'home.tsx';
      tab.innerHTML = `
        <span class="tab-title">${filename}</span>
        ${pinned ? '<span class="tab-pin" title="Pinned">⚲</span>' : '<span class="tab-close" title="Close">×</span>'}`;
      tab.addEventListener('click', () => openFile(filename));
      if (!pinned) tab.querySelector('.tab-close').addEventListener('click', e => closeTab(filename, e));
      bar.appendChild(tab);
    });
  }

  /* ── Render editor content ───────────────────────── */
  function renderEditorContent(filename) {
    const content = el('editor-content');
    if (!content) return;

    content.innerHTML = Renderer.renderSection(filename);
    const section = content.querySelector('.section');
    if (section) section.classList.add('active');

    /* Trigger reveal animations */
    setTimeout(() => {
      content.querySelectorAll('.reveal').forEach((node, i) => {
        setTimeout(() => node.classList.add('visible'), i * 55);
      });
    }, 60);

    /* Animate skill progress bars */
    setTimeout(() => {
      content.querySelectorAll('.skill-fill[data-pct]').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }, 150);

    content.scrollTop = 0;
    syncLineNumbers();

    /* Project filter buttons */
    content.querySelectorAll('.proj-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        content.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        content.querySelectorAll('.proj-card').forEach(card => {
          card.style.display = (filter === 'all' || card.classList.contains('feat')) ? '' : 'none';
        });
      });
    });
  }

  /* ── Sidebar active ──────────────────────────────── */
  function updateSidebarActive(filename) {
    document.querySelectorAll('.file-item').forEach(item => {
      item.classList.toggle('active', item.dataset.file === filename);
    });
  }

  /* ── Activity bar active ─────────────────────────── */
  function updateActivityBarActive(filename) {
    document.querySelectorAll('.activity-btn[data-file]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.file === filename);
    });
  }

  /* ── Status bar ──────────────────────────────────── */
  function updateStatusBar(filename) {
    const fl = el('status-file-label');
    const ll = el('status-lang-label');
    if (fl) fl.textContent = filename || '';
    if (ll) ll.textContent = filename ? Renderer.getLang(filename) : '';
  }

  /* ── Topbar title ────────────────────────────────── */
  function updateTopbar(filename) {
    const title = el('topbar-file-name');
    if (title) title.textContent = filename || '';
  }

  /* ── Line number sync ────────────────────────────── */
  function syncLineNumbers() {
    const content = el('editor-content');
    const lnEl    = el('line-numbers');
    if (!content || !lnEl) return;
    content.addEventListener('scroll', () => {
      lnEl.scrollTop = content.scrollTop;
    }, { passive: true });
  }

  /* ── Typing animation ────────────────────────────── */
  function startTypingAnimation() {
    const target = el('typing-target');
    if (!target) return;

    const roles = RKP.roles;
    let ri = 0, ci = 0, deleting = false, pause = 0;

    function tick() {
      const role = roles[ri];
      if (pause > 0) { pause--; typingTimer = setTimeout(tick, 80); return; }

      if (!deleting) {
        target.textContent = role.slice(0, ++ci);
        if (ci === role.length) { deleting = true; pause = 24; }
        typingTimer = setTimeout(tick, 95);
      } else {
        target.textContent = role.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; pause = 5; }
        typingTimer = setTimeout(tick, 55);
      }
    }
    tick();
  }

  /* ── Activity bar navigation + JS tooltips ──────── */
  function initActivityBar() {
    const tooltip = document.getElementById('activity-tooltip');
    document.querySelectorAll('.activity-btn').forEach(btn => {
      if (btn.dataset.file) {
        btn.addEventListener('click', () => openFile(btn.dataset.file));
      }
      if (btn.dataset.tooltip && tooltip) {
        btn.addEventListener('mouseenter', () => {
          const rect = btn.getBoundingClientRect();
          tooltip.textContent = btn.dataset.tooltip;
          tooltip.style.top  = (rect.top + rect.height / 2) + 'px';
          tooltip.style.left = (rect.right + 10) + 'px';
          tooltip.classList.add('visible');
        });
        btn.addEventListener('mouseleave', () => {
          tooltip.classList.remove('visible');
        });
      }
    });
  }

  /* ── Settings panel ──────────────────────────────── */
  function initSettings() {
    const panel   = el('settings-panel');
    const overlay = el('settings-overlay');
    const gearBtn = document.querySelector('.activity-btn[data-action="settings"]');

    function openSettings() {
      panel?.classList.add('open');
      overlay?.classList.add('visible');
    }
    function closeSettings() {
      panel?.classList.remove('open');
      overlay?.classList.remove('visible');
    }

    gearBtn?.addEventListener('click', () => {
      panel?.classList.contains('open') ? closeSettings() : openSettings();
    });
    overlay?.addEventListener('click', closeSettings);

    /* Theme buttons */
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        document.body.className = document.body.className
          .replace(/\btheme-\S+/g, '').trim();
        if (theme !== 'dark') document.body.classList.add('theme-' + theme);
        document.querySelectorAll('[data-theme]').forEach(b =>
          b.classList.toggle('active', b.dataset.theme === theme));
      });
    });

    /* Font size */
    document.querySelectorAll('[data-fontsize]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.documentElement.style.setProperty('--font-size-editor', btn.dataset.fontsize + 'px');
        document.querySelectorAll('[data-fontsize]').forEach(b =>
          b.classList.toggle('active', b === btn));
      });
    });

    /* Terminal toggle */
    el('settings-terminal-toggle')?.addEventListener('click', () => {
      Terminal.toggleCollapse();
      closeSettings();
    });
  }

  /* ── Sidebar collapse/expand ─────────────────────── */
  function initSidebar() {
    const sidebar    = el('sidebar');
    const toggleBtn  = el('btn-toggle-explorer');
    const collapseBtn = el('btn-sidebar-collapse');

    function toggle() {
      const collapsed = sidebar?.classList.toggle('collapsed');
      toggleBtn?.classList.toggle('active', !collapsed);
    }

    toggleBtn?.addEventListener('click', toggle);
    collapseBtn?.addEventListener('click', toggle);
  }

  /* ── Folder toggle ───────────────────────────────── */
  function initFolderToggle() {
    document.querySelectorAll('.folder-label').forEach(label => {
      label.addEventListener('click', () => {
        label.classList.toggle('collapsed');
        const list = label.nextElementSibling;
        if (list) list.style.display = label.classList.contains('collapsed') ? 'none' : '';
      });
    });
  }

  /* ── Keyboard shortcuts ──────────────────────────── */
  function initKeyboard() {
    document.addEventListener('keydown', e => {
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault();
        Terminal.toggleCollapse();
      }
      if (e.key === 'Escape') {
        el('settings-panel')?.classList.remove('open');
        el('settings-overlay')?.classList.remove('visible');
      }
    });
  }

  /* ── Contact form ────────────────────────────────── */
  window.handleContactSubmit = function(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.btn-primary');
    btn.textContent = '✓ Sent!';
    btn.style.background = 'var(--syn-type)';
    setTimeout(() => {
      btn.textContent = '→ Send Message';
      btn.style.background = '';
      e.target.reset();
    }, 3000);
    Terminal.appendLine('<span class="t-success">✔ Message submitted — Rajendrasinh will be in touch!</span>', 't-success');
  };

  /* ── Logo animation ──────────────────────────────── */
  function initLogoAnimation() {
    const topbar_logo  = document.querySelector('#topbar');
    const logo  = document.querySelector('.topbar-logo');
    if (!logo) return;
    const parts = ['logo-lt','logo-gt','logo-r','logo-p','logo-dot'];
    let busy = false;

    function play() {
      if (busy) return;
      busy = true;
      parts.forEach(c => logo.querySelector('.'+c)?.classList.remove('play'));
      void logo.offsetWidth;
      parts.forEach(c => logo.querySelector('.'+c)?.classList.add('play'));
      setTimeout(() => { busy = false; }, 1600);
    }

    setTimeout(play, 2100);
    topbar_logo.addEventListener('mouseenter', play);
  }

  /* ── Init ────────────────────────────────────────── */
  function init() {
    buildFileTree();
    initActivityBar();
    initSidebar();
    initFolderToggle();
    initKeyboard();
    initSettings();
    initCursor();
    initLogoAnimation();
    Terminal.init();
    hideSplash();
  }

  /* ── Custom animated cursor ──────────────────────── */
  function initCursor() {
    const dot   = document.getElementById('cursor-dot');
    const ring  = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId = null;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    });

    function animateRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    /* Hover states */
    document.addEventListener('mouseover', e => {
      const t = e.target;
      const isClickable = t.closest('a, button, [role="button"], .file-item, .tab, .activity-btn, .proj-card, .contact-card, [data-theme], [data-fontsize], .social-btn, .btn-primary, .btn-secondary');
      if (isClickable) {
        dot.classList.add('hovered');
        ring.classList.add('hovered');
      } else {
        dot.classList.remove('hovered');
        ring.classList.remove('hovered');
      }
    });

    /* Click burst */
    document.addEventListener('mousedown', () => {
      dot.classList.add('clicked');
      ring.classList.add('clicked');
    });
    document.addEventListener('mouseup', () => {
      dot.classList.remove('clicked');
      ring.classList.remove('clicked');
    });

    /* Input fields: revert to default cursor */
    document.addEventListener('mouseover', e => {
      const isInput = e.target.closest('input, textarea, select');
      dot.style.opacity  = isInput ? '0' : '';
      ring.style.opacity = isInput ? '0' : '';
    });
  }

  return { init, openFile, closeTab };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
window.App = App;
