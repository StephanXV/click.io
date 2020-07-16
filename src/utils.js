let setStyle = function(element, style) {
    for(let property in style) {
        element.style[property] = style[property];
    }
};

let setAttributes = function(element, attributes) {
    for(let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }
};

export {
    setStyle,
    setAttributes
}
