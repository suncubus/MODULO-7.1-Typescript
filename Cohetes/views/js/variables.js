"use strict";
var validator;
/*NO SE SI ESTO SE PUEDE OPTIMIZAR UTILIZANDO BUCLES?????Lo he intentado pero no encuentro la manera*/
//formulario
var roquetForm = document.querySelector("#roquetForm");
//los inputs como elemento html
var inputRocket0Id = document.querySelector("#inputRocket0Id");
var inputRocket1Id = document.querySelector("#inputRocket1Id");
//los select
var selectRocket0 = document.querySelector("#selectRocket0");
var selectRocket1 = document.querySelector("#selectRocket1");
//Array
var formElements = [inputRocket0Id, inputRocket1Id, selectRocket0, selectRocket1];
//Los div de error
var invalidRocket0Id = document.querySelector("#invalidRocket0Id");
var invalidRocket1Id = document.querySelector("#invalidRocket1Id");
var inavalidRocket0select = document.querySelector("#inavalidRocket0select");
var inavalidRocket1select = document.querySelector("#inavalidRocket1select");
//elementos html
var game = document.querySelector("#game");
var info1 = document.querySelector("#info1");
var info2 = document.querySelector("#info2");
var finish0 = document.querySelector("#finish0");
var finish1 = document.querySelector("#finish1");
var myModal = document.querySelector("#myModal");
var showWinner = document.querySelector("#showWinner");
//cohetes html
var gameRocket0 = document.querySelector("#gameRocket0");
var gameRocket1 = document.querySelector("#gameRocket1");
var divRockets = [gameRocket0, gameRocket1];
//btn
var btnPlay = document.querySelector("#btnPlay");
var btnGame = document.querySelector("#btnGame");
var btnAcelerate0 = document.querySelector("#btnAcelerate0");
var btnBrake0 = document.querySelector("#btnBrake0");
var btnAcelerate1 = document.querySelector("#btnAcelerate1");
var btnBrake1 = document.querySelector("#btnBrake1");
