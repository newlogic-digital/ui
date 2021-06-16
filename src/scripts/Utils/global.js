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

if (document.body.classList.contains('is-body-preload')) {
    document.body.classList.remove('is-body-preload')
    setTimeout(() => document.body.classList.add('is-body-loaded'), 300)
}

if (document.querySelector('[data-loadcss]') !== null) {
    if (typeof document.fonts !== 'undefined') {
        document.fonts.ready.then(() => {
            document.documentElement.classList.add('wf-active')
        })

        setTimeout(() => {
            if (!document.documentElement.classList.contains('wf-active')) {
                document.documentElement.classList.add('wf-active')
            }
        }, 500)
    } else {
        document.documentElement.classList.add('wf-active')
    }
}
