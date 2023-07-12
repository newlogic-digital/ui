export default function replaceTag (documentElement) {
    documentElement.querySelectorAll('[data-lib-replace-tag]').forEach(element => {
        const replaceTag = document.querySelector(`[data-lib-replace-tag=${element.dataset.libReplaceTag}]`)
        const placement = element.closest('head') ? document.head : replaceTag.parentElement

        replaceTag ? (replaceTag.outerHTML = element.outerHTML) : placement.insertAdjacentHTML('beforeend', element.outerHTML)
    })
}
