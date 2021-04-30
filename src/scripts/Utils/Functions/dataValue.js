Element.prototype._addDataValue = function(key, value) {
    key = `data-${key}`;

    let attribute = this.getAttribute(key);

    if (attribute === null) {
        this.setAttribute(key, value);
    } else {
        value = value.split(" ");
        attribute = attribute.split(" ");

        value.map(value => {
            !attribute.includes(value) && attribute.push(value)
        });

        this.setAttribute(key, attribute.join(" "));
    }
}

Element.prototype._removeDataValue = function(key, value) {
    let result = [];

    key = `data-${key}`;

    let attribute = this.getAttribute(key);

    if (attribute === null) {
        return;
    }

    attribute.split(" ").map(attribute => {
        !value.split(" ").includes(attribute) && result.push(attribute)
    });

    if (result.length !== 0) {
        this.setAttribute(key, result.join(" "));
    } else {
        this.removeAttribute(key);
    }
}

Element.prototype._hasDataValue = function(key, value) {
    key = `data-${key}`;

    let attribute = this.getAttribute(key);

    if (attribute === null) return false;
    return attribute.split(" ").includes(value);
}