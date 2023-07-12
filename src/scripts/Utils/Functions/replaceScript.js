export default function replaceScript (selector) {
    selector.querySelectorAll('script').forEach(script =>
        script.setAttribute('data-controller', 'lib-script'))
}
