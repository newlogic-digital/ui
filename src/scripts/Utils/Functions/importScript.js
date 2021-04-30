function importScript(url) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`) === null) {
            const script = document.createElement('script');

            script._importScript = new Promise((load, error) => {
                script.src = url;
                script.onload = () => {load(); resolve()};
                script.onerror = () => {error(); reject()};
            });

            document.head.appendChild(script);
        } else {
            document.querySelector(`script[src="${url}"]`)._importScript.then(resolve);
        }
    })
}

export default importScript;
