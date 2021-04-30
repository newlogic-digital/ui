export default function importStyle (url) {
    if (document.querySelector(`link[href="${url}"]`) === null) {
        document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${url}" />`);
    }
}