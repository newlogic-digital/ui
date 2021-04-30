<p align="center">
  <a href="https://ui.newlogic.cz/" target="_blank" rel="noopener noreferrer">
    <img width="180" src="https://ui.devlogic.cz/assets/favicons/android-chrome-192x192.png" alt="Logo">
  </a>
</p>
<p align="center">
  <a href="https://npmjs.com/package/@newlogic-digital/ui"><img src="https://img.shields.io/npm/v/@newlogic-digital/ui.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/@newlogic-digital/ui.svg" alt="node compatility"></a>
</p>

# 🎨 Newlogic UI

> v3 is still in early development

Modern and modular CSS framework with the best principles.

- 💡 Modern
- 📦 Modular
- 📏 Responsive
- ✨️ Progressive
- ⚡️ Fast

Newlogic UI is component framework with simple syntax. Inspired by popular frameworks like Bootstrap and Bulma. It uses Tailwind CSS for utility classes. The modern approach comes first.

## ⚙️ Under the hood
* **[Newlogic Core](https://core.newlogic.cz/)** - set of tools that can be used to create modern web applications
* **[ESM](https://tailwindcss.com/)** - completely written in modern JS syntax - ES8+, ES module, etc.
* **[PostCSS](https://postcss.org/)** - completely written in modern CSS syntax - nesting, variables, etc.
* **[Tailwind CSS](https://tailwindcss.com/)** - rich utility classes for everything
* **[Stimulus](https://stimulus.hotwire.dev/)** - a modest JavaScript framework for the HTML you already have
* **Dark mode** - creating dark mode was never easier
* **Easy syntax** - .ui-btn (ui elements), .c-component (components), .c-section (sections) etc.


The core of the Newlogic UI is Newlogic Core, which compiles modern JS and CSS code and contains other tools for web development. The source code is written in way that it can be used with other tools or a completely different environment than NodeJS, such as Deno. In general the rule is that the source code should be executable in current or future browsers, so it's written with W3C standards in mind. The framework is modular and you can really use only what is needed for your project.

##🪄 Instalation

Creating a new project (using Newlogic Core)
```sh
$ git clone --depth 1 https://github.com/newlogic-digital/ui.git newlogic-ui-project
$ cd newlogic-ui-project && npm i
```
```sh
$ npx gulp serve
```
or
```sh
$ npx gulp production
```
___
Or in any other environment
```sh
$ npm i @newlogic-newlogic/ui
```

```css
/* main.css or individual modules */
@import "node_modules/@newlogic/ui/src/icons/style.css"
@import "node_modules/@newlogic/ui/src/styles/main.css"
```

```js
/* main.js or individual modules */
import "node_modules/@newlogic/ui/src/scripts/main.js"
```

### Requirements

- [Node.js LTS (14.x)](https://nodejs.org/en/download/)
- [NPM (7.x)](https://www.npmjs.com/package/npm) or [Yarn (2.x)](https://yarnpkg.com/)

### Config

Each Newlogic Core project has to have config via `gulpfile.js`, docs - [core.newlogic.cz](https://core.newlogic.cz/)

## 📌 Future plans
- finishing docs and translating it to english
- lighthouse optimization
- upgrading form elements
- new elements - dropdown, notificaton, snack and more

## Licence
GNU GPLv3