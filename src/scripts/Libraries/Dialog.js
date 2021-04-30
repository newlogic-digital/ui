const LibDialog = {
    show: (content, callback) => {
        if (document.querySelector(".lib-dialog > [class^='c-dialog']") !== null) {
            document.querySelector(".lib-dialog > [class^='c-dialog']").remove();
        }

        if (document.querySelector(".lib-dialog") === null) {
            document.body.insertAdjacentHTML("beforeend", `<div class="lib-dialog"></div>`);
        }

        document.querySelector(".lib-dialog").insertAdjacentHTML("beforeend", content);
        document.querySelector(".lib-dialog").style["display"] = "flex";

        function outerHeight(el) {
            return el.offsetHeight + parseInt(getComputedStyle(el).marginTop) + parseInt(getComputedStyle(el).marginBottom);
        }

        if (outerHeight(document.querySelector(".lib-dialog > [class^='c-dialog']")) > window.innerHeight) {
            let offset = window.innerWidth - document.body.clientWidth;

            document.documentElement.style["padding-right"] = offset;
            document.documentElement.classList.add("is-overflow-hidden");

            if (document.querySelector("#l-header") !== null) {
                document.querySelector("#l-header").style["right"] = offset;
            }
        }

        if (callback) {
            callback();
        }

        document.querySelector(".lib-dialog").addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("lib-dialog")) {
                document.documentElement.addEventListener("mouseup", function e() {
                    LibDialog.hide();
                    document.documentElement.removeEventListener("mouseup", e);
                });
            }
        }, true);
    },
    hide: (callback) => {
        if (document.querySelector(".lib-dialog") !== null) {
            document.querySelector(".lib-dialog")._addDataValue("state", "hiding");
        }

        setTimeout(function () {
            if (document.querySelector(".lib-dialog") !== null) {
                document.querySelector(".lib-dialog").style["display"] = "none";
                document.documentElement.classList.remove("is-overflow-hidden");

                if (document.querySelector("#l-header") !== null) {
                    document.querySelector("#l-header").style["right"] = "";
                }

                document.querySelector(".lib-dialog").remove();
            }

            if (callback) {
                callback();
            }
        }, 300);
    },
    action: (element, url, callback) => {
        fetch(url, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then((response) => {
            return response.json();
        })
        .then((data) => {
            LibDialog.show(data["dialog"], callback);
        });
    }
};

export default LibDialog;