import { cssLoaded } from "./Functions/+.js";

if ('serviceWorker' in navigator && location.protocol === "https:") {
    window.addEventListener('load', function () {
        if (!document.documentElement.classList.contains("no-sw")) {
            navigator.serviceWorker.register('/sw.js').catch(function (e) {
                console.error('Error during service worker registration:', e);
            });
        } else {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                if (registrations.length > 0) {
                    for (let registration of registrations) {
                        registration.unregister()
                    }
                }
            });
        }
    });
}

if (document.body.classList.contains("is-body-preload")) {
    cssLoaded(function () {
        document.body.classList.remove("is-body-preload");
        setTimeout(function () {
            document.body.classList.add("is-body-loaded");
        }, 300);
    });
}

if (document.querySelector("[data-loadcss]") !== null) {
    if (typeof document.fonts !== "undefined") {
        document.fonts.ready.then(function () {
            document.documentElement.classList.add("wf-active");
        });

        setTimeout(() => {
            if (!document.documentElement.classList.contains("wf-active")) {
                document.documentElement.classList.add("wf-active");
            }
        }, 500);
    } else {
        document.documentElement.classList.add("wf-active");
    }
}