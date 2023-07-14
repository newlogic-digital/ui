export default function importScript (url) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`) === null) {
            const script = document.createElement('script')

            script._importScript = new Promise((resolve, reject) => {
                script.src = url
                script.onload = resolve
                script.onerror = reject
            }).then(resolve).catch(reject)

            document.head.appendChild(script)
        } else {
            document.querySelector(`script[src="${url}"]`)._importScript.then(resolve)
        }
    })
}
