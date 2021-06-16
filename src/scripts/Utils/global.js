if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => {
        if (!document.documentElement.classList.contains('no-sw')) {
            navigator.serviceWorker.register('/sw.js').catch(e => {
                console.error('Error during service worker registration:', e)
            })
        } else {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                if (registrations.length > 0) {
                    for (const registration of registrations) {
                        registration.unregister()
                    }
                }
            })
        }
    })
}
