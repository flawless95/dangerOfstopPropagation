

var closeBtn = document.getElementById('closeBtn');
var wrapperDialog = document.getElementById('wrapperDialog');
var externalElement = document.getElementById('externalElement');
var siblingElement = document.getElementById('siblingElement');
var body = document.getElementsByTagName('body')[0];

var closeFunction = function() {
    alert('closeFunction was invoked');
};

var recursiveParentElement = function(element, checkElement) {
    if (element === checkElement) {
        return true;
    } else if (element.parentElement.nodeName !== 'BODY') {
        recursiveParentElement(element.parentElement, checkElement);
    } else {
        return false;
    }
};

var bindCallbackQueue = [
    {
        name: 'closeBtn',
        element: closeBtn,
        callback: function() {
            console.log('closeBtn was clicked, operate inside');
            closeFunction();
        }
    },
    {
        name: 'wrapperDialog',
        element: wrapperDialog,
        callback: function() {
            console.log('externalElement was clicked, operate inside');
        }
    },
    {
        name: 'externalElement',
        element: externalElement,
        callback: function() {
            console.log('externalElement was clicked');
        }
    },
    {
        name: 'siblingElement',
        element: siblingElement,
        callback: function(event) {
            console.log('siblingElement was clicked');
        }
    }
];

for ( var i = 0, l = bindCallbackQueue.length; i < l; i++ ) {
    (function(){
        var index = i;
        bindCallbackQueue[index].element.addEventListener('click', function(event) {
            bindCallbackQueue[index].callback(event);
        });
    })(i);
}

body.addEventListener('click', function(event) {
    console.log('event propagation to body');
    // 对期望的行为单独处理
    if(!recursiveParentElement(event.target, wrapperDialog)) {
        closeFunction();
    }
});