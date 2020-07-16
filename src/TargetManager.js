import Target from "./Target";

let TargetManager = function(area, multiplier) {
    let list = [];
    let counter = 0;
    let score = 0;
    let idInterval;
    let idTimeout;
    let idEndGame;
    let idTimerInterval;
    let inGame = false;
    let targetTime = 1.2 * multiplier;
    let time = 3;
    let appearInterval = 0.6 * multiplier;

    this.newTarget = function(id) {
        console.log("Creating target");
        let target = new Target(id);
        list.push(target);
        counter++;
        console.log("Total targets: " + counter);

        target.handleTimeout(function() {
            console.log("Miss!");
            this.detach();
        }, targetTime * 1000);

        target.handleEvent("destroy", function(target) {
            console.log("Hit!");
            score++;
            let i;
            for(let index in list) {
                if(list[index] === target) {
                    i = index;
                    break;
                }
            }
            list.splice(i, 1);
            console.log("Total targets after destroy: " + counter);
        });
        return target;
    };

    this.append = function(target) {
        console.log("Appending target after creation: " + counter);
        target.attach(area);
    };

    this.list = list;
    this.getCounter = () => counter;
    this.isInGame = () => inGame;
    this.getScore = () => score;
    this.getTime = () => time;

    this.init = (function() {
        inGame = true;
        idInterval = setInterval( this.setupTargetCreationInterval, appearInterval * 1000);
        idTimeout = setTimeout(this.setupGameTimeout, time * 1000);
        idTimerInterval = setInterval(this.decreaseTimerInterval, 1000);
    }).bind(this);

    this.reset = (function() {
        let child = area.lastElementChild;
        while (child) {
            area.removeChild(child);
            child = area.lastElementChild;
        }
        list = [];
        counter = 0;
        score = 0;
        inGame = false;
        clearInterval(idInterval);
        clearTimeout(idTimeout);
    }).bind(this);

    this.setupTargetCreationInterval = (function() {
        let target = this.newTarget();
        this.append(target);
    }).bind(this);

    this.setupGameTimeout = (function() {
        clearInterval(idInterval);
        idEndGame = setTimeout(this.waitLastTarget, targetTime * 1000);

    }).bind(this);

    this.waitLastTarget = (function() {
        inGame = false;
    }).bind(this);

    this.decreaseTimerInterval = function() {
        if (time > 0) --time;
    }
};

export default TargetManager;
