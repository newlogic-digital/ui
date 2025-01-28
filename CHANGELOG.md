## v4.0.0
https://ui.newlogic.cz/blog/newlogic-ui-4.x.html
* feat(bc): updated to winduum v2
* feat(bc): added winduum-stimulus
* feat(bc): externalize stimulus controllers, modules and composibles
* feat(bc): new file structure
* feat(bc): updated to eslint v9, added neostandard
* feat(bc): added support for tailwindcss v4
* feat(bc): removed air-datepicker and @simonwep/pickr
* feat: added support for view transition API
* feat: updated to vite newlogic core v3 and vite v6

## v3.7.5
* feat: deps update
* fix: swup replace tag selector
* fix: readme logo

## v3.7.4
* feat: updated to eslint v9 and neostandard
* feat: naja update
* feat: updated deps

## v3.7.3
* feat: updated to naja 3.2
* feat: updated to swup 3.7

## v3.7.2
* fix: ui-check validate method
* fix: lib-form example
* fix: ui-control, ui-check dynamic import
* feat: deps update

## v3.7.1
* feat: updated to winduum 1.2.0
* feat(bc): removed tippy, added c-popover as alternative

## v3.7.0
* feat(bc): added winduum c-drawer
* feat(bc): changed layout components from ids to classes
* feat(bc): removed l-default wrapper in Layout/Main.tpl
* feat(bc): removed browser detection script from Layout/Main.tpl
* feat(bc): c-cookieconsent renamed to c-dialog-cookieconsent
* feat(bc): added @newlogic-digital/cookieconsent-js
* feat(bc): added naja 3.1, now lazy loaded and with extensions
* feat(bc): removed stimulus lib-naja#makeRequest in favour of data-naja
* feat(bc): recaptcha submit removed, follow docs for more info
* feat(bc): removed most of utils in favour of @newlogic-digital/utils-js
* feat(bc): removed lib-script in favour of @newlogic-digital/utils-js
* feat(bc): removed lib-slider, use c-carousel from winduum instead
* feat(bc): removed ui-dot, use winduum dot utility class instead
* feat(bc): theme, removed rgb css properties
* feat(bc): removed styles/Utils/icons.css, use styles/Utils/config.css instead
* feat(bc): removed styles/Utils/print.css
* feat(bc): renamed styles/Utils/tailwind.css to styles/Utils/utilities.css
* feat(bc): updated to winduum 1.1.1
* feat: added toaster from winduum
* feat: added delegateController helper for access other controllers
* feat: added lib-reveal with ability to lazy-load controllers
* feat: added winduum c-form, lib-form stays
* feat: added initAfter util helper
* feat: removed has polyfill
* feat: removed lib-hint, use winduum c-popover
* feat: new modern favicons
* feat: updated to vite v5.2

## v3.6.5
* feat: cookie consent update
* feat: manual chunks

## v3.6.4
* feat: update winduum v1.0.0
* fix: swup transition and containers

## v3.6.3
* feat: update winduum v0.9.0
* fix: swup scroll

## v3.6.2
* feat: update winduum v0.7.0

## v3.6.1
* feat: update winduum v0.6.0

## v3.6.0
* feat: updated deps - winduum v0.5.0, tailwindcss v3.4
* feat: updated stylelint, added @stylistic/stylelint
* feat: updated media vars in `main.json`

## v3.5.8
* feat: icon.svg uses symbols
* feat: vite v5, vituum v1.1, newlogic-core v2.1

## v3.5.7
* feat: remove service worker
* feat: simplified inputStep

## v3.5.6
* feat: update winduum to 0.4.0

## v3.5.5
* feat: added preload and modulepreload to main.json

## v3.5.4
* feat: added swup and stimulus as top-level await

## v3.5.3
* feat: tailwindcss emails
* feat: improved form submitter loading state
* feat: improved lib-naja makeRequest
* fix: cleanup deleted userfiles

## v3.5.2
* feat: naja `get` stimulus method changed to `makeRequest`
* feat: dependencies update
* fix: datepicker attributes and change event

