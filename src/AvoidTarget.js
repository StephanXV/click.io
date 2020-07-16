
let AvoidTarget = function(id, target) {
    this.prototype = target;

    this.detach = function() {
        console.log(this.prototype);
    }
};
