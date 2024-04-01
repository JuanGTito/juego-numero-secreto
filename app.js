let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = []
let numeroMaximo = 10;
let vidas = 0;

function asignarTextoElemento(element, texto){
    let elementoHTML = document.querySelector(element);
    elementoHTML.innerHTML = texto;
    return;
};

function intentoDeUsuario(){
    let numeroDeUsuario = parseInt(document.getElementById('numeroUsuario').value);
    
    //console.log(intentos);

    for (let index = 0; index < 11; index++) {
        while (numeroDeUsuario === index) {
            vidas--;
            if (vidas === 0 & numeroDeUsuario != numeroSecreto){
                vidasInt();
                asignarTextoElemento('p', `¡Perdiste!`);
                document.querySelector('#intentar').setAttribute('disabled', 'true');
                document.getElementById('reiniciar').removeAttribute('disabled');
                
            }else{
                if(numeroDeUsuario === numeroSecreto){
                    asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'} `);
                    document.getElementById('reiniciar').removeAttribute('disabled');
                    vidasInt();
                    //El usuario no acerto
                }else{
                    if(numeroDeUsuario > numeroSecreto){
                        asignarTextoElemento('p', 'El numero secreto es menor');
                        vidasInt();
        
                    }else{
                        asignarTextoElemento('p', 'El numero secreto es mayor');
                        vidasInt();
                    }
                    intentos++;
                    limpiar();
                }
            } 
            return;  
        }
    } 
    alert("INGRESE EL NUMERO SECRETO")   
};

function limpiar(){
    document.querySelector('#numeroUsuario').value = '';    
};

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteados);

    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
        }
        return numeroGenerado
    }
};

function condicionesIniciales(){
    asignarTextoElemento('h1', "Juego del numero Secreto");
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMaximo}`);
    document.querySelector('#intentar').removeAttribute('disabled');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    vidas = 3;
    vidasInt();    
};

function reiniciarJuego(){
    limpiar();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true')
};

function vidasInt(){
    asignarTextoElemento('h2', `Tienes ${vidas} ${(vidas === 1) ? 'intento' : 'intentos'} `);
};

condicionesIniciales();