## v3.5.1
* feat(bc): swup v4 update
* feat: dependencies update

## v3.5.0
* feat(bc): added winduum 0.3.x and its components
* feat(bc): added new winduum color pallet with `color-mix`, colors now have also `-rgb` variants for better compatibility
* feat(bc): removed `Libraries/Anchor.js`
* feat(bc): removed `Libraries/Tabs.js`
* feat(bc): `Libraries/NativeSlider.js` changed to `Libraries/Slider.js` and uses Stimulus API now
* feat(bc): removed submitFetch method in `Libraries/ReCaptcha.js`, param naja added instead
* feat(bc): `ui-select` and `ui-input` were replaced with `ui-control`
* feat(bc): `ui-radio` and `ui-checkbox` is now replaced with `ui-check`
* feat(bc): `ui-input-group`,`ui-btn-group` and `ui-badge-group` is now replaced with `ui-group`
* feat(bc): `Functions/checkValidity.js` renamed to `Functions/inputValidity.js`
* feat: `vanilla-datepicker` replaced with `air-datepicker`
* feat: added `replaceScript.js` function

## v3.4.2
* feat: vituum v1 update
* feat: newlogic core v2 update
* feat: deps update

## v3.4.1
* feat: minor changes from winduum
* feat: removed seamless polyfill
* feat: update stylelint v32 and added stylelint-stylistic plugin

## v3.4.0
* feat: added winduum native dialog with better accessibility
* feat: added winduum tailwind plugin and new css breakpoints
* feat: changed emails root to src/views/email
* feat: added some missing type definitions
* feat: remove inView function
* feat: improved syntax of tracking events in LibSwup
* feat(bc): lib-dialog now uses native stimulus attributes, see docs for more info
* feat(bc): lib-dialog fetch expects "content" in response, instead of "dialog"
* fix: dynamic imports with @vite-ignore

## v3.3.1
* feat: swup v3 update
* feat: dependencies update
* feat: added loading before send to lib-form
* feat: added naja submit to lib-recaptcha
* feat: added sklik retargetingHit to swup
* feat: added najaLoad to loadStimulus function

## v3.3.0
* feat: added email posthtml examples
* feat(bc): removed stimulus helpers - queryTarget, getValue etc.
* feat: improved form validation
* feat(bc): changed ui-dropdown to c-dropdown
* feat: minor js and css refactor
* feat: added types for reCatpcha
* feat: added focus-visible on all hover elements
* feat: removed absolute positioning on ui-image
* feat: added css properties for border-radius (--rounded-*) and spacing (--spacing-*)
* feat: added tailwind helpers for --rounded-* and --spacing-*
* feat: improved responsive breakpoints
* feat: added icons docs page
* feat: added :has postcss plugin
* fix: native slider counterMax

## v3.2.0
* feat(bc): changed gulp to vituum
* feat: stimulus v3.1 update
* feat: cookieconsent improvements
* feat: changed c-form to lib-form
* feat: added lib-script controller

## v3.1.0
* feat: tailwind v3 update
* feat: stimulus v3 update
* feat: iconfont replaced with svg icons
* feat: updated lib-cookieconsent
* feat: improved lib-anchor
* feat: most of callbacks replaced with promises
* feat: complete refactor of CSS and JS

## v3.0.13
* feat: recaptcha enterprise

## v3.0.12
* feat: eslint import extensions
* feat: newlogic core update, es-module-shims update
* fix: core->main js in twig

## v3.0.11
* feat: stylint custom properties units
* feat: stimulus window instance

## v3.0.10
* feat: stylelint and reformat to standard

## v3.0.9
* remove: preload / bodyLoaded functionality

## v3.0.8
* feat: eslint and reformat to standard

## v3.0.7
* feat: tippy for interactive dropdowns

## v3.0.6
* feat: improved form controls

## v3.0.5
* improved: stimulus loaded as @stimulus/core

## v3.0.0
* feat: initial release
