"use strict";
/*VARIABLES*/
var car;
var carArray = [];
var validatorCar;
var validatorFeatures;
var htmlString = "";
//formularios
var carForm = document.querySelector("#carForm");
var featuresForm = document.querySelector("#featuresForm");
//los inputs como elemento html
var inputPlate = document.querySelector("#inputPlate");
var inputBrand = document.querySelector("#inputBrand");
var inputColor = document.querySelector("#inputColor");
var InputCarArray = [inputPlate, inputBrand, inputColor];
var inputR1 = document.querySelector("#inputR1");
var inputR2 = document.querySelector("#inputR2");
var inputR3 = document.querySelector("#inputR3");
var inputR4 = document.querySelector("#inputR4");
var inputD1 = document.querySelector("#inputD1");
var inputD2 = document.querySelector("#inputD2");
var inputD3 = document.querySelector("#inputD3");
var inputD4 = document.querySelector("#inputD4");
var InputFeaturesArray = [inputR1, inputR2, inputR3, inputR4, inputD1, inputD2, inputD3, inputD4];
//Los div de error
var invalidPlate = document.querySelector("#invalidPlate");
var invalidBrand = document.querySelector("#invalidBrand");
var invalidColor = document.querySelector("#invalidColor");
var invalidR1 = document.querySelector("#invalidR1");
var invalidR2 = document.querySelector("#invalidR2");
var invalidR3 = document.querySelector("#invalidR3");
var invalidR4 = document.querySelector("#invalidR4");
var invalidD1 = document.querySelector("#invalidD1");
var invalidD2 = document.querySelector("#invalidD2");
var invalidD3 = document.querySelector("#invalidD3");
var invalidD4 = document.querySelector("#invalidD4");
//div mostrar coche
var viewCars = document.querySelector("#viewCars");
var deleteCar = document.querySelector("#deleteCar");
/*FUNCIONES DE VALIDACIÓN DE LOS FORMULARIOS*/
function validateCar() {
    //valor de los inputs
    var carInputs = {
        plate: document.getElementById("inputPlate").value,
        brand: document.getElementById("inputBrand").value,
        color: document.getElementById("inputColor").value
    };
    var plate = carInputs.plate, brand = carInputs.brand, color = carInputs.color;
    fInvalid(InputCarArray);
    validatorCar = true;
    //validaciones matricula, marca y color
    validatorCar = comPlate(plate, inputPlate, invalidPlate, validatorCar);
    validatorCar = compInput(brand, inputBrand, invalidBrand, validatorCar);
    validatorCar = compInput(color, inputColor, invalidColor, validatorCar);
    //si todo es correcto
    if (validatorCar) {
        //mostramos el formulario de características y deshabilitamos el formulario
        carForm.classList.add('no-visible');
        featuresForm.classList.remove('no-visible');
        featuresForm.classList.add('visible');
        //creamos car
        car = new Car(convUpper(plate), convUpper(brand), convUpper(color));
    }
    return validatorCar;
}
function validateFeatures() {
    //recoger inputs, para el diametro recibimos un string, modificamos y convertimos number
    var wheelDiameStr1 = point(document.getElementById("inputD1").value);
    var wheelDiameStr2 = point(document.getElementById("inputD2").value);
    var wheelDiameStr3 = point(document.getElementById("inputD3").value);
    var wheelDiameStr4 = point(document.getElementById("inputD4").value);
    var featuresForm = {
        wheelBrand1: document.getElementById("inputR1").value,
        wheelBrand2: document.getElementById("inputR2").value,
        wheelBrand3: document.getElementById("inputR3").value,
        wheelBrand4: document.getElementById("inputR4").value,
        wheelDiame1: parseFloat(wheelDiameStr1),
        wheelDiame2: parseFloat(wheelDiameStr2),
        wheelDiame3: parseFloat(wheelDiameStr3),
        wheelDiame4: parseFloat(wheelDiameStr4)
    };
    var wheelBrand1 = featuresForm.wheelBrand1, wheelBrand2 = featuresForm.wheelBrand2, wheelBrand3 = featuresForm.wheelBrand3, wheelBrand4 = featuresForm.wheelBrand4, wheelDiame1 = featuresForm.wheelDiame1, wheelDiame2 = featuresForm.wheelDiame2, wheelDiame3 = featuresForm.wheelDiame3, wheelDiame4 = featuresForm.wheelDiame4;
    fInvalid(InputFeaturesArray);
    //variable para controlar que todas las validaciones estén hechas
    validatorFeatures = true;
    //Validaciones marca
    validatorFeatures = compInput(wheelBrand1, inputR1, invalidR1, validatorFeatures);
    validatorFeatures = compInput(wheelBrand2, inputR2, invalidR2, validatorFeatures);
    validatorFeatures = compInput(wheelBrand3, inputR3, invalidR3, validatorFeatures);
    validatorFeatures = compInput(wheelBrand4, inputR4, invalidR4, validatorFeatures);
    //Validaciones diametro
    validatorFeatures = compDiameter(wheelDiame1, inputD1, invalidD1, validatorFeatures);
    validatorFeatures = compDiameter(wheelDiame2, inputD2, invalidD2, validatorFeatures);
    validatorFeatures = compDiameter(wheelDiame3, inputD3, invalidD3, validatorFeatures);
    validatorFeatures = compDiameter(wheelDiame4, inputD4, invalidD4, validatorFeatures);
    //todo ok, completamos los datos del coche
    if (validatorFeatures) {
        car.addWheel(new Wheel(wheelDiame1, convUpper(wheelBrand1)));
        car.addWheel(new Wheel(wheelDiame2, convUpper(wheelBrand2)));
        car.addWheel(new Wheel(wheelDiame2, convUpper(wheelBrand3)));
        car.addWheel(new Wheel(wheelDiame4, convUpper(wheelBrand4)));
        viewCar();
    }
    return validatorFeatures;
}
/*FUNCIONES DE VALIDACIONES DE LOS CAMPOS*/
//funcion para eliminar la clase invalid
var fInvalid = function (content) {
    content.forEach(function (value) {
        value.classList.remove('is-invalid');
    });
};
//funcion para validar la matrícula
function comPlate(txt, input, div, interruptor) {
    if (txt == "") {
        input.classList.add('is-invalid');
        div.innerText = "Este campo es obligatorio";
        interruptor = false;
    }
    else if (!plateVerify(txt)) {
        input.classList.add('is-invalid');
        div.innerText = "Una matrícula son 4 números y 3 letras";
        interruptor = false;
    }
    else {
        input.value = convUpper(txt);
    }
    return interruptor;
}
//función valida formato matricula
function plateVerify(txt) {
    //4 números y 3 letras
    var expresion = /^[0-9]{4}[a-zA-Z]{3}$/;
    return expresion.test(txt) ? true : false;
}
//función valida inputs de texto
function compInput(txt, input, div, interruptor) {
    if (txt == "") {
        input.classList.add('is-invalid');
        div.innerText = "Este campo es obligatorio";
        interruptor = false;
    }
    else if (!txtVerify(txt)) {
        input.classList.add('is-invalid');
        div.innerText = "Solo puedes escribir letras";
        interruptor = false;
    }
    else {
        input.value = convUpper(txt);
    }
    return interruptor;
}
//función valida formato texto
function txtVerify(txt) {
    //solo letras
    var expresion = /^[a-zA-Z0]/;
    return expresion.test(txt) ? true : false;
}
//funcion convierte mayusculas
var convUpper = function (content) { return content = content.toUpperCase(); };
//funcion para  diametro
function compDiameter(num, input, div, interruptor) {
    if (isNaN(num)) {
        input.classList.add('is-invalid');
        div.innerText = "Este campo es obligatorio";
        interruptor = false;
    }
    else if (num > 2 || num < 0.4) {
        input.classList.add('is-invalid');
        div.innerText = "El diámetro tiene que ser entre 0.4 y 2";
        interruptor = false;
    }
    else {
        //dejamos solo 1 decimal
        num.toFixed(1);
        input.value = num.toString();
    }
    return interruptor;
}
//función sustituir la , por el .
var point = function (aux) { return aux.replace(',', '.'); };
/*MOSTRAR COCHES*/
function viewCar() {
    //guardamos el coche en un array
    carArray.push(car);
    console.log(carArray);
    //mostramos el coche
    featuresForm.classList.add('no-visible');
    viewCars.classList.remove('no-visible');
    viewCars.classList.add('visible');
    printCar(carArray);
}
function printCar(carArray) {
    //recorro array de coches
    carArray.forEach(function (cars) {
        htmlString +=
            "<div class=\"col-12 col-md-6 col-lg-4 card text-white bg-primary mt-3\" id=\"deleteCar\">\n                        <div class=\"card-header\"><b<MARCA:</b> " + cars.brand + "</div>\n                            <div class=\"card-body\">    \n                                <p class=\"card-text\"><b>Matricula:</b> " + cars.plate + "</p>\n                                <p class=\"card-text\"><b>Color:</b> " + cars.color + "</p>\n                                <table class=\"table\">\n                                    <thead>\n                                        <tr>\n                                        <th scope=\"col\">Marca</th>\n                                        <th scope=\"col\">Di\u00E1metro</th>\n                                        </tr>\n                                    </thead>\n                                    <tbody>";
        cars.wheels.forEach(function (name) {
            return htmlString +=
                "<tr>                              \n                                            <td>" + name.brand + "</td>\n                                            <td>" + name.diameter + "</td>\n                                        </tr>";
        });
        htmlString +=
            "</tbody>\n                                </table>                      \n                            </div>                    \n                    </div> ";
    });
    viewCars.innerHTML = htmlString + "\n            <div class=\"row\">\n                <div class=\"col-12\">            \n                    <button type=\"button\" class=\"btn btn-primary mt-2\" onclick=\"start();\">A\u00F1adir coche</button>\n                </div>                    \n            </div> ";
}
function start() {
    carForm.classList.remove('no-visible');
    carForm.classList.add('visible');
    InputCarArray.forEach(function (input) { return input.value = ""; });
    featuresForm.classList.add('no-visible');
    InputFeaturesArray.forEach(function (input) { return input.value = ""; });
    viewCars.classList.add('no-visible');
    htmlString = "";
}
/*


(document.getElementById('carForm') as HTMLFormElement).reset();
e.preventDefault();
}



*/
