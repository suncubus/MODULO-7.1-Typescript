
/*VARIABLES*/
let car:Car;
const carArray: Car[] = [];

let validatorCar:boolean;
let validatorFeatures:boolean;

let htmlString:string ="";

interface CarForm {
    plate:string;
    brand:string;
    color:string;
}
interface FeaturesForm {
    wheelBrand1:string;
    wheelBrand2:string;
    wheelBrand3:string;
    wheelBrand4:string;
    wheelDiame1:number;
    wheelDiame2:number;
    wheelDiame3:number;
    wheelDiame4:number;
}

//formularios
const carForm = document.querySelector("#carForm") as HTMLElement;
const featuresForm = document.querySelector("#featuresForm") as HTMLElement;

//los inputs como elemento html
const inputPlate =   document.querySelector("#inputPlate") as HTMLInputElement;
const inputBrand =   document.querySelector("#inputBrand") as HTMLInputElement;
const inputColor =  document.querySelector("#inputColor") as HTMLInputElement;  

let InputCarArray: HTMLInputElement[] = [inputPlate,inputBrand, inputColor]; 

const inputR1   =   document.querySelector("#inputR1") as HTMLInputElement;
const inputR2   =   document.querySelector("#inputR2") as HTMLInputElement;
const inputR3   =   document.querySelector("#inputR3") as HTMLInputElement;  
const inputR4   =   document.querySelector("#inputR4") as HTMLInputElement;  
const inputD1   =   document.querySelector("#inputD1") as HTMLInputElement;
const inputD2   =   document.querySelector("#inputD2") as HTMLInputElement;
const inputD3   =   document.querySelector("#inputD3") as HTMLInputElement; 
const inputD4   =   document.querySelector("#inputD4") as HTMLInputElement; 

let InputFeaturesArray: HTMLInputElement[] = [inputR1,inputR2, inputR3, inputR4, inputD1,inputD2, inputD3, inputD4]; 

//Los div de error
const invalidPlate = document.querySelector("#invalidPlate") as HTMLElement;
const invalidBrand = document.querySelector("#invalidBrand") as HTMLElement;
const invalidColor = document.querySelector("#invalidColor") as HTMLElement;

const invalidR1 = document.querySelector("#invalidR1") as HTMLElement;
const invalidR2 = document.querySelector("#invalidR2") as HTMLElement;
const invalidR3 = document.querySelector("#invalidR3") as HTMLElement;
const invalidR4 = document.querySelector("#invalidR4") as HTMLElement;
const invalidD1 = document.querySelector("#invalidD1") as HTMLElement;
const invalidD2 = document.querySelector("#invalidD2") as HTMLElement;
const invalidD3 = document.querySelector("#invalidD3") as HTMLElement;
const invalidD4 = document.querySelector("#invalidD4") as HTMLElement;

//div mostrar coche
let viewCars    = document.querySelector("#viewCars") as HTMLElement;
let deleteCar    = document.querySelector("#deleteCar") as HTMLElement;

/*FUNCIONES DE VALIDACIÓN DE LOS FORMULARIOS*/
function validateCar() {   
    //valor de los inputs
    const carInputs: CarForm = {
        plate: (<HTMLInputElement>document.getElementById("inputPlate")).value,
        brand: (<HTMLInputElement>document.getElementById("inputBrand")).value,
        color: (<HTMLInputElement>document.getElementById("inputColor")).value
    }
    const { plate, brand, color } = carInputs;    
    
    fInvalid(InputCarArray);

    validatorCar = true;
    //validaciones matricula, marca y color
    validatorCar = comPlate(plate, inputPlate, invalidPlate, validatorCar);    
    validatorCar = compInput(brand , inputBrand ,invalidBrand, validatorCar);
    validatorCar = compInput(color , inputColor ,invalidColor, validatorCar);    

    //si todo es correcto
    if(validatorCar){ 
        //mostramos el formulario de características y deshabilitamos el formulario
        carForm.classList.add('no-visible');
        featuresForm.classList.remove('no-visible');
        featuresForm.classList.add('visible');  
        //creamos car
        car = new Car(convUpper(plate),convUpper(brand),convUpper(color));             
    }    
    return validatorCar;       
}

