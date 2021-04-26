class Rocket{
    idRocket:string;
    numPropeller:number;
    propellers:Propeller[]=new Array();
    maxPower:number;
    currentMaxPower:number = 0;
    constructor(idRocket:string, numPropeller:number, maxPower:number){
        this.idRocket=idRocket;
        this.numPropeller=numPropeller;
        this.maxPower=maxPower;
    }
    
    addPropeller(propeller:Propeller):void{
        this.propellers.push(propeller);
    }
     
    acelerateRocket():boolean{
        let max = false;
        for (let i = 0; i <= this.propellers.length - 1; i++) {            
            if(this.propellers[i].currentPower >= 0 && this.propellers[i].currentPower <= this.propellers[i].numPower){ 
                if(this.currentMaxPower<this.maxPower) {
                    this.propellers[i].currentPower += 10;
                    this.currentMaxPower += this.propellers[i].currentPower;   
                }else{
                    this.currentMaxPower = this.maxPower;
                    max = true;
                }
            }           
        }
        return max;
    }
    
    brakeRocket():void{ 
        let max = true;      
        for (let i = 0; i <= this.propellers.length - 1; i++) {                  
            if(this.propellers[i].currentPower > 0){                      
                    this.propellers[i].currentPower -= 10;
                    this.currentMaxPower -= this.propellers[i].currentPower; 
                }                     
            }         
        }
        
    }


