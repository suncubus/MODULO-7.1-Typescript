//crear Rocket
let rocketGame:Rocket;
const rocketArray: Rocket[] = [];
let i:number;
let proppellerArray: number[] = [];
let maxPowerProppeller:number = 0;

//info
let infoDiv:HTMLElement;
let htmlString:string;

//CREAMOS COHETES
let createRocket = (rocket:string, select:number) :void => {  

    //asignar potencia propulsores de forma aleatoria y calcular máxima potencia    
    for(i=0;i<select;i++){
        let aux:number = round();        
        maxPowerProppeller += aux;
        proppellerArray.push(aux);//almacenamos en un array la potencia de los propulsores    
    }   

    //creamos cohete
    rocketGame = new Rocket(rocket, select, maxPowerProppeller); 
    //Añadimos al cohete, los propulsores y potencia

    proppellerArray.forEach(function (value) {
        rocketGame.addPropeller(new Propeller(value,0));
    });   

    //almacenamos el objeto rocket en un array
    rocketArray.push(rocketGame);
    //vaciamos array para el próximo objeto
    proppellerArray = [];     
}

//número aleatorio decenas (0-90)
let round = ():number => {
   let value = Math.floor((Math.random() * (90 - 0 + 1)) + 0);
   return value = Math.floor(value / 10) * 10; 
}

/*MOSTRAR INFO*/
let showInfo = ():void => {
    game.classList.remove('no-visible'); 

    let j:number = 1;       
    //mostrar info cohetes
    rocketArray.forEach(function(rockets){       
        showRocketInfo(eval('info'+j),rockets);
        while (j<rocketArray.length){j++;}        
    });       
}

let showRocketInfo = (infoDiv:HTMLElement,element:Rocket):void => {
    htmlString = `<p><b>R:</b> ${element.idRocket}</p><p><b>P:</b>`
    element.propellers.forEach(name =>                            
        htmlString += 
        ` ${name.numPower} `
    );                 
    htmlString += `</p><p><b>M P:</B> ${element.maxPower}</p>`;    
    infoDiv.innerHTML = htmlString;     
    htmlString = "";
}
