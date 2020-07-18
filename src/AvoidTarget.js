import {setAttributes, setStyle} from "./utils";
import PlusOne from "./img/+1.png";
import MinusOne from "./img/-1.png";

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
            backgroundColor: 'green',
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
            this.showMinusOne();
            let e = new Event("destroy");
            targetArea.dispatchEvent(e); // dispatching destroy event on the click
        });

    }).bind(this);

    this.getTargetArea = () => targetArea;

    this.attach = function(parentElement) {
        console.log("AvoidTarget: attach()")

        setStyle(targetArea, {
            left : Math.random() * (parentElement.offsetWidth - 100 - targetArea.offsetWidth) + "px",
            top : Math.random() * (parentElement.offsetHeight - 100 - targetArea.offsetHeight) + "px"
        });
        parentElement.appendChild(targetArea);
    };

    this.detach = function() {
        console.log("AvoidTarget: detach()")
        this.showPlusOne();
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

    this.showPlusOne = function() {
        const plusOne = new Image();
        plusOne.src = PlusOne;

        setStyle(targetArea, {
            backgroundColor: 'white'
        })

        setStyle(plusOne, {
            width: '50px',
            height: '50px',
        })

        targetArea.appendChild(plusOne);
        setTimeout(function() {
            targetArea.removeChild(plusOne);
        }, 1000);
    }


    this.showMinusOne = function() {
        const minusOne = new Image();
        minusOne.src = MinusOne;

        setStyle(targetArea, {
            backgroundColor: 'white'
        })

        setStyle(minusOne, {
            width: '50px',
            height: '50px',
        })

        targetArea.appendChild(minusOne);
        setTimeout(function() {
            targetArea.removeChild(minusOne);
        }, 1000);
    }

    init();
};

export default AvoidTarget;
