"use strict";
/*FUNCIONES DE VALIDACIONES DE LOS CAMPOS*/
function validateRockets() {
    //NO CONSIGO OPTIMIZAR EL CÓDIGO
    /*for (let i:number=1;i<3;i++){
        eval("rocket"+i) =  (<HTMLInputElement>document.getElementById("inputRocket"+i+"0Id")).value;
        "rocket"+i =  (<HTMLInputElement>document.getElementById("inputRocket+i+Id")).value;
        rocket+i =  (<HTMLInputElement>document.getElementById("inputRocket+i+Id")).value;
    }*/
    //valor de los inputs    
    var formInputsValue = {
        rocket0: document.getElementById("inputRocket0Id").value,
        rocket1: document.getElementById("inputRocket1Id").value,
        select0: parseInt(document.getElementById("selectRocket0").value),
        select1: parseInt(document.getElementById("selectRocket1").value),
    };
    var rocket0 = formInputsValue.rocket0, rocket1 = formInputsValue.rocket1, select0 = formInputsValue.select0, select1 = formInputsValue.select1;
    fInvalid(formElements);
    validator = true;
    for (var i_1 = 0; i_1 < 2; i_1++) {
        validator = comId(eval("rocket" + i_1), eval("inputRocket" + i_1 + "Id"), eval("invalidRocket" + i_1 + "Id"), validator);
        validator = comNumProp(eval("select" + i_1), eval("selectRocket" + i_1), eval("inavalidRocket" + i_1 + "select"), validator);
    }
    if (validator) {
        for (var i_2 = 0; i_2 < 2; i_2++) {
            createRocket(eval("rocket" + i_2), eval("select" + i_2));
        }
        roquetForm.classList.add('no-visible');
        //mostramos la info del cohete
        showInfo();
    }
    return validator;
}
//funcion para eliminar la clase invalid
var fInvalid = function (content) {
    content.forEach(function (value) {
        value.classList.remove('is-invalid');
    });
};
//validar id de cohete
function comId(txt, input, invalid, interruptor) {
    if (txt == "") {
        interruptor = requiredForm(input, invalid, interruptor);
    }
    else if (!idVerify(txt)) {
        input.classList.add('is-invalid');
        invalid.innerText = "Must be 8 characters";
        interruptor = false;
    }
    else {
        input.value = convUpper(txt);
    }
    return interruptor;
}
//validar select del número de propulsores
var comNumProp = function (combo, input, invalid, interruptor) {
    if (isNaN(combo)) {
        interruptor = requiredForm(input, invalid, interruptor);
    }
    return interruptor;
};
//función que valida formato del id (8 caracteres)
var idVerify = function (txt) {
    var expresion = /^[0-9a-zA-Z]{8}$/;
    return expresion.test(txt) ? true : false;
};
//funcion convierte mayusculas
var convUpper = function (content) { return content = content.toUpperCase(); };
//mostrar requerido
var requiredForm = function (input, invalid, interruptor) {
    input.classList.add('is-invalid');
    invalid.innerText = "This field is required";
    return interruptor = false;
};
