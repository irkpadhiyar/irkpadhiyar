/**
 * terminal.js
 * Interactive terminal REPL with command registry, history, and autocomplete.
 */

const Terminal = (() => {

  let history = [];
  let historyIndex = -1;
  let currentInput = '';

  const PROMPT = 'rkp@portfolio:~$';

  /* ── DOM references ───────────────────────────────── */
  const getOutput  = () => document.getElementById('terminal-output');
  const getInput   = () => document.getElementById('terminal-input');
  const getPanel   = () => document.getElementById('terminal-panel');

  /* ── Output helpers ───────────────────────────────── */
  function appendLine(html, cls = 't-output') {
    const el = document.createElement('span');
    el.className = `t-line ${cls}`;
    el.innerHTML = html;
    getOutput().appendChild(el);
    getOutput().appendChild(document.createTextNode('\n'));
    scrollToBottom();
  }

  function appendBlank() {
    const el = document.createElement('span');
    el.className = 't-line';
    el.innerHTML = '&nbsp;';
    getOutput().appendChild(el);
    getOutput().appendChild(document.createTextNode('\n'));
  }

  function appendPromptLine(cmd) {
    const el = document.createElement('span');
    el.className = 't-line t-prompt-line';
    el.innerHTML = `<span class="t-prompt">${PROMPT}</span> <span class="t-cmd">${escHtml(cmd)}</span>`;
    getOutput().appendChild(el);
    getOutput().appendChild(document.createTextNode('\n'));
  }

  function escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function scrollToBottom() {
    const o = getOutput();
    if (o) o.scrollTop = o.scrollHeight;
  }

  /* ── Command Definitions ──────────────────────────── */
  const commands = {

    help: {
      desc: 'Show available commands',
      run() {
        appendBlank();
        appendLine('<span class="t-section-title">Available Commands</span>', 't-output');
        appendLine('─'.repeat(48), 't-muted');
        const cmds = [
          ['help',          'Show this help menu'],
          ['whoami',        'Display name, title & company'],
          ['ls',            'List all portfolio sections'],
          ['open <file>',   'Open a portfolio section (e.g. open projects.json)'],
          ['cat about.txt', 'Print bio in terminal'],
          ['skills',        'List all technical skills by category'],
          ['experience',    'Show work history timeline'],
          ['projects',      'List all 11 projects'],
          ['contact',       'Show contact information'],
          ['theme <name>',  'Switch theme: dark | one-dark | dracula | nord'],
          ['clear',         'Clear terminal output'],
          ['github',        'Open GitHub profile'],
          ['linkedin',      'Open LinkedIn profile'],
          ['hire me',       'Easter egg 🎉'],
        ];
        cmds.forEach(([cmd, desc]) => {
          appendLine(
            `  <span class="t-key" style="display:inline-block;min-width:180px;">${escHtml(cmd)}</span>` +
            `<span class="t-muted">${escHtml(desc)}</span>`
          );
        });
        appendBlank();
      }
    },

    whoami: {
      desc: 'Display name, title & company',
      run() {
        const d = RKP;
        appendBlank();
        appendLine(`<span class="t-section-title">${escHtml(d.name)}</span>`);
        appendLine(`<span class="t-key">Title    </span> <span class="t-value">${escHtml(d.title)}</span>`);
        appendLine(`<span class="t-key">Company  </span> <span class="t-value">${escHtml(d.company)}</span>`);
        appendLine(`<span class="t-key">Location </span> <span class="t-value">${escHtml(d.location)}</span>`);
        appendLine(`<span class="t-key">Tagline  </span> <span class="t-muted">${escHtml(d.tagline)}</span>`);
        appendBlank();
        appendLine(`<span class="t-key">Email    </span> <span class="t-link" onclick="window.open('mailto:${d.email}')">${escHtml(d.email)}</span>`);
        appendLine(`<span class="t-key">GitHub   </span> <span class="t-link" onclick="window.open('${d.github}','_blank')">${escHtml(d.github)}</span>`);
        appendLine(`<span class="t-key">LinkedIn </span> <span class="t-link" onclick="window.open('${d.linkedin}','_blank')">${escHtml(d.linkedin)}</span>`);
        appendBlank();
      }
    },

    ls: {
      desc: 'List all portfolio sections',
      run(args) {
        appendBlank();
        if (args && args.trim()) {
          appendLine(`<span class="t-muted">drwxr-xr-x  portfolio/</span>`);
        }
        const files = Renderer.getFileList();
        files.forEach(f => {
          const icon = Renderer.getIcon(f);
          const lang = Renderer.getLang(f);
          appendLine(
            `  ${icon}  <span class="t-key">${escHtml(f)}</span>  ` +
            `<span class="t-muted">${escHtml(lang)}</span>`
          );
        });
        appendBlank();
        appendLine(`<span class="t-muted">Type <span class="t-key">open &lt;filename&gt;</span> to view a section</span>`);
        appendBlank();
      }
    },

    open: {
      desc: 'Open a portfolio section',
      run(args) {
        const filename = (args || '').trim();
        const files = Renderer.getFileList();
        const match = files.find(f => f === filename || f.startsWith(filename));
        if (!match) {
          appendLine(`<span class="t-error">Cannot open '${escHtml(filename)}': No such file</span>`, 't-error');
          appendLine(`<span class="t-muted">Run <span class="t-key">ls</span> to see available files</span>`);
          return;
        }
        appendLine(`<span class="t-success">Opening ${escHtml(match)}...</span>`, 't-success');
        if (window.App) window.App.openFile(match);
      }
    },

    cat: {
      desc: 'Print file content in terminal',
      run(args) {
        const file = (args || '').trim();
        if (file === 'about.txt' || file === 'about.tsx' || file === 'home.tsx') {
          appendBlank();
          appendLine(`<span class="t-section-title">Bio</span>`);
          appendLine('─'.repeat(48), 't-muted');
          const words = RKP.bio.split(' ');
          let line = '';
          words.forEach(w => {
            if ((line + ' ' + w).length > 72) {
              appendLine(`<span class="t-output">${escHtml(line.trim())}</span>`);
              line = w;
            } else {
              line += ' ' + w;
            }
          });
          if (line.trim()) appendLine(`<span class="t-output">${escHtml(line.trim())}</span>`);
          appendBlank();
        } else if (file === 'README.md' || file === 'readme.md') {
          appendBlank();
          appendLine(`<span class="t-section-title"># RKP Portfolio</span>`);
          appendLine(`<span class="t-output">Lead Software Engineer · 12+ years · iBase-t</span>`);
          appendLine(`<span class="t-muted">Built with pure HTML/CSS/JS — VSCode + Terminal theme</span>`);
          appendBlank();
        } else {
          appendLine(`<span class="t-error">cat: ${escHtml(file)}: No such file or use ls to list files</span>`, 't-error');
        }
      }
    },

    skills: {
      desc: 'List all technical skills',
      run() {
        const sk = RKP.skills;
        appendBlank();
        appendLine('<span class="t-section-title">Technical Skills</span>');
        appendLine('─'.repeat(48), 't-muted');
        Object.entries(sk).forEach(([cat, items]) => {
          appendLine(`<span class="t-key">${escHtml(cat.padEnd(16))}</span><span class="t-value">${items.map(escHtml).join(', ')}</span>`);
        });
        appendBlank();
      }
    },

    experience: {
      desc: 'Work history timeline',
      run() {
        appendBlank();
        appendLine('<span class="t-section-title">Work Experience</span>');
        appendLine('─'.repeat(48), 't-muted');
        RKP.experience.forEach(job => {
          const current = job.current ? ' <span class="t-success">● current</span>' : '';
          appendLine(
            `<span class="t-key">${escHtml(job.period)}</span>${current}`
          );
          appendLine(
            `  <span class="t-value">${escHtml(job.role)}</span>` +
            ` <span class="t-muted">@ ${escHtml(job.company)}</span>`
          );
          appendBlank();
        });
      }
    },

    projects: {
      desc: 'List all projects',
      run() {
        appendBlank();
        appendLine(`<span class="t-section-title">Projects (${RKP.projects.length} total)</span>`);
        appendLine('─'.repeat(48), 't-muted');
        RKP.projects.forEach((p, i) => {
          const num = String(i + 1).padStart(2, '0');
          const link = p.link ? ` <span class="t-link" onclick="window.open('${p.link}','_blank')">↗</span>` : '';
          appendLine(
            `<span class="t-muted">${num}.</span> ` +
            `<span class="t-key">${escHtml(p.name)}</span>` +
            `<span class="t-muted"> [${p.tech.map(escHtml).join(', ')}]</span>` +
            link
          );
        });
        appendBlank();
        appendLine(`<span class="t-muted">Run <span class="t-key">open projects.json</span> for details</span>`);
        appendBlank();
      }
    },

    contact: {
      desc: 'Show contact information',
      run() {
        const d = RKP;
        appendBlank();
        appendLine('<span class="t-section-title">Contact Rajendrasinh Padhiyar</span>');
        appendLine('─'.repeat(48), 't-muted');
        appendLine(`<span class="t-key">Email    </span> <span class="t-link" onclick="window.open('mailto:${d.email}')">${escHtml(d.email)}</span>`);
        appendLine(`<span class="t-key">Phone    </span> <span class="t-value">${escHtml(d.phone)}</span>`);
        appendLine(`<span class="t-key">LinkedIn </span> <span class="t-link" onclick="window.open('${d.linkedin}','_blank')">linkedin.com/in/irkpadhiyar</span>`);
        appendLine(`<span class="t-key">GitHub   </span> <span class="t-link" onclick="window.open('${d.github}','_blank')">github.com/irkpadhiyar</span>`);
        appendLine(`<span class="t-key">Location </span> <span class="t-value">${escHtml(d.location)}</span>`);
        appendBlank();
        appendLine(`<span class="t-muted">Or run <span class="t-key">open contact.html</span> for the contact form</span>`);
        appendBlank();
      }
    },

    clear: {
      desc: 'Clear terminal',
      run() {
        getOutput().innerHTML = '';
        printWelcome();
      }
    },

    theme: {
      desc: 'Switch color theme',
      run(args) {
        const name = (args || '').trim().toLowerCase();
        const themes = {
          'dark':     '',
          'default':  '',
          'one-dark': 'theme-one-dark',
          'dracula':  'theme-dracula',
          'nord':     'theme-nord',
        };
        if (!name || !(name in themes)) {
          appendLine(`<span class="t-warning">Usage: theme &lt;dark | one-dark | dracula | nord&gt;</span>`, 't-warning');
          return;
        }
        document.body.className = themes[name];
        appendLine(`<span class="t-success">✔ Theme switched to: <span class="t-key">${escHtml(name)}</span></span>`, 't-success');
      }
    },

    github: {
      desc: 'Open GitHub profile',
      run() {
        window.open(RKP.github, '_blank');
        appendLine(`<span class="t-success">Opening GitHub profile...</span>`, 't-success');
      }
    },

    linkedin: {
      desc: 'Open LinkedIn profile',
      run() {
        window.open(RKP.linkedin, '_blank');
        appendLine(`<span class="t-success">Opening LinkedIn profile...</span>`, 't-success');
      }
    },

    'hire me': {
      desc: 'Easter egg',
      run() {
        appendBlank();
        const msg = [
          `<span class="hire-me-msg t-success">🎉 Great choice! Initializing offer protocol...</span>`,
          `<span class="t-muted">✓ Checking availability... <span class="t-success">OPEN</span></span>`,
          `<span class="t-muted">✓ Validating 12+ years of experience... <span class="t-success">CONFIRMED</span></span>`,
          `<span class="t-muted">✓ Leadership skills assessment... <span class="t-success">PASSED</span></span>`,
          `<span class="t-success">→ Let's talk! Drop me a message at <span class="t-link" onclick="window.open('mailto:irkpadhiyar@gmail.com')">irkpadhiyar@gmail.com</span></span>`,
        ];
        msg.forEach((m, i) => {
          setTimeout(() => appendLine(m), i * 250);
        });
        setTimeout(() => appendBlank(), msg.length * 250 + 100);
      }
    },

    'sudo hire-me': {
      desc: 'Another easter egg',
      run() {
        appendBlank();
        appendLine(`<span class="t-warning">[sudo] password for recruiter: ******</span>`);
        setTimeout(() => {
          appendLine(`<span class="t-success">✔ Authentication successful</span>`, 't-success');
          appendLine(`<span class="t-success">🚀 Executing hire protocol...</span>`, 't-success');
          setTimeout(() => {
            appendLine(`<span class="hire-me-msg t-success">✓ Offer dispatched to irkpadhiyar@gmail.com 🎉</span>`);
            appendBlank();
          }, 600);
        }, 800);
      }
    },
  };

  /* ── Autocomplete ─────────────────────────────────── */
  const allCommands = Object.keys(commands).concat(Renderer.getFileList());

  function getSuggestions(input) {
    if (!input) return [];
    return allCommands.filter(c => c.startsWith(input) && c !== input);
  }

  /* ── Execute command ──────────────────────────────── */
  function execute(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    appendPromptLine(trimmed);

    if (history[history.length - 1] !== trimmed) {
      history.push(trimmed);
    }
    historyIndex = history.length;

    const lower = trimmed.toLowerCase();

    if (lower === 'hire me' || lower === 'hire-me') {
      commands['hire me'].run();
      return;
    }
    if (lower === 'sudo hire-me' || lower === 'sudo hire me') {
      commands['sudo hire-me'].run();
      return;
    }

    const spaceIdx = trimmed.indexOf(' ');
    const verb = spaceIdx === -1 ? lower : lower.slice(0, spaceIdx);
    const args = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1);

    if (commands[verb]) {
      commands[verb].run(args);
    } else if (Renderer.getFileList().includes(trimmed)) {
      commands.open.run(trimmed);
    } else {
      appendLine(
        `<span class="t-error">bash: ${escHtml(trimmed)}: command not found</span>`,
        't-error'
      );
      appendLine(`<span class="t-muted">Type <span class="t-key">help</span> for available commands</span>`);
    }
  }

  /* ── Welcome message ──────────────────────────────── */
  function printWelcome() {
    const msgs = [
      `<span class="t-success">Welcome to RKP Portfolio Terminal v1.0.0</span>`,
      `<span class="t-muted">Type <span class="t-key">help</span> for available commands | <span class="t-key">whoami</span> to start</span>`,
      `<span class="t-muted">─────────────────────────────────────────────────────────</span>`,
    ];
    msgs.forEach(m => appendLine(m));
    appendBlank();
  }

  /* ── Input event handlers ─────────────────────────── */
  function handleKeyDown(e) {
    const input = getInput();

    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      currentInput = '';
      execute(val);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex === history.length) currentInput = input.value;
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
        setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = currentInput;
      }
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const val = input.value.trim();
      const suggestions = getSuggestions(val);
      if (suggestions.length === 1) {
        input.value = suggestions[0] + ' ';
      } else if (suggestions.length > 1) {
        appendPromptLine(val);
        appendLine(suggestions.map(escHtml).join('   '), 't-muted');
      }
      return;
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      commands.clear.run();
      return;
    }

    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      appendPromptLine(input.value + '^C');
      input.value = '';
      currentInput = '';
      historyIndex = history.length;
      return;
    }
  }

  /* ── Terminal toggle (collapse/expand) ───────────── */
  function toggleCollapse() {
    const panel = getPanel();
    panel.classList.toggle('collapsed');
  }

  /* ── Init ─────────────────────────────────────────── */
  function init() {
    const input = getInput();
    if (!input) return;

    input.addEventListener('keydown', handleKeyDown);

    /* Keep focus in terminal area */
    document.getElementById('terminal-panel')
      ?.addEventListener('click', () => input.focus());

    /* Toggle button */
    document.getElementById('btn-terminal-collapse')
      ?.addEventListener('click', (e) => { e.stopPropagation(); toggleCollapse(); });

    printWelcome();
    input.focus();
  }

  return { init, execute, appendLine, appendBlank, printWelcome, toggleCollapse };
})();
