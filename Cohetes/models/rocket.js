"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(idRocket, numPropeller, maxPower) {
        this.propellers = new Array();
        this.currentMaxPower = 0;
        this.idRocket = idRocket;
        this.numPropeller = numPropeller;
        this.maxPower = maxPower;
    }
    Rocket.prototype.addPropeller = function (propeller) {
        this.propellers.push(propeller);
    };
    Rocket.prototype.acelerateRocket = function () {
        var max = false;
        for (var i_1 = 0; i_1 <= this.propellers.length - 1; i_1++) {
            if (this.propellers[i_1].currentPower >= 0 && this.propellers[i_1].currentPower <= this.propellers[i_1].numPower) {
                if (this.currentMaxPower < this.maxPower) {
                    this.propellers[i_1].currentPower += 10;
                    this.currentMaxPower += this.propellers[i_1].currentPower;
                }
                else {
                    this.currentMaxPower = this.maxPower;
                    max = true;
                }
            }
        }
        return max;
    };
    Rocket.prototype.brakeRocket = function () {
        var max = true;
        for (var i_2 = 0; i_2 <= this.propellers.length - 1; i_2++) {
            if (this.propellers[i_2].currentPower > 0) {
                this.propellers[i_2].currentPower -= 10;
                this.currentMaxPower -= this.propellers[i_2].currentPower;
            }
        }
    };
    return Rocket;
}());
