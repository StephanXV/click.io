import {setStyle} from "./utils";
import PlusOne from "./img/+1.png";
import MinusOne from "./img/-1.png";

// type 0: avoid; type 1: hit;
let Target = function(type) {
    console.log("new Target()");

    let targetArea; // area del target
    let idTargetTimeout;

    if (type === undefined) throw Error;

    // comportamento al click
    this.handleClick = function(event) {
        console.log("Target: addingExpiringTimeout()")

        event.stopPropagation();
        clearInterval(idTargetTimeout);
        switch (type) {
            case 0:
                this.showMinusOne();
                break;
            case 1:
                this.showPlusOne();
                break;
        }
        let e = new Event("destroy");
        targetArea.dispatchEvent(e); // dispatching destroy event on the click
    }.bind(this);


    let init = function() {
        console.log("Target: init()")

        targetArea = document.createElement('div');
        let random = Math.random() + 0.4; // random target size, between 20px and 50px
        switch (type) {
            case 0:
                setStyle(targetArea, {
                    width: random * 50 +'px',
                    height: random * 50 +'px',
                    borderRadius: '50%',
                    backgroundColor: 'green',
                    position: 'absolute',
                });
                break;
            case 1:
                setStyle(targetArea, {
                    width: random * 50 +'px',
                    height: random * 50 +'px',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                    position: 'absolute',
                });
                break;
        }

        targetArea.addEventListener('click', this.handleClick);

    }.bind(this);


    this.attach = function(parentElement) {
        console.log("Target: attach()")

        // posiziona il target in una coordinata random del campo di gioco, ovvero il parent
        setStyle(targetArea, {
            left : Math.random() * (parentElement.offsetWidth - 100 - targetArea.offsetWidth) + "px",
            top : Math.random() * (parentElement.offsetHeight - 100 - targetArea.offsetHeight) + "px"
        });
        parentElement.appendChild(targetArea);
    };

    this.detach = function() {
        console.log("Target: detach()")
        targetArea.parentElement.removeChild(targetArea);
    };

    // handler per eventi
    this.handleEvent = function(eventType, callback) {
        console.log("Target: handleEvent()")

        targetArea.addEventListener(eventType, callback.bind(this));
    }.bind(this);

    // handler per timeout
    this.handleTimeout = function (callback, interval) {
        console.log("Target: handleTimeout()")

        idTargetTimeout = setTimeout(callback.bind(this), interval);
    }.bind(this);

    this.reset = function() {
        console.log("Target: reset()")

        clearInterval(idTargetTimeout);
    };

    // mostra img +1
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
        targetArea.removeEventListener('click', this.handleClick);
        setTimeout(function() {
            this.detach();
        }.bind(this), 700);
    };


    // mostra img -1
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
        targetArea.removeEventListener('click', this.handleClick);
        setTimeout(function() {
            this.detach();
        }.bind(this), 700);
    }

    init();
};

export default Target;
