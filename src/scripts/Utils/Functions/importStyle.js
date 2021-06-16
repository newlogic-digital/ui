export default function importStyle(url) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${url}"]`) === null) {
            const style = document.createElement('link')

            style._importStyle = new Promise((resolve, reject) => {
                style.href = url
                style.rel = 'stylesheet'
                style.onload = resolve
                style.onerror = reject
            }).then(resolve).catch(reject)

            document.head.prepend(style)
        } else {
            document.querySelector(`link[href="${url}"]`)._importStyle.then(resolve)
        }
    })
}
