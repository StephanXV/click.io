import {setAttributes, setStyle} from "./utils";

let Target = function(id) {
    let targetArea; // target to click
    let targetTimeout;

    let init = (function() {
        targetArea = document.createElement('div');
        let random = Math.random() + 0.4; // random target size, between 20px and 50px
        setStyle(targetArea, {
            width: random * 50 +'px',
            height: random * 50 +'px',
            borderRadius: '50%',
            backgroundColor: 'black',
            position: 'absolute',
        });

        if (id) {
            setAttributes(targetArea, {
                id: id
            });
        }

        targetArea.addEventListener('click', (event) => {
            event.stopPropagation();
            clearInterval(targetTimeout);
            this.detach();
            let e = new Event("destroy");
            targetArea.dispatchEvent(e); // dispatching destroy event on the click
        });

    }).bind(this);

    this.attach = function(parentElement) {
        setStyle(targetArea, {
            left : Math.random() * (parentElement.offsetWidth - 50 - targetArea.offsetWidth) + "px",
            top : Math.random() * (parentElement.offsetHeight - 50 - targetArea.offsetHeight) + "px"
        });
        parentElement.appendChild(targetArea);
    };

    this.detach = function() {
        targetArea.parentElement.removeChild(targetArea);
    };

    this.handleEvent = function(eventType, callback) {
        targetArea.addEventListener(eventType, callback.bind(this));
    }.bind(this);

    this.handleTimeout = function (callback, interval) {
        targetTimeout = setTimeout(callback.bind(this), interval);
    }.bind(this);

    this.reset = function() {
        clearInterval(targetTimeout);
    };

    init();
};

export default Target;
