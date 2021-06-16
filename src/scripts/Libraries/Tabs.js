export default function LibTabs(element, callback) {
    [...element.querySelector('[data-lib-tabs-nav]').querySelectorAll('[data-lib-tabs-item="nav"]')].forEach((selector, index) => {
        selector.addEventListener('click', e => {
            e.preventDefault()

            selector.closest('[data-lib-tabs-nav]').querySelectorAll('[data-lib-tabs-item="nav"]').forEach(elm => elm._removeDataValue('state', 'active'))
            selector._addDataValue('state', 'active')

            ;[...element.querySelector('[data-lib-tabs-area]').children].forEach(elm => {
                elm._removeDataValue('state', 'active')
            })

            element.querySelector('[data-lib-tabs-area]').children[index]._addDataValue('state', 'active')

            if (callback) {
                callback(index)
            }
        })
    })
}
