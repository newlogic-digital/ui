export default function inView(element, callback, options) {
    let inView = false;

    if (typeof IntersectionObserver === "undefined" && callback) {
        callback();
        return false;
    }

    if (typeof options === "undefined") {
        options = {};
    }

    if (typeof options.rootMargin === "undefined") {
        options.rootMargin = "100px";
    }

    new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting && inView === false) {
                inView = entries[0].isIntersecting;
                if (callback) {
                    callback()
                }
            }
        }, options
    ).observe(element);
}