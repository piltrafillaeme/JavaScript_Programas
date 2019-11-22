let numeroAleatorio = Math.floor(Math.random() * 101)+1;
console.log(numeroAleatorio);
let limiteInferior = 1;
let limiteSuperior = 100;
let contador = 0;

window.onload = function() {
    let botonera = document.getElementById("botonera");
    let contador = 0;
    for(let i = 1; i <= 100; i++) {
        
        let boton = document.createElement("button");
        boton.setAttribute("class", "btn btn-circle btn-xl");
        boton.setAttribute("onclick", "Comprueba(this)");
        
        boton.innerHTML = i;
        botonera.appendChild(boton);
    }
}
let Comprueba = function(numero)
{
    let descartaBotones = document.getElementsByTagName("button");
    let iconoDescarta = document.createElement("i");
    iconoDescarta.setAttribute("class","fa fa-times");
    let numeroUsuaria = numero.innerHTML;
    numeroUsuaria = parseInt(numeroUsuaria);
        
    console.log(numeroUsuaria);
    if(numeroUsuaria == numeroAleatorio)
    {
        contador++;
        // salidaResultado.innerHTML = "¡Has acertado! Has necesitado " + contador + " intentos.";
        numero.style.backgroundColor = "#a8e063";
        for(let i = 0; i < descartaBotones.length; i++)
        {
            descartaBotones[i].disabled = true;
        }

    document.getElementById("cuadroMensaje").style.display = "block";
    if(contador == 1)
    {
        document.getElementById("salidaFinal").innerHTML = `Has necesitado ${contador} intento.`;
    } else {
        document.getElementById("salidaFinal").innerHTML = `Has necesitado ${contador} intentos.`;
    }
    document.getElementById("volverJugar").disabled = false;
    contador = 0;
    }
    else{
        if(numeroUsuaria < numeroAleatorio)
        {
            contador++;
            limiteInferior = numeroUsuaria + 1;
            console.log("este es el límite inferior" + limiteInferior);
            // salidaResultado.innerHTML = "Su número está entre " + limiteInferior + " y " + limiteSuperior;
            for(let i = 0; i < limiteInferior-1; i++)
            {
                descartaBotones[i].style.backgroundColor = "orange";
                descartaBotones[i].innerHTML = `<i class="fa fa-times" style="background-color:orange"></i>`;
                descartaBotones[i].style.color = "#2E2B2B";
                descartaBotones[i].disabled = true;
            }
        }
        else {
            contador++;
            limiteSuperior = numeroUsuaria - 1;
            // salidaResultado.innerHTML = "Su número está entre " + limiteInferior + " y " + limiteSuperior;
            for(let i = limiteSuperior; i < 100; i++)
            {
                descartaBotones[i].style.backgroundColor = "orange";
                descartaBotones[i].innerHTML = `<i class="fa fa-times" style="background-color:orange"></i>`;
                descartaBotones[i].style.color = "#2E2B2B";
                descartaBotones[i].disabled = true;
            }
        }
    }
}

let Jugar = function(){
    numeroAleatorio = Math.floor(Math.random() * 101);
    console.log(numeroAleatorio);
    document.getElementById("cuadroMensaje").style.display = "none";
    let botonera = document.getElementById("botonera");
    botonera.innerHTML = "";
    
    for(let i = 1; i <= 100; i++) {
        let boton = document.createElement("button");
        boton.setAttribute("class", "btn btn-circle btn-xl");
        boton.setAttribute("onclick", "Comprueba(this)");
        
        boton.innerHTML = i;
        botonera.appendChild(boton);

    }
}

var ContadorSalida = function(contador)
{
    if(contador < 8)
    {
        var salida = document.createElement("h3");
    }
}