function validateFeatures() {
    //recoger inputs, para el diametro recibimos un string, modificamos y convertimos number
    let wheelDiameStr1:string =  point((<HTMLInputElement>document.getElementById("inputD1")).value);
    let wheelDiameStr2:string =  point((<HTMLInputElement>document.getElementById("inputD2")).value);
    let wheelDiameStr3:string =  point((<HTMLInputElement>document.getElementById("inputD3")).value);
    let wheelDiameStr4:string =  point((<HTMLInputElement>document.getElementById("inputD4")).value);

    const featuresForm: FeaturesForm = {
        wheelBrand1: (<HTMLInputElement>document.getElementById("inputR1")).value,
        wheelBrand2: (<HTMLInputElement>document.getElementById("inputR2")).value,
        wheelBrand3: (<HTMLInputElement>document.getElementById("inputR3")).value, 
        wheelBrand4: (<HTMLInputElement>document.getElementById("inputR4")).value, 
        wheelDiame1: parseFloat(wheelDiameStr1),
        wheelDiame2: parseFloat(wheelDiameStr2),
        wheelDiame3: parseFloat(wheelDiameStr3),
        wheelDiame4: parseFloat(wheelDiameStr4)
    }       
    const { wheelBrand1, wheelBrand2, wheelBrand3, wheelBrand4, wheelDiame1, wheelDiame2, wheelDiame3, wheelDiame4 } = featuresForm;

    fInvalid(InputFeaturesArray);

    //variable para controlar que todas las validaciones estén hechas
    validatorFeatures = true;

    //Validaciones marca
    validatorFeatures = compInput(wheelBrand1 , inputR1 , invalidR1, validatorFeatures);
    validatorFeatures = compInput(wheelBrand2 , inputR2 , invalidR2, validatorFeatures);
    validatorFeatures = compInput(wheelBrand3 , inputR3 , invalidR3, validatorFeatures);
    validatorFeatures = compInput(wheelBrand4 , inputR4 , invalidR4, validatorFeatures);
    //Validaciones diametro
    validatorFeatures = compDiameter(wheelDiame1 , inputD1 , invalidD1, validatorFeatures);
    validatorFeatures = compDiameter(wheelDiame2 , inputD2 , invalidD2, validatorFeatures);
    validatorFeatures = compDiameter(wheelDiame3 , inputD3 , invalidD3, validatorFeatures);
    validatorFeatures = compDiameter(wheelDiame4 , inputD4 , invalidD4, validatorFeatures);

      
    //todo ok, completamos los datos del coche
    if(validatorFeatures){  
        car.addWheel(new Wheel(wheelDiame1,convUpper(wheelBrand1)));
        car.addWheel(new Wheel(wheelDiame2,convUpper(wheelBrand2)));
        car.addWheel(new Wheel(wheelDiame2,convUpper(wheelBrand3)));
        car.addWheel(new Wheel(wheelDiame4,convUpper(wheelBrand4)));
        
        viewCar();
    }  
    return validatorFeatures; 
}

