/**
 * renderer.js — Rich visual section content for each portfolio "file"
 */

const Renderer = (() => {

  /* ── Minimap ───────────────────────────────────────── */
  function generateMinimap(count = 70) {
    const patterns = ['bright','','','comment','','bright','',''];
    let html = '';
    for (let i = 0; i < count; i++) {
      const cls = patterns[i % patterns.length];
      const w = 20 + Math.random() * 38;
      html += `<div class="minimap-line ${cls}" style="width:${w.toFixed(0)}%"></div>`;
    }
    return html;
  }

  /* ── Line numbers ──────────────────────────────────── */
  function updateLineNumbers(count) {
    const el = document.getElementById('line-numbers');
    if (!el) return;
    let html = '';
    for (let i = 1; i <= Math.max(count, 40); i++) {
      html += `<span class="ln">${i}</span>\n`;
    }
    el.innerHTML = html;
  }

  /* ══════════════════════════════════════════════════
     about.tsx  —  HOME / HERO
     ══════════════════════════════════════════════════ */
  function renderAbout() {
    updateLineNumbers(80);
    return `<div class="section hero-section">

      <div class="page-comment">// hello world !! I'm Rajendrasinh Padhiyar</div>

      <h1 class="hero-name">
        Rajendrasinh
        <span class="name-line2">Padhiyar</span>
      </h1>

      <div class="hero-tagline">
        <span class="ht-prompt">const role = </span>
        "<span id="typing-target">Lead Software Engineer</span>"
        <span class="typing-caret"></span>
      </div>

      <div class="hero-bio">
        I'm a <span class="hl-white">Lead Software Engineer</span> with
        <span class="hl-blue">12+ years</span> of experience building
        high-impact web applications and leading high-performance engineering teams.
        Specialist in <span class="hl-teal">React.js</span>,
        <span class="hl-teal">Node.js</span>,
        <span class="hl-teal">TypeScript</span> &amp;
        <span class="hl-teal">Full-Stack development</span>.
        Passionate about <span class="hl-white">scalable architecture</span>,
        clean code, and shipping products that users love.
      </div>

      <div class="hero-actions">
        <a href="#" class="btn-hero"
           onclick="App.openFile('projects.json');return false;"><span>🚀</span> View Projects</a>
        <a href="#" class="btn-hero"
           onclick="App.openFile('experience.ts');return false;"><span>📋</span> Experience</a>
        <a href="#" class="btn-hero"
           onclick="App.openFile('about.md');return false;"><span>📝</span> About Me</a>
        <a href="#" class="btn-hero"
           onclick="App.openFile('contact.html');return false;"><span>✉</span> Contact</a>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-num">12+</span>
          <span class="stat-label">Years</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">15+</span>
          <span class="stat-label">Projects</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">6</span>
          <span class="stat-label">Companies</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">∞</span>
          <span class="stat-label">Passion</span>
        </div>
      </div>

      <div class="hero-socials">
        <a href="https://github.com/irkpadhiyar" target="_blank" rel="noopener" class="social-btn">
          ⎇ GitHub
        </a>
        <a href="https://www.linkedin.com/in/irkpadhiyar/" target="_blank" rel="noopener" class="social-btn">
          🔗 LinkedIn
        </a>
        <a href="mailto:irkpadhiyar@gmail.com" class="social-btn">
          ✉ Email
        </a>
        <a href="tel:+919724308467" class="social-btn">
          📞 +91 97243 08467
        </a>
      </div>

    </div>`;
  }

  /* ══════════════════════════════════════════════════
     experience.ts  —  WORK HISTORY
     ══════════════════════════════════════════════════ */
  function renderExperience() {
    updateLineNumbers(100);
    const entries = RKP.experience.map((job, i) => {
      const bullets = job.highlights
        .map(h => `<span class="exp-bullet">${h}</span>`)
        .join('');
      return `
        <div class="exp-entry ${job.current ? 'current' : ''}"
             style="animation-delay:${i * 80}ms">
          <div class="exp-entry-header">
            <div>
              <div class="exp-entry-role">
                ${job.role}
                ${job.current ? '<span class="exp-current-dot">current</span>' : ''}
              </div>
              <div class="exp-entry-company">${job.company}</div>
            </div>
            <div class="exp-period-badge">${job.period}</div>
          </div>
          <div class="exp-entry-desc">${job.description}</div>
          <div class="exp-bullets">${bullets}</div>
        </div>`;
    }).join('');

    return `<div class="section">
      <div class="page-comment">// experience.ts · 12+ years of engineering leadership</div>
      <h1 class="page-heading grad-heading">Experience</h1>
      <div class="page-meta">
        <span class="kw">const</span> experience =
        <span class="punc">{</span>
        companies: <span class="str">6</span>,
        years: <span class="str">"12+"</span>,
        currentRole: <span class="str">"Lead Software Engineer"</span>
        <span class="punc">}</span>
      </div>
      <div class="exp-timeline">${entries}</div>
    </div>`;
  }

  /* ══════════════════════════════════════════════════
     skills.css  —  TECHNICAL SKILLS
     ══════════════════════════════════════════════════ */
  function renderSkills() {
    updateLineNumbers(60);

    const groups = [
      {
        title: 'Frontend', color: '#61dafb', tier: 'expert',
        skills: ['React.js','TypeScript','JavaScript','HTML5 / CSS3','Next.js','Angular.js','React Native','Vue.js']
      },
      {
        title: 'Backend', color: '#68a063', tier: 'strong',
        skills: ['Node.js','PHP','REST API','Laravel','CakePHP','Meteor.js','CodeIgniter']
      },
      {
        title: 'Databases', color: '#4479a1', tier: 'strong',
        skills: ['MySQL','MongoDB','DynamoDB']
      },
      {
        title: 'Cloud & DevOps', color: '#ff9900', tier: 'proficient',
        skills: ['AWS Lambda','Azure','DigitalOcean','Git / GitHub','GitHub Actions']
      },
      {
        title: 'Architecture', color: '#bd93f9', tier: 'expert',
        skills: ['System Design','Agile / Scrum','Solution Architecture','Microservices','OAuth / Auth','SQL Optimization']
      },
      {
        title: 'Payments', color: '#4ec9b0', tier: 'proficient',
        skills: ['Stripe','PayPal','RazorPay','Authorize.net','WePay']
      },
      {
        title: 'Tools', color: '#dcdcaa', tier: 'proficient',
        skills: ['VSCode','JIRA','Bitrix24','SVN','Zend Studio']
      },
    ];

    const html = groups.map((g, gi) => `
      <div class="skill-group reveal" style="animation-delay:${gi * 60}ms">
        <div class="skill-group-header">
          <span class="skill-group-dot" style="background:${g.color}"></span>
          <span class="skill-group-title" style="color:${g.color}">${g.title}</span>
        </div>
        <div class="skill-chips">
          ${g.skills.map(s => `<span class="sc" style="--cc:${g.color}" title="${s}">${s}</span>`).join('')}
        </div>
      </div>`).join('');

    return `<div class="section skills-section">
      <div class="page-comment">// skills.css · tech stack &amp; tools I actually use</div>
      <h1 class="page-heading grad-heading">Skills</h1>
      <div class="page-meta">
        <span class="punc">{</span>
        status: <span class="str">"always_learning"</span>,
        years: <span class="str">"12+"</span>
        <span class="punc">}</span>
      </div>
      <div class="skills-compact">${html}</div>
    </div>`;
  }

  /* ══════════════════════════════════════════════════
     projects.json  —  PROJECTS SHOWCASE
     ══════════════════════════════════════════════════ */
  function renderProjects() {
    updateLineNumbers(120);

    const meta = [
      { name: 'PetGud',          emoji: '🐾', color: '#61dafb', cats: 'MOBILE · REACT NATIVE · TEAM LEAD',    featured: true  },
      { name: 'Chronos',         emoji: '⏱️', color: '#4ec9b0', cats: 'MOBILE · CROSS-PLATFORM · NODE.JS',    featured: true  },
      { name: 'Trames.io',       emoji: '📦', color: '#dcdcaa', cats: 'WEB APP · SUPPLY CHAIN · REACT',        featured: true  },
      { name: 'Neurotracker',    emoji: '🧠', color: '#bd93f9', cats: 'WEB APP · COGNITIVE TRAINING · METEOR', featured: true  },
      { name: 'MEXVolleyball',   emoji: '🏐', color: '#ce9178', cats: 'WEB APP · SPORTS · PHP',                featured: false },
      { name: 'Plixto',          emoji: '💼', color: '#f97316', cats: 'FULL STACK · SOLO · LARAVEL',           featured: false },
      { name: 'Spell-a-thon',    emoji: '📚', color: '#e44d26', cats: 'WEB APP · EDUCATION · ANGULAR',         featured: false },
      { name: 'ShearCircle',     emoji: '✂️', color: '#569cd6', cats: 'WEB APP · IONIC · ANGULAR',             featured: false },
      { name: 'DividenPay',      emoji: '💰', color: '#6a9955', cats: 'WEB + ANDROID · FINANCE · PHP',         featured: false },
      { name: 'MissUniverse',    emoji: '👑', color: '#febc2e', cats: 'WEB APP · EVENTS · CAKEPHP',            featured: false },
      { name: 'GUNA-Travel',     emoji: '✈️', color: '#4a90d9', cats: 'WEB APP · TRAVEL · WORDPRESS',          featured: false },
    ];

    const cards = RKP.projects.map((p, i) => {
      const m = meta[i] || { emoji: '🚀', color: '#007acc', cats: 'WEB APP', featured: false };
      const techTags = p.tech.map(t => `<span class="proj-tag">${t}</span>`).join('');
      const liveBadge = p.link
        ? `<a href="${p.link}" target="_blank" rel="noopener" class="proj-badge live">↗ Live</a>`
        : `<span class="proj-badge">Private</span>`;
      const cats = m.cats.split(' · ').map(c => `<span class="proj-cat-chip">${c}</span>`).join('');
      const accentRgb = m.color;
      return `
        <div class="proj-card ${m.featured ? 'feat' : ''} reveal"
             style="animation-delay:${i * 45}ms; --card-accent:${accentRgb}">
          <div class="proj-card-glow"></div>
          <div class="proj-card-top">
            <div class="proj-cats">${cats}</div>
            <div class="proj-badges">${liveBadge}</div>
          </div>
          <div class="proj-header">
            <span class="proj-emoji-wrap">
              <span class="proj-emoji">${m.emoji}</span>
            </span>
            <div>
              <div class="proj-title">${p.name}</div>
              <div class="proj-role">
                <span class="proj-role-chip">${p.role}</span>
                <span class="proj-role-sep">·</span>
                <span>Team: ${p.teamSize}</span>
                <span class="proj-role-sep">·</span>
                <span>${p.year}</span>
              </div>
            </div>
          </div>
          <div class="proj-desc">${p.description}</div>
          <div class="proj-tags">${techTags}</div>
          <div class="proj-card-footer">
            <span class="proj-stack-count">${p.tech.length} technologies</span>
            ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="proj-open-link">Open ↗</a>` : ''}
          </div>
        </div>`;
    }).join('');

    return `<div class="section projects-section">
      <div class="page-comment">// projects.json · things I've built &amp; shipped</div>
      <h1 class="page-heading grad-heading">Projects</h1>
      <div class="page-meta">
        <span class="kw">const</span> projects =
        <span class="punc">{</span>
        total: <span class="str">${RKP.projects.length}</span>,
        featured: <span class="str">${RKP.projects.filter(p=>p.featured).length}</span>,
        status: <span class="str">"shipped"</span>
        <span class="punc">}</span>
      </div>
      <div class="proj-grid">${cards}</div>
    </div>`;
  }

  /* ══════════════════════════════════════════════════
     education.md  —  ABOUT ME + EDUCATION
     ══════════════════════════════════════════════════ */
  function renderEducation() {
    updateLineNumbers(70);

    const focuses = [
      { icon: '🛡️', text: 'Building enterprise MES platforms for aerospace & defense' },
      { icon: '🌐', text: 'Deep expertise in Solumina MES & shop floor workflows' },
      { icon: '⚛️', text: 'Architecting React.js & TypeScript frontends at scale' },
      { icon: '☁️', text: 'Cloud-native solutions on AWS & Azure' },
      { icon: '🏗️', text: 'Leading full-stack teams from design to deployment' },
      { icon: '📊', text: 'Performance optimization & SQL query tuning' },
      { icon: '🔐', text: 'OAuth, API design & system integrations' },
      { icon: '🚀', text: 'Always shipping, always levelling up' },
    ];
    const focusItems = focuses.map((f, i) => `
      <div class="focus-item reveal" style="animation-delay:${200 + i * 45}ms">
        <span class="focus-icon">${f.icon}</span>
        <span>${f.text}</span>
      </div>`).join('');

    const eduData = [
      {
        icon: '🎓',
        institution: 'VNSGU, Surat',
        affiliation: 'Veer Narmad South Gujarat University',
        degree: 'BCA — Bachelor of Computer Applications',
        detail: 'Computer Science & Applications',
        grade: 'Grade: 60%',
        year: '2010 – 2013',
      },
      {
        icon: '🏫',
        institution: 'GSHEB',
        affiliation: 'Gujarat Secondary & Higher Secondary Education Board',
        degree: 'H.S.C. — Higher Secondary Certificate',
        detail: 'Science Stream',
        grade: 'Grade: 62%',
        year: '2008 – 2009',
      },
    ];
    const eduCards = eduData.map((ed, i) => `
      <div class="edu-card reveal" style="animation-delay:${i * 80}ms">
        <div class="edu-card-left">
          <div class="edu-inst">${ed.icon} ${ed.institution}</div>
          <div class="edu-affiliation">${ed.affiliation}</div>
          <div class="edu-degree">${ed.degree}</div>
          <div class="edu-detail">${ed.detail}</div>
          <div class="edu-grade">${ed.grade}</div>
        </div>
        <div class="edu-year">${ed.year}</div>
      </div>`).join('');

    return `<div class="section about-md-section">

      <div class="about-file-header reveal">
        <span class="afh-arrow">&larr;&#8212;</span>
        <span class="afh-name">about.md &mdash; Rajendrasinh Padhiyar</span>
        <span class="afh-arrow">&#8212;&rarr;</span>
      </div>

      <h1 class="about-md-heading grad-heading">About Me</h1>
      <div class="about-md-subtitle reveal">// who I am &middot; what I do &middot; where I build</div>

      <div class="about-bio-block reveal" style="animation-delay:60ms">
        <p>
          Hi! I'm <span class="abi-name">Rajendrasinh Padhiyar</span>, a software engineer living at
          the intersection of <span class="abi-hl">enterprise platform engineering</span>,
          <span class="abi-hl">aerospace &amp; defense</span>, and
          <span class="abi-hl">full-stack craftsmanship</span>. I love building systems that are not
          just functional but genuinely <strong class="abi-strong">robust and production-ready</strong>.
          Currently a <span class="abi-role">Lead Software Engineer at iBase-t</span>, building the
          Solumina MES platform that powers manufacturing operations for aerospace &amp; defense
          companies worldwide.
        </p>
      </div>

      <div class="about-focus-title reveal" style="animation-delay:140ms">CURRENT FOCUS</div>
      <div class="focus-grid">${focusItems}</div>

      <div class="edu-section-title reveal">EDUCATION</div>
      ${eduCards}
    </div>`;
  }

  /* ══════════════════════════════════════════════════
     contact.html  —  CONTACT
     ══════════════════════════════════════════════════ */
  function renderContact() {
    updateLineNumbers(55);
    const d = RKP;

    const links = [
      { icon: '✉',  label: 'EMAIL',    value: d.email,                      href: `mailto:${d.email}`,   color: '#61dafb', bg: 'rgba(97,175,239,0.12)',  copy: d.email    },
      { icon: '📞', label: 'PHONE',    value: d.phone,                       href: `tel:+919724308467`,   color: '#4ec9b0', bg: 'rgba(78,201,176,0.12)',  copy: d.phone    },
      { icon: '🔗', label: 'LINKEDIN', value: 'linkedin.com/in/irkpadhiyar', href: d.linkedin,            color: '#569cd6', bg: 'rgba(86,156,214,0.12)',  copy: d.linkedin },
      { icon: '⎇',  label: 'GITHUB',   value: 'github.com/irkpadhiyar',      href: d.github,              color: '#bd93f9', bg: 'rgba(189,147,249,0.12)', copy: d.github   },
      { icon: '📍', label: 'LOCATION', value: 'India · Remote Ready',        href: null,                  color: '#dcdcaa', bg: 'rgba(220,220,170,0.12)', copy: 'India'    },
    ];

    const rows = links.map((lk, i) => `
      <a class="clink-row reveal" style="animation-delay:${80 + i * 70}ms"
         ${lk.href ? `href="${lk.href}" target="_blank" rel="noopener"` : ''}>
        <span class="clink-icon" style="background:${lk.bg};color:${lk.color}">${lk.icon}</span>
        <span class="clink-body">
          <span class="clink-label" style="color:${lk.color}">${lk.label}</span>
          <span class="clink-value">${lk.value}</span>
        </span>
        <button class="clink-copy" title="Copy"
          onclick="event.preventDefault();event.stopPropagation();
                   navigator.clipboard?.writeText('${lk.copy}')
                   .then(()=>{this.textContent='✓';this.classList.add('copied');
                   setTimeout(()=>{this.textContent='⎘';this.classList.remove('copied')},1400)})">⎘</button>
        ${lk.href ? '<span class="clink-arrow">↗</span>' : '<span class="clink-arrow" style="opacity:0.3">📍</span>'}
      </a>`).join('');

    return `<div class="section contact-section">
      <div class="page-comment">/* contact.css — let's build something */</div>
      <h1 class="page-heading grad-heading">Contact</h1>
      <div class="page-meta">// open to work, collabs &amp; good conversations</div>

      <div class="clink-available reveal">
        <span class="clink-avail-dot"></span>
        <span>Available for new opportunities</span>
        <span class="clink-avail-badge">Open to Work</span>
      </div>

      <div class="clink-section-title reveal" style="animation-delay:60ms">FIND ME ON</div>
      <div class="clink-list">${rows}</div>
    </div>`;
  }

  /* ── Section registry ──────────────────────────────── */
  const sections = {
    'home.tsx':       { render: renderAbout,       lang: 'TypeScript JSX', icon: '⚛',  dot: 'dot-tsx'  },
    'experience.ts':  { render: renderExperience,  lang: 'TypeScript',     icon: '📋', dot: 'dot-ts'   },
    'skills.css':     { render: renderSkills,       lang: 'CSS',            icon: '🎨', dot: 'dot-css'  },
    'projects.json':  { render: renderProjects,     lang: 'JSON',           icon: '{}', dot: 'dot-json' },
    'about.md':       { render: renderEducation,    lang: 'Markdown',       icon: '📝', dot: 'dot-md'   },
    'contact.html':   { render: renderContact,      lang: 'HTML',           icon: '✉',  dot: 'dot-html' },
  };

  function renderSection(filename) {
    const sec = sections[filename];
    if (!sec) return `<div class="section"><p style="color:var(--text-muted);padding:24px;">File not found</p></div>`;
    const html = sec.render();
    const mm = document.getElementById('minimap');
    if (mm) mm.innerHTML = `<div class="minimap-content">${generateMinimap(80)}</div>`;
    return html;
  }

  return {
    renderSection,
    getLang:    f => sections[f]?.lang || 'Plain Text',
    getIcon:    f => sections[f]?.icon || '📄',
    getDot:     f => sections[f]?.dot  || '',
    getFileList:() => Object.keys(sections),
  };
})();
