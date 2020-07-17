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

let removeFromList = function(list, target) {
    let i;
    for(let index in list) {
        if(list[index] === target) {
            i = index;
            break;
        }
    }
    return list.splice(i, 1);
}

export {
    setStyle,
    setAttributes,
    removeFromList
}
