export default function replaceScript (selector) {
    selector.querySelectorAll('script:not([data-lib-cookieconsent])').forEach(script =>
        script.setAttribute('data-controller', 'lib-script'))
}
