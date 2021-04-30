function LibRipple(element, e) {
    const init = function (container) {
        if (container.querySelector(".lib-ripple-inner") === null) {
            container.insertAdjacentHTML("beforeend", `<div class='lib-ripple-inner'></div>`);
        }

        let ink = container.querySelector(".lib-ripple-inner");

        ink.classList.remove("animation");

        if (ink.clientWidth === 0 && ink.clientHeight === 0) {
            let d = Math.max(element.offsetWidth, element.offsetHeight);

            ink.style["width"] = d + 'px';
            ink.style["height"] = d + 'px';
        }

        let x, y;

        if (container === document.body) {
            x = e.clientX - container.offsetLeft - (ink.clientWidth / 2);
            y = e.clientY - container.offsetTop - (ink.clientHeight / 2);
        } else {
            x = e.pageX - container.offsetLeft - (ink.clientWidth / 2);
            y = e.pageY - container.offsetTop - (ink.clientHeight / 2);
        }

        ink.style["top"] = y + 'px';
        ink.style["left"] = x + 'px';
        ink.classList.add("animation");
    };

    if (element.getAttribute("data-action-ripple") === "body") {
        init(document.body);
    } else {
        init(element);
    }
}

export default LibRipple;