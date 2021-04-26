/*FUNCIONES DE VALIDACIONES DE LOS CAMPOS*/
function validateRockets(){
    //NO CONSIGO OPTIMIZAR EL CÓDIGO
    /*for (let i:number=1;i<3;i++){
        eval("rocket"+i) =  (<HTMLInputElement>document.getElementById("inputRocket"+i+"0Id")).value;
        "rocket"+i =  (<HTMLInputElement>document.getElementById("inputRocket+i+Id")).value;
        rocket+i =  (<HTMLInputElement>document.getElementById("inputRocket+i+Id")).value;
    }*/
    //valor de los inputs    
    const formInputsValue: RoquetForm = {
        rocket0: (<HTMLInputElement>document.getElementById("inputRocket0Id")).value,
        rocket1: (<HTMLInputElement>document.getElementById("inputRocket1Id")).value,
        select0: parseInt((<HTMLSelectElement>document.getElementById("selectRocket0")).value),
        select1: parseInt((<HTMLSelectElement>document.getElementById("selectRocket1")).value),
    }
    const { rocket0, rocket1, select0, select1 } = formInputsValue;    
    
    fInvalid(formElements);
    validator=true;
    
    for (let i:number=0;i<2;i++){
        validator = comId(eval("rocket"+i), eval("inputRocket"+i+"Id"), eval("invalidRocket"+i+"Id"), validator);    
        validator = comNumProp(eval("select"+i), eval("selectRocket"+i), eval("inavalidRocket"+i+"select"), validator); 
    }    
    if(validator){
        for (let i:number=0;i<2;i++){
            createRocket(eval("rocket"+i),eval("select"+i));
        }    
        roquetForm.classList.add('no-visible');        
        //mostramos la info del cohete
        showInfo();
    }
    return validator;   
}

//funcion para eliminar la clase invalid
let fInvalid = (content:(HTMLInputElement | HTMLSelectElement)[]):void => { 
    content.forEach(function (value) {
        value.classList.remove( 'is-invalid' );
      });   
}
//validar id de cohete
function comId(txt:string, input:HTMLInputElement ,invalid:HTMLElement, interruptor:boolean){
    if( txt == "" ) {
        interruptor = requiredForm(input,invalid,interruptor);
    }else if (!idVerify(txt)){
        input.classList.add('is-invalid' );
        invalid.innerText="Must be 8 characters";
        interruptor = false;
    }else{  
        input.value =  convUpper(txt);
    }
    return interruptor;
}
//validar select del número de propulsores
let comNumProp = (combo:number, input:HTMLSelectElement ,invalid:HTMLElement, interruptor:boolean):boolean => {
    if( isNaN(combo)) {
        interruptor = requiredForm(input,invalid,interruptor);
    }
    return interruptor;
}
//función que valida formato del id (8 caracteres)
let idVerify = (txt:string) => {
    let expresion = /^[0-9a-zA-Z]{8}$/;    
    return expresion.test(txt) ? true : false;
}
//funcion convierte mayusculas
let convUpper = (content:string):string => { return content = content.toUpperCase()}

//mostrar requerido
let requiredForm = (input:HTMLInputElement|HTMLSelectElement, invalid:HTMLElement, interruptor:boolean):boolean => { 
    input.classList.add('is-invalid' );
    invalid.innerText="This field is required";
    return interruptor = false;
}