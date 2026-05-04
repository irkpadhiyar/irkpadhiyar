# ` > RKP.portfolio `

### Rajendrasinh Padhiyar — Lead Software Engineer

![HTML5](https://img.shields.io/badge/Made%20with-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/Made%20with-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![No Build](https://img.shields.io/badge/Build%20Step-None-blue?style=flat-square)

A VS Code Dark+ editor-themed personal portfolio — built with pure HTML, CSS, and vanilla JavaScript. No frameworks. No build tools. No `npm install`. Just open `index.html`.

The entire UI faithfully replicates VS Code: activity bar, collapsible file explorer, editor tabs, line numbers, minimap, interactive terminal REPL, and status bar — all as a fully working portfolio.

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [File / Section Mapping](#-file--section-mapping)
- [Terminal Commands](#-terminal-commands)
- [Color Themes](#-color-themes)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Customizing for Yourself](#-customizing-for-yourself)
- [Tech Stack](#-tech-stack)
- [Connect](#-connect)

---

## 🌐 Live Demo

[irkpadhiyar.github.io](https://github.com/irkpadhiyar) — open it, then type `help` in the terminal.

---

## ✨ Features

### VS Code UI Shell
- **Activity bar** — left icon rail with colorized per-section icons
- **Unified collapsible sidebar** — activity bar + file explorer as a single panel
- **Editor tabs** — open multiple files, close tabs, `home.tsx` stays pinned
- **Editor area** — syntax-highlighted content with line numbers and minimap
- **Bottom terminal panel** — fully interactive REPL
- **Status bar** — language mode, line/col, branch indicator
- **macOS-style top bar** — traffic-light buttons, `<R.P>` logo with bracket slide + letter drop + dot-spin animation

### Interactive Terminal REPL
- 14 commands including easter eggs (`hire me`, `sudo hire-me`)
- Command history navigation with `↑` / `↓` arrow keys
- `Tab` autocomplete for all commands and file names
- `Ctrl+L` to clear, `Ctrl+C` to cancel input, `Ctrl+`` ` to toggle the terminal panel

### Themes
- 4 built-in color themes: **Dark+** (default), **One Dark**, **Dracula**, **Nord**
- Switch via the Settings panel or `theme <name>` in the terminal

### Animations & UX
- Typing animation on the hero cycling through 5 roles
- Custom animated cursor: dot + ring with hover and click states
- Scroll-reveal animations powered by `IntersectionObserver`
- Reveal transitions on tab open and section load

### Settings Panel
- Theme switcher
- Font size control (13 – 16 px)
- Terminal panel toggle

### Responsive
- Sidebar collapses on tablet and mobile
- Terminal panel hides on small screens
- Touch-friendly navigation

---

## 📁 Project Structure

```
rkp-portfolio/
├── index.html
├── css/
│   ├── variables.css    ← design tokens (colors, spacing, fonts)
│   ├── reset.css        ← CSS reset / base
│   ├── topbar.css       ← macOS top bar + <R.P> logo animation
│   ├── layout.css       ← CSS Grid shell, sidebar, settings panel
│   ├── sidebar.css      ← file explorer tree styles
│   ├── tabs.css         ← tab bar
│   ├── editor.css       ← editor area, line numbers, minimap
│   ├── terminal.css     ← terminal panel
│   ├── statusbar.css    ← bottom status bar
│   ├── syntax.css       ← syntax highlight classes + tooltips
│   ├── sections.css     ← rich section content styles
│   └── animations.css   ← splash screen, cursor, transitions, icon colors
├── js/
│   ├── data.js          ← all profile content (the RKP object — edit this)
│   ├── renderer.js      ← renders each section to HTML
│   ├── terminal.js      ← terminal REPL engine
│   └── app.js           ← tab manager, navigation, UI initialisation
└── assets/
    └── favicon.ico
```

---

## 🗂 File / Section Mapping

Each "file" in the VS Code sidebar maps to a portfolio section:

| Sidebar File | Section | Content |
|---|---|---|
| `home.tsx` | Hero / About | Typing animation, intro, quick links |
| `experience.ts` | Work History | Timeline — 6 companies, 12+ years |
| `skills.css` | Tech Skills | Chip grid across 7 categories |
| `projects.json` | Projects | 11 project cards with detail |
| `about.md` | About Me | Bio, current focus, education |
| `contact.html` | Contact | Links with copy-to-clipboard |

---

## 💻 Terminal Commands

Open the terminal (`Ctrl+`` ` or click the panel) and type any command:

| Command | Description |
|---|---|
| `help` | List all available commands |
| `whoami` | Name, title, company, tagline |
| `ls` | List all portfolio files |
| `open <file>` | Navigate to a section (e.g. `open projects.json`) |
| `cat about.txt` | Print bio directly in the terminal |
| `skills` | All tech skills grouped by category |
| `experience` | Full work history timeline |
| `projects` | All 11 projects list |
| `contact` | Contact information |
| `theme <name>` | Switch theme: `dark` / `one-dark` / `dracula` / `nord` |
| `clear` | Clear the terminal output |
| `github` | Open GitHub profile in a new tab |
| `linkedin` | Open LinkedIn profile in a new tab |
| `hire me` | Easter egg 🎉 |
| `sudo hire-me` | Another easter egg 🚀 |

**Keyboard shortcuts inside the terminal:**

| Shortcut | Action |
|---|---|
| `↑` / `↓` | Navigate command history |
| `Tab` | Autocomplete command or filename |
| `Ctrl+L` | Clear terminal |
| `Ctrl+C` | Cancel current input |
| `Ctrl+`` ` | Toggle terminal panel open / closed |

---

## 🎨 Color Themes

| Theme | Command | Description |
|---|---|---|
| Dark+ | `theme dark` | VS Code default dark (default) |
| One Dark | `theme one-dark` | Atom One Dark palette |
| Dracula | `theme dracula` | Classic Dracula purple scheme |
| Nord | `theme nord` | Arctic, north-bluish color palette |

Themes can also be changed from the **Settings panel** (gear icon in the activity bar).

---

## 🚀 Getting Started

No installation required. No package manager. No build step.

**Clone and open:**

```bash
git clone https://github.com/irkpadhiyar/rkp-portfolio.git
cd rkp-portfolio
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or simply download the ZIP from GitHub and double-click `index.html`.

**Requirements:** Any modern browser — Chrome, Firefox, Edge, Safari. That's it.

---

## ☁️ Deployment

Because there is no build step, any static host works out of the box.

**GitHub Pages**

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Set source to the `main` branch, root folder.
4. Your portfolio is live at `https://<username>.github.io/<repo-name>/`.

**Netlify**

1. Drag and drop the project folder onto [netlify.com/drop](https://netlify.com/drop).
2. Done — instant live URL, no configuration needed.

**Vercel**

```bash
npx vercel --prod
```

Point it to the repo root. Vercel will detect it as a static site automatically.

**Any other static host** (Cloudflare Pages, Surge, etc.) — just upload the folder. No `_redirects` rules, no config files needed.

---

## 🛠 Customizing for Yourself

All profile content lives in a single file: **`js/data.js`**.

It exports one object (`RKP`) with the following top-level keys. Edit only this file and your entire portfolio updates automatically — the renderer reads everything from it.

```
data.js
 └── RKP
      ├── name           ← Full name
      ├── alias          ← Short alias shown in the terminal prompt
      ├── title          ← Current job title (also used in typing animation)
      ├── company        ← Current employer
      ├── tagline        ← One-liner shown on whoami
      ├── contact        ← email, phone, github, linkedin URLs
      ├── roles[]        ← Array of titles cycled in the typing animation
      ├── about          ← Bio text, current focus, education details
      ├── experience[]   ← Work history: company, role, dates, highlights[]
      ├── skills{}       ← Object keyed by category; each value is a string[]
      └── projects[]     ← Array of project objects: name, description, tech[], links{}
```

**Steps to fork and personalise:**

1. Fork or clone the repo.
2. Open `js/data.js` in any text editor.
3. Replace every value in the `RKP` object with your own details.
4. Update `assets/favicon.ico` with your own icon (optional).
5. Open `index.html` in a browser — done.

No other file needs to be touched for a content-only personalisation. If you want to change the colour tokens (accent colour, background shades, etc.) those all live in `css/variables.css`.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 — custom properties, Grid, Flexbox, `@keyframes` |
| Scripting | Vanilla JavaScript ES6+ (IIFE modules) |
| Fonts | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Icons | Unicode / CSS-drawn |
| Build | None |
| Dependencies | None |

---

## 👤 About the Author

**Rajendrasinh Padhiyar** (RKP) is a Lead Software Engineer with 12+ years of experience building enterprise-grade web applications. He currently works at **iBase-t** on the **Solumina MES platform** for the aerospace and defence industry.

Core expertise: React.js, Node.js, TypeScript, full-stack architecture, frontend team leadership.

---

## 📬 Connect

| | |
|---|---|
| **Email** | [irkpadhiyar@gmail.com](mailto:irkpadhiyar@gmail.com) |
| **GitHub** | [github.com/irkpadhiyar](https://github.com/irkpadhiyar) |
| **LinkedIn** | [linkedin.com/in/irkpadhiyar](https://www.linkedin.com/in/irkpadhiyar/) |
| **Phone** | +91 97243 08467 |

---

## 📄 License

This project is open source under the [MIT License](LICENSE). Feel free to fork it, customise it, and use it as your own portfolio — attribution appreciated but not required.

---

*Built with zero dependencies. Just code, craft, and a love for VS Code.*
