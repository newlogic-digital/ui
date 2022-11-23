export default function LibTabs(element) {
    element.querySelector('[data-lib-tabs-nav]').querySelectorAll('[data-lib-tabs-item="nav"]').forEach((selector, index) => {
        selector.addEventListener('click', () => {
            arguments[0].preventDefault()

            selector.closest('[data-lib-tabs-nav]').querySelectorAll('[data-lib-tabs-item="nav"]').forEach(element => element._removeDataValue('state', 'active'))
            selector._addDataValue('state', 'active')

            ;[...element.querySelector('[data-lib-tabs-area]').children].forEach(element => {
                element._removeDataValue('state', 'active')
            })

            element.querySelector('[data-lib-tabs-area]').children[index]._addDataValue('state', 'active')
        })
    })
}
