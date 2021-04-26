"use strict";
/*VARIABLES*/
var pos = [0, 0]; //coordenadas y de los cohetes
var aux = false; //true subo, false bajo
var cont = 0; //Los cohetes han llegado a la potencia máxima
var rocketWin; //cohete ganador id
/*FUNCIONES*/
var play = function () {
    btnPlay.classList.add('no-visible');
    btnGame.classList.remove('no-visible');
};
var goRocket = function (num) {
    aux = true;
    var max = rocketArray[num].acelerateRocket();
    //si ha llegado a la potencia máxima, fin, sino muevo cohete
    (max === true) ? endGame(num, aux) : moveRocket(num, aux);
};
var stopRocket = function (num) {
    aux = false;
    rocketArray[num].brakeRocket();
    (pos[num] === 0) ? endGame(num, aux) : moveRocket(num, aux);
};
var moveRocket = function (num, aux) {
    divRockets[num].classList.remove('rock-move');
    divRockets[num].classList.add('rock-up');
    //hacemos animación, true adelante,false atras
    rockAnime(num, aux);
};
var rockAnime = function (num, aux) {
    var cant;
    //si sube o baja
    (aux === true) ? cant = "-" : cant = "+";
    //creamos objeto animacion
    var rocketKeyframes = new KeyframeEffect(divRockets[num], [
        { transform: 'translateY(0px) rotate(-45deg)' },
        { transform: "translateY(" + cant + "20px) rotate(-45deg)" }
    ], { duration: 1000, fill: 'forwards' });
    var rocketAnimation = new Animation(rocketKeyframes, document.timeline);
    rocketAnimation.play();
    //guardamos coordenada del cohete  
    if (aux === false) {
        divRockets[num].style.top = pos[num].toString() + "px";
        pos[num] = eval(pos[num] + cant + 20);
    }
    else {
        pos[num] = eval(pos[num] + cant + 20);
        divRockets[num].style.top = pos[num].toString() + "px";
    }
};
//función has llegado a la potencia máxima
var endGame = function (num, aux) {
    if (aux === true) {
        cont++;
        //deshabilitamos botones cuando llega a la potencia máxima     
        eval("btnAcelerate" + num).classList.add('disabled');
        eval("btnBrake" + num).classList.add('disabled');
        eval("finish" + num).classList.remove('no-visible');
        eval("finish" + num).classList.add('visible');
        /*MOSTRAR FIN DE JUEGO, los dos cohetes han llegado a la potencia máxima FIN*/
        if (cont === divRockets.length) {
            if (rocketArray[0].currentMaxPower > rocketArray[1].currentMaxPower) {
                rocketWin = rocketArray[0].idRocket;
            }
            else {
                rocketWin = rocketArray[1].idRocket;
            }
            //mostrar ganador
            showWinner.innerHTML = "<h1 class=\"text-danger text-center\">YOU WIN</h1></br><b>ROCKET:</b> " + rocketWin;
            $("#myModal").modal("show");
        }
    }
};
function resetGame() {
    //ocultar juego 
    game.classList.remove('visible');
    game.classList.add('no-visible');
    for (i = 0; i < divRockets.length; i++) {
        //habilitar botones
        eval("btnAcelerate" + i).classList.remove('disabled');
        eval("btnAcelerate" + i).classList.add('active');
        eval("btnBrake" + i).classList.remove('disabled');
        eval("btnBrake" + i).classList.add('active');
        //vaciar campos crear cohetes
        eval("inputRocket" + i + "Id").value = "";
        eval("selectRocket" + i).selectedIndex = 0;
        //ocultar fin
        eval("finish" + i).classList.remove('visible');
        eval("finish" + i).classList.add('no-visible');
        //colocamos cohetes al principio
        divRockets[i].style.top = "0px";
        //movimiento cohete
        eval("gameRocket" + i).classList.remove('rock-up');
        eval("gameRocket" + i).classList.add('rock-move');
    }
    //vacio arrays de cohetes e inicializo variables
    rocketArray.length = 0;
    proppellerArray.length = 0;
    maxPowerProppeller = 0;
    pos = [0, 0];
    cont = 0;
    //mostrar crear cohetes
    roquetForm.classList.remove('no-visible');
    roquetForm.classList.add('visible');
}
