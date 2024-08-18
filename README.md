<p align="center">
  <a href="https://ui.newlogic.cz/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://ui.newlogic.cz/favicons/favicon-512.webp" alt="Logo" style="border-radius: 999px">
  </a>
</p>
<p align="center">
  <a href="https://npmjs.com/package/@newlogic-digital/ui"><img src="https://img.shields.io/npm/v/@newlogic-digital/ui.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@newlogic-digital/ui.svg" alt="node compatility"></a>
</p>

# 🎨 Newlogic UI

Lightweight, modern and modular CSS framework with the best principles

- 💡 Modern
- 📦 Modular
- 📏 Responsive
- ✨️ Progressive
- ⚡️ Fast

## Příprava projektu pro implementaci
1. nainstalovat node - `npm i`
2. nainstalovat cms - `newlogic init cms`
3. vytvořit si db na devlogic.cz a nastavit v `config/local.neon`
4. spustit `docker compose up` a `vite`
5. spustit `make prepare`
6. spustit `make phinx-seed`
7. nastavit `FTP_SERVER`, `DB_USERNAME` a `DB_PASSWORD` a vytvořit prostor na devlogic.cz
8. commitnout změny a pushnout

Newlogic UI is component framework with easy syntax for backend integration. Modern approach of CSS properties, enriched with utility classes from TailwindCSS and powered by Winduum.

Javascript implementation is only **28 kB** and mainly intended for use on backend rendered websites and applications with PHP framework Nette

## ⚙️ Under the hood
* **[Vituum](https://vituum.dev/)** - plugins for Vite, adds support for template engines and more.
* **[Newlogic Core](https://github.com/newlogic-digital/core)** - starter pack for creating modern web applications. Powered by Vite and Vituum.
* **[ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** - completely written in modern JS syntax - esnext, ES modules, etc.
* **[PostCSS](https://postcss.org/)** - completely written in modern CSS syntax - nesting, variables, etc.
* **[Tailwind CSS](https://tailwindcss.com/)** - rich utility classes for everything
* **[Stimulus](https://stimulus.hotwire.dev/)** - a modest JavaScript framework for the HTML you already have
* **Dark mode** - creating dark mode was never easier
* **Easy syntax** - .ui-btn (ui elements), .c-component (components), .c-section (sections) etc.


Newlogic UI uses Newlogic Core, which compiles modern JS and CSS syntax via Vite and Vituum. Source code can be used with any other tools or even different environment than NodeJS, e.g. Deno and is written in W3C standards and should be runnable in current or future version of browsers.

## 🪄 Get started

Creating a new project (with Vituum and Newlogic Core)
```sh
$ git clone --depth 1 https://github.com/newlogic-digital/ui.git newlogic-ui-project
$ cd newlogic-ui-project && npm i
```
```sh
$ vite
```
or
```sh
$ vituum build
```
___
Or in any other environment
```sh
$ npm i @newlogic-digital/ui
```

```css
/* main.css or individual modules */
@import "@newlogic-digital/ui/src/styles/main.css"
```

```js
/* main.js or individual modules */
import "@newlogic-digital/ui/src/scripts/main.js"
```

### Requirements

- [Node.js LTS (16.x)](https://nodejs.org/en/download/)
- [NPM (9.x)](https://www.npmjs.com/package/npm) or any other package manager

## Licence
GNU GPLv3
