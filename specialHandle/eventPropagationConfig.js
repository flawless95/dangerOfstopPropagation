var recursiveParentElement = function(element, checkElement) {
    if (element === checkElement) {
        return true;
    } else if (element.parentElement.nodeName !== 'BODY') {
        recursiveParentElement(element.parentElement, checkElement);
    } else {
        return false;
    }
};

