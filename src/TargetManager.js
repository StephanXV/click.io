import AvoidTarget from "./AvoidTarget";
import HitTarget from "./HitTarget";
import {removeFromList} from "./utils";

let TargetManager = function(area, multiplier) {
    console.log("new TargetManager()")

    let list = [];
    let counter = 0;
    let score = 0;
    let idInterval;
    let idTimeout;
    let idEndGame;
    let idTimerInterval;
    let inGame = false;
    let targetTime = 1.2 * multiplier;
    let time = 10;
    let appearInterval = 0.6 * multiplier;

    this.newAvoidTarget = function(id) {
        console.log("TargetManager: newAvoidTarget()")

        let avoidTarget = new AvoidTarget(id);

        list.push(avoidTarget);
        counter++;

        avoidTarget.handleTimeout(function() {
            console.log("Dodge! +1");
            score++;
            this.detach();
        }, targetTime * 1000);

        avoidTarget.handleEvent("destroy", function(target) {
            console.log("Ouch! -1");
            score--;
            list = removeFromList(list, target);
            console.log("Total targets after destroy: " + counter);
        });
        return avoidTarget;
    };

    this.newHitTarget = function(id) {
        console.log("TargetManager: newHitTarget()")

        let hitTarget = new HitTarget(id);

        list.push(hitTarget);
        counter++;

        hitTarget.handleTimeout(function() {
            console.log("Miss! -1");
            score--;
            this.detach();
        }, targetTime * 1000);

        hitTarget.handleEvent("destroy", function(target) {
            console.log("Hit! +1");
            score++;
            list = removeFromList(list, target);
            console.log("Total targets after destroy: " + counter);
        });
        return hitTarget;
    };

    // invoca attach sul target in input
    this.append = function(target) {
        console.log("TargetManager: append()")

        target.attach(area);
    };

    // getters, con i quali interfacciarsi dall'esterno
    this.getCounter = () => counter;
    this.isInGame = () => inGame;
    this.getScore = () => score;
    this.getTime = () => time;

    // funzione che dà inizio alla creazione dei target
    let init = function() {
        console.log("TargetManager: init()")

        inGame = true;

        // intervallo per l'apparizione di nuovi target
        idInterval = setInterval(this.createNewTarget, appearInterval * 1000);

        // timeout che fa partire il conto alla rovescia del tempo
        idTimeout = setTimeout(this.setupGameTimeout, time * 1000);

        // intervallo che permette di decrementare ogni secondo il tempo rimanente
        idTimerInterval = setInterval(decreaseTimer, 1000);
    }.bind(this);

    // rinizializza il manager
    this.reset = function() {
        console.log("TargetManager: reset()")

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
        clearInterval(idTimerInterval);
        clearInterval(idEndGame);
    }

    // crea un target e lo mostra a video
    this.createNewTarget = function() {
        console.log("TargetManager: createNewTarget()")

        let target;

        if (Math.random() < 0.5) {
            target = this.newAvoidTarget();
        } else {
            target = this.newHitTarget();
        }

        this.append(target);
    }.bind(this);

    // stoppa la creazione di nuovi target e aspetta che l'ultimo target venga hittato o scompaia tramite un timeout
    this.setupGameTimeout = function() {
        console.log("TargetManager: setupGameTimeout()")

        clearInterval(idInterval);
        idEndGame = setTimeout(stopGame, targetTime * 1000);
    }.bind(this);

    // stoppa il gioco
    let stopGame = function() {
        console.log("TargetManager: stopGame()")

        clearInterval(idTimerInterval);
        inGame = false;
    }

    // decrementa il tempo rimanente
    let decreaseTimer = function() {
        console.log("TargetManager: decreaseTimer()")

        if (time > 0) --time;
    }

    init();
};

export default TargetManager;
