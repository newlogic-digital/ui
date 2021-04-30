const LibCookieConsent = {
    init: () => {
        if (localStorage.getItem('cookieconsent') === "approve") {
            let type = localStorage.getItem('cookieconsent_type');
            if (type !== null) {
                if (type === "performance") {
                    LibCookieConsent.append("performance");
                } else if (type === "marketing") {
                    LibCookieConsent.append("all");
                }
            } else {
                LibCookieConsent.append("all");
            }
        } else if (localStorage.getItem('cookieconsent') === null) {
            LibCookieConsent.append("all");
        }
    },
    set: (type, callback) => {
        if (type === "approve") {
            localStorage.setItem("cookieconsent", "approve");
            LibCookieConsent.append("all");

        } else if (type === "performance") {
            localStorage.setItem("cookieconsent", "approve");
            localStorage.setItem("cookieconsent_type", "performance");
            LibCookieConsent.append("performance");

        } else if (type === "marketing") {
            localStorage.setItem("cookieconsent", "approve");
            localStorage.setItem("cookieconsent_type", "marketing");
            LibCookieConsent.append("all");

        } else if (type === "decline") {
            localStorage.setItem("cookieconsent", "decline");
            localStorage.removeItem("cookieconsent_type");
            LibCookieConsent.remove();

            if (callback) {
                callback();
            }
        }
    },
    remove: () => {
        document.cookie.split(";").forEach(function(c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    },
    append: (type) => {
        [...document.querySelectorAll("[data-lib-cookieconsent]")].map((elm) => {
            if (type === "all" || elm.getAttribute("data-lib-cookieconsent") === type) {
                let script = document.createElement("script");
                let delay = 0;

                [...elm.attributes].forEach((attribute) => {
                    if (attribute.specified) {
                        if (attribute.name.indexOf("data-lib-cookieconsent") === -1 && attribute.name.indexOf("type") === -1) {
                            script.setAttribute(attribute.name, attribute.value);
                        }
                    }
                });

                script.innerHTML = elm.innerHTML;

                if (elm.getAttribute("data-lib-cookieconsent-delay")) {
                    delay = parseInt(elm.getAttribute("data-lib-cookieconsent-delay"));
                }

                setTimeout(() => {
                    if (elm.closest("body") !== null) {
                        document.body.appendChild(script);
                    } else if (elm.closest("head") !== null) {
                        document.head.appendChild(script);
                    }

                    elm.remove();
                }, delay);
            }
        })
    }
};

export default LibCookieConsent;
