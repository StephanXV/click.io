import {setAttributes, setStyle} from "./utils";

let HitTarget = function(id) {
    console.log("new HitTarget()");

    let targetArea; // area to click
    let idTargetTimeout; // expiring time

    let init = (function() {
        console.log("HitTarget: init()")

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
            console.log("HitTarget: addingExpiringTimeout()")

            event.stopPropagation();
            clearInterval(idTargetTimeout);
            this.detach();
            let e = new Event("destroy");
            targetArea.dispatchEvent(e); // dispatching destroy event on the click
        });

    }).bind(this);

    this.getTargetArea = () => targetArea;

    this.attach = function(parentElement) {
        console.log("HitTarget: attach()")

        setStyle(targetArea, {
            left : Math.random() * (parentElement.offsetWidth - 50 - targetArea.offsetWidth) + "px",
            top : Math.random() * (parentElement.offsetHeight - 50 - targetArea.offsetHeight) + "px"
        });
        parentElement.appendChild(targetArea);
    };

    this.detach = function() {
        console.log("HitTarget: detach()")

        targetArea.parentElement.removeChild(targetArea);
    };

    this.handleEvent = function(eventType, callback) {
        console.log("HitTarget: handleEvent()")

        targetArea.addEventListener(eventType, callback.bind(this));
    }.bind(this);

    this.handleTimeout = function (callback, interval) {
        console.log("HitTarget: handleTimeout()")

        idTargetTimeout = setTimeout(callback.bind(this), interval);
    }.bind(this);

    this.reset = function() {
        console.log("HitTarget: reset()")

        clearInterval(idTargetTimeout);
    };

    init();
};

export default HitTarget;