/*FUNCIONES DE VALIDACIONES DE LOS CAMPOS*/
//funcion para eliminar la clase invalid
let fInvalid = (content:HTMLInputElement[]):void => { 
    content.forEach(function (value) {
        value.classList.remove( 'is-invalid' );
      });   
}
//funcion para validar la matrícula
function comPlate (txt:string, input:HTMLInputElement, div:HTMLElement, interruptor:boolean){ 
    if( txt == "" ) {
        input.classList.add('is-invalid' );
        div.innerText="Este campo es obligatorio";
        interruptor = false;
    }else if (!plateVerify(txt)){
        input.classList.add('is-invalid' );
        div.innerText="Una matrícula son 4 números y 3 letras";
        interruptor = false;
    }else{  
        input.value =  convUpper(txt);
    }
    return interruptor;
}
//función valida formato matricula
function plateVerify(txt:string){
    //4 números y 3 letras
    let expresion = /^[0-9]{4}[a-zA-Z]{3}$/;    
    return expresion.test(txt) ? true : false;
}
//función valida inputs de texto
function compInput (txt:string, input:HTMLInputElement, div:HTMLElement, interruptor:boolean){ 
    if( txt == "" ) {
        input.classList.add('is-invalid' );
        div.innerText="Este campo es obligatorio";
        interruptor = false;
    }else if (!txtVerify(txt)){
        input.classList.add( 'is-invalid' );
        div.innerText="Solo puedes escribir letras";
        interruptor = false;
    }else{  
        input.value =  convUpper(txt);     
    }
    return interruptor;
}
//función valida formato texto
function txtVerify(txt:string){
    //solo letras
    let expresion = /^[a-zA-Z0]/;    
    return expresion.test(txt) ? true : false;
}
//funcion convierte mayusculas
let convUpper = (content:string):string => { return content = content.toUpperCase()}
//funcion para  diametro
function compDiameter (num:number, input:HTMLInputElement, div:HTMLElement, interruptor:boolean){         
    if(isNaN(num)) {       
        input.classList.add('is-invalid' );
        div.innerText="Este campo es obligatorio";
        interruptor = false;
    }else if (num > 2 || num < 0.4){ 
        input.classList.add( 'is-invalid' );
        div.innerText="El diámetro tiene que ser entre 0.4 y 2";
        interruptor = false;
    }else{  
        //dejamos solo 1 decimal
        num.toFixed(1);
        input.value = num.toString();
      
    }
    return interruptor;
}
//función sustituir la , por el .
let point = (aux:string):string => {return aux.replace(',', '.');}

/*MOSTRAR COCHES*/
function viewCar(){
    //guardamos el coche en un array
    carArray.push(car);  
    console.log(carArray);  
    //mostramos el coche
    featuresForm.classList.add('no-visible');
    viewCars.classList.remove('no-visible');
    viewCars.classList.add('visible');
    printCar(carArray);
}

function printCar(carArray:Car[]):void{ 
    //recorro array de coches
    carArray.forEach(function(cars){
        htmlString += 
                `<div class="col-12 col-md-6 col-lg-4 card text-white bg-primary mt-3" id="deleteCar">
                        <div class="card-header"><b<MARCA:</b> ${cars.brand}</div>
                            <div class="card-body">    
                                <p class="card-text"><b>Matricula:</b> ${cars.plate}</p>
                                <p class="card-text"><b>Color:</b> ${cars.color}</p>
                                <table class="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Marca</th>
                                        <th scope="col">Diámetro</th>
                                        </tr>
                                    </thead>
                                    <tbody>`
                                    cars.wheels.forEach(name =>                            
                                        htmlString += 
                                        `<tr>                              
                                            <td>${name.brand}</td>
                                            <td>${name.diameter}</td>
                                        </tr>`
                                    );
        htmlString += 
                                    `</tbody>
                                </table>                      
                            </div>                    
                    </div> `           
    });
            
    viewCars.innerHTML  = `${htmlString}
            <div class="row">
                <div class="col-12">            
                    <button type="button" class="btn btn-primary mt-2" onclick="start();">Añadir coche</button>
                </div>                    
            </div> `;
    

}
function start(){
    carForm.classList.remove('no-visible');
    carForm.classList.add('visible');
    InputCarArray.forEach(input =>  input.value="" );

    featuresForm.classList.add('no-visible');
    InputFeaturesArray.forEach(input =>  input.value="" );

    viewCars.classList.add('no-visible');
    htmlString = "";

}
   /* 


(document.getElementById('carForm') as HTMLFormElement).reset();
e.preventDefault();
}



 */

