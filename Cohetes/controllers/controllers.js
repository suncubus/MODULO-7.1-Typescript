"use strict";
//crear Rocket
var rocketGame;
var rocketArray = [];
var i;
var proppellerArray = [];
var maxPowerProppeller = 0;
//info
var infoDiv;
var htmlString;
//CREAMOS COHETES
var createRocket = function (rocket, select) {
    //asignar potencia propulsores de forma aleatoria y calcular máxima potencia    
    for (i = 0; i < select; i++) {
        var aux_1 = round();
        maxPowerProppeller += aux_1;
        proppellerArray.push(aux_1); //almacenamos en un array la potencia de los propulsores    
    }
    //creamos cohete
    rocketGame = new Rocket(rocket, select, maxPowerProppeller);
    //Añadimos al cohete, los propulsores y potencia
    proppellerArray.forEach(function (value) {
        rocketGame.addPropeller(new Propeller(value, 0));
    });
    //almacenamos el objeto rocket en un array
    rocketArray.push(rocketGame);
    //vaciamos array para el próximo objeto
    proppellerArray = [];
};
//número aleatorio decenas (0-90)
var round = function () {
    var value = Math.floor((Math.random() * (90 - 0 + 1)) + 0);
    return value = Math.floor(value / 10) * 10;
};
/*MOSTRAR INFO*/
var showInfo = function () {
    game.classList.remove('no-visible');
    var j = 1;
    //mostrar info cohetes
    rocketArray.forEach(function (rockets) {
        showRocketInfo(eval('info' + j), rockets);
        while (j < rocketArray.length) {
            j++;
        }
    });
};
var showRocketInfo = function (infoDiv, element) {
    htmlString = "<p><b>R:</b> " + element.idRocket + "</p><p><b>P:</b>";
    element.propellers.forEach(function (name) {
        return htmlString +=
            " " + name.numPower + " ";
    });
    htmlString += "</p><p><b>M P:</B> " + element.maxPower + "</p>";
    infoDiv.innerHTML = htmlString;
    htmlString = "";
};
