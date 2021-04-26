let validator:boolean;
interface RoquetForm {
    rocket0:string;
    rocket1:string;
    select0:number;
    select1:number;
}
/*NO SE SI ESTO SE PUEDE OPTIMIZAR UTILIZANDO BUCLES?????Lo he intentado pero no encuentro la manera*/
//formulario
const roquetForm = document.querySelector("#roquetForm") as HTMLFormElement;

//los inputs como elemento html
const inputRocket0Id =   document.querySelector("#inputRocket0Id") as HTMLInputElement;
const inputRocket1Id =   document.querySelector("#inputRocket1Id") as HTMLInputElement;
//los select
const selectRocket0   =   document.querySelector("#selectRocket0") as HTMLSelectElement;
const selectRocket1   =   document.querySelector("#selectRocket1") as HTMLSelectElement;
//Array
const formElements: (HTMLInputElement | HTMLSelectElement)[] = [inputRocket0Id,inputRocket1Id, selectRocket0, selectRocket1]; 

//Los div de error
const invalidRocket0Id = document.querySelector("#invalidRocket0Id") as HTMLElement;
const invalidRocket1Id = document.querySelector("#invalidRocket1Id") as HTMLElement;
const inavalidRocket0select = document.querySelector("#inavalidRocket0select") as HTMLElement;
const inavalidRocket1select = document.querySelector("#inavalidRocket1select") as HTMLElement;

//elementos html
const game = document.querySelector("#game") as HTMLElement;
const info1 = document.querySelector("#info1") as HTMLElement;
const info2 = document.querySelector("#info2") as HTMLElement;
const finish0 = document.querySelector("#finish0") as HTMLElement;
const finish1 = document.querySelector("#finish1") as HTMLElement;
const myModal = document.querySelector("#myModal") as HTMLElement;
const showWinner = document.querySelector("#showWinner") as HTMLElement;


//cohetes html
const gameRocket0 = document.querySelector("#gameRocket0") as HTMLElement;
const gameRocket1 = document.querySelector("#gameRocket1") as HTMLElement;
let divRockets: HTMLElement[] = [gameRocket0,gameRocket1]; 

//btn
const btnPlay = document.querySelector("#btnPlay") as HTMLButtonElement;
const btnGame = document.querySelector("#btnGame") as HTMLButtonElement;
const btnAcelerate0 = document.querySelector("#btnAcelerate0") as HTMLButtonElement;
const btnBrake0 = document.querySelector("#btnBrake0") as HTMLButtonElement;
const btnAcelerate1 = document.querySelector("#btnAcelerate1") as HTMLButtonElement;
const btnBrake1 = document.querySelector("#btnBrake1") as HTMLButtonElement;


