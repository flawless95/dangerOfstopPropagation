var closeBtn = document.getElementById('closeBtn');
var wrapperDialog = document.getElementById('wrapperDialog');
var externalElement = document.getElementById('externalElement');
var siblingElement = document.getElementById('siblingElement');
var body = document.getElementsByTagName('body')[0];

var closeFunction = function() {
    alert('closeFunction was invoked');
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
            console.log('externalElement was clicked, close modalDilog');
            closeFunction();
        }
    },
    {
        name: 'siblingElement',
        element: siblingElement,
        callback: function(event) {
            event.cancelBubble = true;
        }
    },
    {
        name: 'body',
        element: body,
        callback: function() {
            console.log('event propagation to body');
            closeFunction();
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
