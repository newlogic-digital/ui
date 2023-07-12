!CSS.supports('selector(:has(*))') && (async () => (await import('css-has-pseudo/browser')).default(document))()

if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        if (!document.documentElement.classList.contains('no-sw')) {
            navigator.serviceWorker.register('/sw.js').catch(e => console.error(e))
        } else {
            navigator.serviceWorker.getRegistrations().then(async registrations => {
                for (const registration of registrations) {
                    await registration.unregister()
                }
            })
        }
    })
}
