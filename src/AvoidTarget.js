import {setAttributes, setStyle} from "./utils";

let AvoidTarget = function(id) {
    console.log("new AvoidTarget()");

    let targetArea; // area to click
    let idTargetTimeout; // expiring time

    let init = (function() {
        console.log("AvoidTarget: init()")

        targetArea = document.createElement('div');
        let random = Math.random() + 0.4; // random target size, between 20px and 50px
        setStyle(targetArea, {
            width: random * 50 +'px',
            height: random * 50 +'px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            position: 'absolute',
        });

        if (id) {
            setAttributes(targetArea, {
                id: id
            });
        }

        targetArea.addEventListener('click', (event) => {
            console.log("AvoidTarget: addingExpiringTimeout()")

            event.stopPropagation();
            clearInterval(idTargetTimeout);
            this.detach();
            let e = new Event("destroy");
            targetArea.dispatchEvent(e); // dispatching destroy event on the click
        });

    }).bind(this);

    this.getTargetArea = () => targetArea;

    this.attach = function(parentElement) {
        console.log("AvoidTarget: attach()")

        setStyle(targetArea, {
            left : Math.random() * (parentElement.offsetWidth - 50 - targetArea.offsetWidth) + "px",
            top : Math.random() * (parentElement.offsetHeight - 50 - targetArea.offsetHeight) + "px"
        });
        parentElement.appendChild(targetArea);
    };

    this.detach = function() {
        console.log("AvoidTarget: detach()")
        targetArea.parentElement.removeChild(targetArea);
    };

    this.handleEvent = function(eventType, callback) {
        console.log("AvoidTarget: handleEvent()")

        targetArea.addEventListener(eventType, callback.bind(this));
    }.bind(this);

    this.handleTimeout = function (callback, interval) {
        console.log("AvoidTarget: handleTimeout()")

        idTargetTimeout = setTimeout(callback.bind(this), interval);
    }.bind(this);

    this.reset = function() {
        console.log("AvoidTarget: reset()")

        clearInterval(idTargetTimeout);
    };

    init();
};

export default AvoidTarget;
