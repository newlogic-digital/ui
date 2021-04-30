import { Application, Controller } from "stimulus";
import loadStimulus from "../Utils/Functions/loadStimulus.js";

const LibStimulus = new Application(document.documentElement, {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-ref"
});

LibStimulus.getController = (element, identifier) => LibStimulus.getControllerForElementAndIdentifier(element, identifier);

Controller.prototype.getValue = function(value) {
    return this[`${value}Value`]
};

Controller.prototype.setValue = function(type, value) {
    this[`${type}Value`] = value;
};

Controller.prototype.hasValue = function(type, value) {
    return this.data.has(`${type}Value`, value);
};

Controller.prototype.getClass = function(value) {
    return this.data.get(`${value}Class`)
};

Controller.prototype.queryTarget = function(target) {
    return this.targets.find(target)
};

Controller.prototype.queryTargetAll = function(targets) {
    return this.targets.findAll(targets)
};

Controller.prototype.hasTarget = function(target) {
    return this.targets.has(target)
};

LibStimulus.start().then(() => {
    loadStimulus(document);
});

window.LibStimulus = LibStimulus;

export { LibStimulus, Controller, loadStimulus };
