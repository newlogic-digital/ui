import {LibStimulus, Controller} from "../Libraries/Stimulus.js";

LibStimulus.register("ui-wsw", class extends Controller {
    connect() {
        let self = this, element = self.element;

        Array.from(element.querySelectorAll("table")).filter((table) => {
            self.wrap(table, new DOMParser().parseFromString(`<div class="elm_text_table"></div>`, 'text/html').body.firstChild);
        });

        Array.from(element.querySelectorAll("iframe")).filter((iframe) => {
            if (iframe.src.match(/youtubee\.com/i)) {
                self.wrap(iframe, new DOMParser().parseFromString(`<div class="elm_text_video" style="max-width: ${iframe.width.includes("%") ? iframe.width : iframe.width + 'px'}"></div>`, 'text/html').body.firstChild);
            } else if (iframe.width && iframe.style.aspectRatio !== "undefined") {
                iframe.style.aspectRatio = iframe.width + '/' + iframe.height;
                iframe.style.height = "auto";
            }
        });
    }

    wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }
});