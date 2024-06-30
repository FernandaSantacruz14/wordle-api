const API ="https://random-word-api.herokuapp.com/word?length=5"
let diccionario = ['ARBOL', 'ABEJA', 'PERRO', 'TRIGO',"LIBRO"]
let random = Math.random()*diccionario.length
random = Math.floor(random)
let palabraSecreta = diccionario[random]

fetch(API)
.then((response)=>{
    response.json()
    .then((data)=>{
        palabraSecreta = data[0].toUpperCase();
        console.log(palabraSecreta)
    })})
    
let oportunidades = 6

let BOTON = document.getElementById("guess-button");
BOTON.addEventListener("click", intentar);
const input = document.getElementById("guess-input");
const valor = input.value;

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento; 
}

function intentar(){
    let INTENTO = leerIntento();
    if(INTENTO.length===5){
        if (INTENTO === palabraSecreta ) {
            terminar(`
                <div class="mensaje">
                    <h1 id='ganaste'>GANASTE </h1>
                    <img src="./bien.png" alt="bien" class="imagen-sistema"/>
                </div>
                `);
            return;
        }
        if (oportunidades==0){
            terminar(`
                <div class="mensaje">
                    <h1 id='perdiste'>PERDISTE </h1>
                    <img src="./mal.png" alt="mal" class="imagen-sistema"/>
                </div>
                `)
            return
        }
        console.log(INTENTO);
        const GRID = document.getElementById("grid");
        const ROW = document.createElement('div');
        ROW.className = 'row';
        for (let i in palabraSecreta){
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i]===palabraSecreta[i]){ //VERDE
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'green';
            } else if( palabraSecreta.includes(INTENTO[i]) ) { //AMARILLO
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'yellow';
            } else {      //GRIS
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = 'grey';
            }
            ROW.appendChild(SPAN)
        }
        GRID.appendChild(ROW)
        oportunidades--;
    }else{
        alert("Debe de contener 5 letras")
    }

}
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

//sector de información del juego
let info = document.getElementById("informacion");
info.addEventListener("click", function(){
    alert("Trata de adivinar la palabra secreta, tienes 6 oportunidades.");
});
