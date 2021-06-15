export default function bodyLoaded (callback) {
  if (!document.body.classList.contains('is-body-loaded')) {
    const wait = setInterval(() => {
      if (document.body.classList.contains('is-body-loaded')) {
        clearInterval(wait)
        callback()
      }
    }, 1)
  } else {
    callback()
  }
}
