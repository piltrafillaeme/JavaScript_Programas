let abecedario = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var indiceCategoriaAleatoria;
var indicePalabraAleatoria;
let contadorFallos = 0;
let contador = 6;
let palabraOculta;
let letrasOcultas = [];
let letrasUsadas = [];
var pista;
var coleccionPalabras;
var numeroCategorias;
var arrayPalabrasCategoria = [];

//CREO FUNCIÓN QUE ME PERMITA ELIMINAR LOS ACENTOS
function eliminaTildes(texto) {
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
};

//PETICION AJAX
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == 4) {
    // console.log(typeof this.responseText);
    coleccionPalabras = JSON.parse(this.responseText);
    };  
};
    xhr.open("GET", "categorias.json", true);
    xhr.send();

//CUANDO SE CARGUE LA PÁGINA COMIENZA EL JUEGO
window.onload = function() {

    EmpiezaJuego(); 

};


//FUNCIÓN QUE ENGLOBA TODAS LAS FUNCIONES NECESARIAS PARA JUGAR
let EmpiezaJuego = () => {

    //EVENTO DE TECLADO
    //TIENE ASOCIADA LA FUNCIÓN QUE CONTROLA QUE LA TECLA QUE PULSE LA USUARIA ES CORRECTA O NO
    window.addEventListener("keyup", LetraPulsada);

    //MOSTRAMOS EN PÁRRAFO NÚMERO DE INTENTOS QUE TIENE
    document.getElementById("salidaResultado").innerHTML = `Tiene ${contador} intentos.`;

    //MOSTRAMOS LA PALABRA QUE HA DE ADIVINAR
    GeneraPalabraOculta();

    // MOSTRAMOS TECLADO
    MuestraAbecedario();
};


//FUNCIÓN QUE MUESTRA LA PALABRA QUE HA DE ADIVINAR
let GeneraPalabraOculta = (arrayPalabrasCategoria) => {

    //CATEGORIA ALEATORIA
    numeroCategorias = coleccionPalabras.length;
    // console.log("Número categorías: " + numeroCategorias);

    indiceCategoriaAleatoria = Math.floor(Math.random()*numeroCategorias);
    // console.log("Índice Categoria aleatorio: " + indiceCategoriaAleatoria); 

    pista = coleccionPalabras[indiceCategoriaAleatoria].categoria;
    // console.log("Nombre aleatorio categoria: " + pista);

    arrayPalabrasCategoria = coleccionPalabras[indiceCategoriaAleatoria].palabras;
    // console.log(arrayPalabrasCategoria);

    //ESCOGEMOS ALEATORIAMENTE LA PALABRA
    // console.log("Sin tocar: ");
    // console.log(arrayPalabrasCategoria);
    if(arrayPalabrasCategoria.length == 1) {
        palabraOculta = arrayPalabrasCategoria[0].toUpperCase();
    } else {
        indicePalabraAleatoria = parseInt(Math.floor(Math.random()*arrayPalabrasCategoria.length));
        palabraOculta = arrayPalabrasCategoria[indicePalabraAleatoria].toUpperCase();
    }

    palabraOculta = arrayPalabrasCategoria[indicePalabraAleatoria].toUpperCase();
    console.log("Palabra a adivinar: " + palabraOculta);

    //RETIRO LA PALABRA EN CUESTIÓN DEL ARRAY PARA QUE NO VUELVA A SALIR
    arrayPalabrasCategoria.splice(indicePalabraAleatoria,1);
    // console.log("Después de splice ");
    // console.log(arrayPalabrasCategoria);
    // console.log(arrayPalabrasCategoria.length);

    //MOSTRAMOS LA PALABRA CON GUIONES
    let longitudPalabraOculta = palabraOculta.length;
    for(let i = 0; i < longitudPalabraOculta; i++) {
        if(palabraOculta[i] == " ") {
            letrasOcultas[i] = " - ";    
        } else {
            letrasOcultas[i] = "_";
        }
        
    }

    document.getElementById("ocultas").innerHTML = letrasOcultas.join(" ");
};

//FUNCIÓN QUE MUESTRA LAS LETRAS DEL ABECEDARIO
let MuestraAbecedario = () => {
    let teclado = document.getElementById("keyboard");
    for(let i = 0; i < abecedario.length; i++)
    {
        teclado.innerHTML += `<button id="${abecedario[i]}" class="caracter badge badge-pill badge-info" onclick="LetraRaton(this);">${abecedario[i]}</button>`;
    }
};

//ESTA FUNCIÓN COMPROBARÁ QUE LA LETRA Q PULSE POR TECLADO ES CORRECTA O NO
let LetraPulsada = (teclaPulsada) => {
    // console.log(palabraOculta);
    let letra = teclaPulsada.key;

    //CONTROLAMOS QUE NO PULSE NINGÚN DÍGITO O SÍMBOLO
    let soloLetras = /^[A-ZÑa-zñ]$/;
    if(!soloLetras.test(letra)) {
        // alert("¡Hey! Solo letras, ¡por favor!");
        document.getElementById("soloLetras").style.display = "block";
        document.getElementById("soloLetras").innerHTML = `<strong>¡Hey!</strong> Solo letras, ¡por favor!`;

    } else {
        document.getElementById("soloLetras").style.display = "none";
        letra = letra.toUpperCase();
        // console.log(letra);

    //VOY GUARDANDO LAS LETRAS QUE PULSA LA USUARIA, MOSTRANDO POR PANTALLA
    //Y CONTROLO QUE SI PULSA LA MISMA LETRA, AVISE A LA USUARIA
    if(letrasUsadas.indexOf(letra) == -1) {
        
        //NO HA PULSADO ESA LETRA, GUARDO EN EL ARRAY
        letrasUsadas.push(letra);

        //TACHO LAS LETRAS DEL KEYBOARD
        document.getElementById(letra).style.textDecoration = "line-through";
        
        // console.log("Letras usadas" + letrasUsadas);

        //deshabilito el botón que ha pulsado independientemente de si es un acierto o no
        let indiceNumBoton = abecedario.indexOf(letra);
        let indiceLetraBoton = abecedario[indiceNumBoton];
        document.getElementById(indiceLetraBoton).disabled = true;
        
        //VOY MOSTRANDO LAS LETRAS QUE YA HA USADO LA USUARIA
        document.getElementById("usadas").innerHTML = "Letras usadas: " + letrasUsadas;
        
        //CHEQUEO QUE LA LETRA ESTÉ PRESENTE EN LA PALABRA ACTUAL CON LA QUE JUEGA
        let longitudPalabraOculta = palabraOculta.length;
    
        //QUITO LOS ACENTOS PARA CHEQUEAR CORRECTAMENTE
        var palabraOcultaSinAcentos = eliminaTildes(palabraOculta);

        if(palabraOcultaSinAcentos.indexOf(letra) != -1) {
            //LA LETRA ESTÁ PRESENTE
            //SUSTITUYO EL GUIÓN POR LA LETRA EN CUESTIÓN EN TODAS LAS POSICIONES EN LAS QUE APAREZCA
            for(let i = 0; i < longitudPalabraOculta; i++) {
                if(palabraOcultaSinAcentos[i] == letra) {
                    letrasOcultas[i] = palabraOculta[i];
                    document.getElementById(indiceLetraBoton).style.background = "green";
                    document.getElementById(indiceLetraBoton).style.border = "2px solid green";
                }
            }
            //VUELVO A MOSTRAR LA PALABRA OCULTA CON LA(S) LETRA(S) ACERTADAS
            document.getElementById("ocultas").innerHTML = letrasOcultas.join(" ");
            document.getElementById("error").style.display = "none";
        } else {
            //LA LETRA NO ESTÁ PRESENTE
            //CONTABILIZO UN FALLO
            contador--;

            //LLEVO UN CONTADOR QUE ME PERMITIRÁ CONTROLAR LAS IMÁGENES A MOSTRAR SEGÚN LOS FALLOS
            let imagen = document.getElementById("imagen");
            imagen.setAttribute("src",`img/${contadorFallos}.png`);
            document.getElementById(indiceLetraBoton).style.background = "#8E0E00";
            document.getElementById(indiceLetraBoton).style.border = "2px solid #8E0E00";
            
            contadorFallos++;

            //AVISAMOS DE CUÁNTOS INTENTOS LE QUEDA A LA USUARIA
            if(contador == 1)
            {
                document.getElementById("nombrePista").innerHTML = `Pista: ${pista}`;
                document.getElementById("salidaResultado").innerHTML = `¡Solo le queda ${contador} intento!`;
                document.getElementById("salidaResultado").style.color = "red";
            } else {
                if(contador < 4) {
                    document.getElementById("nombrePista").innerHTML = `Pista: ${pista}`;
                    document.getElementById("salidaResultado").innerHTML = `Le quedan ${contador} intentos.<br>
                                                                            ¡Se está poniendo fea la cosa!`;
                    document.getElementById("salidaResultado").style.color = "orange";
                } else {
                    document.getElementById("salidaResultado").innerHTML = `Tiene ${contador} intentos.`;
                } 
            }
            document.getElementById("error").style.display = "none";
        }
    } else {
        //MENSAJE A LA USUARIA DE QUE YA HA PULSADO ESA TECLA
        // alert(`Ya has pulsado la letra ${letra}`);
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = `<strong>¡Hey!</strong> Esa letra ya la has usado (${letra}).`;
    }
    
    ControlaJuego();

    }
}

//ESTA FUNCIÓN COMPROBARÁ QUE LA LETRA Q PULSE POR TECLADO ES CORRECTA O NO
let LetraRaton = (boton) => {
    
    // console.log(palabraOculta);
    let letra = boton.innerHTML;
    letra = letra.toUpperCase();
    // console.log(letra);


    //VOY GUARDANDO LAS LETRAS QUE PULSA LA USUARIA, MOSTRANDO POR PANTALLA
    //Y CONTROLO QUE SI PULSA LA MISMA LETRA, AVISE A LA USUARIA
    if(letrasUsadas.indexOf(letra) == -1) {
        
        //NO HA PULSADO ESA LETRA, GUARDO EN EL ARRAY
        letrasUsadas.push(letra);

        //TACHO LAS LETRAS DEL KEYBOARD
        document.getElementById(letra).style.textDecoration = "line-through";
        
        // console.log("Letras usadas" + letrasUsadas);
        
        //deshabilito el botón que ha pulsado independientemente de si es un acierto o no
        boton.disabled = true;

        //VOY MOSTRANDO LAS LETRAS QUE YA HA USADO LA USUARIA
        document.getElementById("usadas").innerHTML = "Letras usadas: " + letrasUsadas;
        
        //CHEQUEO QUE LA LETRA ESTÉ PRESENTE EN LA PALABRA ACTUAL CON LA QUE JUEGA
        let longitudPalabraOculta = palabraOculta.length;

        //QUITO LOS ACENTOS PARA CHEQUEAR CORRECTAMENTE
        var palabraOcultaSinAcentos = eliminaTildes(palabraOculta);

        if(palabraOcultaSinAcentos.indexOf(letra) != -1) {
            //LA LETRA ESTÁ PRESENTE
            //SUSTITUYO EL GUIÓN POR LA LETRA EN CUESTIÓN EN TODAS LAS POSICIONES EN LAS QUE APAREZCA
            for(let i = 0; i < longitudPalabraOculta; i++) {
                if(palabraOcultaSinAcentos[i] == letra) {
                    letrasOcultas[i] = palabraOculta[i];
                    boton.style.background = "green";
                    boton.style.border = "2px solid green";
                    // console.log(boton);
                }
            }
            //VUELVO A MOSTRAR LA PALABRA OCULTA CON LA(S) LETRA(S) ACERTADAS
            document.getElementById("ocultas").innerHTML = letrasOcultas.join(" ");

            //QUITO MENSJE DE ERROR SI PREVIAMENTE LE HA SALIDO AL PULSAR DOS VECES LA MISMA LETRA
            document.getElementById("error").style.display = "none";
            document.getElementById("soloLetras").style.display = "none";
        } else {
            //LA LETRA NO ESTÁ PRESENTE
            //CONTABILIZO UN FALLO
            contador--;

            //LLEVO UN CONTADOR QUE ME PERMITIRÁ CONTROLAR LAS IMÁGENES A MOSTRAR SEGÚN LOS FALLOS
            let imagen = document.getElementById("imagen");
            imagen.setAttribute("src",`img/${contadorFallos}.png`);
            boton.style.background = "#8E0E00";
            boton.style.border = "2px solid #8E0E00";
            contadorFallos++;

            //AVISAMOS DE CUÁNTOS INTENTOS LE QUEDA A LA USUARIA
            if(contador == 1)
            {
                document.getElementById("nombrePista").innerHTML = `Pista: ${pista}`;
                document.getElementById("salidaResultado").innerHTML = `¡Solo le queda ${contador} intento!`;
                document.getElementById("salidaResultado").style.color = "red";
            } else {
                if(contador < 4) {
                    document.getElementById("nombrePista").innerHTML = `Pista: ${pista}`;
                    document.getElementById("salidaResultado").innerHTML = `Le quedan ${contador} intentos.<br>
                                                                            ¡Se está poniendo fea la cosa!`;
                    document.getElementById("salidaResultado").style.color = "orange";
                } else {
                    document.getElementById("salidaResultado").innerHTML = `Tiene ${contador} intentos.`;
                } 
            }

            //QUITO MENSJE DE ERROR SI PREVIAMENTE LE HA SALIDO AL PULSAR DOS VECES LA MISMA LETRA
            document.getElementById("error").style.display = "none";
        }
    } else {
        //MENSAJE A LA USUARIA DE QUE YA HA PULSADO ESA TECLA --> NO NECESARIO PORQUE DESHABILITO EL BOTÓN UNA VEZ LO PULSE
        // alert(`Ya has pulsado la letra ${letra}`);
    }
    
    ControlaJuego();
}

//FUNCIÓN QUE COMPRUEBA SI LA PALABRA ES CORRECTA O SI HA AGOTADO LOS 6 INTENTOS
let ControlaJuego = () => {
    let arrayBotones = document.getElementsByClassName("caracter");
    if(letrasOcultas.indexOf("_") == -1) {
        let imagen = document.getElementById("imagen");
        imagen.setAttribute("src","img/victoria.gif");
        document.getElementById("salidaResultado").innerHTML = `¡BRAVÍIIIISIMO, HAS GANADO!`;
        document.getElementById("salidaResultado").style.color = "green";
        document.getElementById("salidaResultado").style.fontWeight = "bold";
        document.getElementById("ocultas").style.color = "green";
        document.getElementById("salidaResultado").style.letterSpacing = "2px";
        
        //DESHABILITO QUE LA USUARIA PUEDA SEGUIR PULSANDO TECLAS
        window.removeEventListener("keyup", LetraPulsada);

        //DESHABILITO TODOS LOS BOTONES
        for(let i = 0; i < arrayBotones.length; i++) {
            arrayBotones[i].disabled = true;
        }
    } else {
        if(contador == 0) {
            document.getElementById("salidaResultado").innerHTML = `¡HAS MATADO AL ADORABLE MUÑEQUITO!`;
            document.getElementById("salidaResultado").style.color = "red";
            document.getElementById("salidaResultado").style.fontWeight = "bold";
            document.getElementById("salidaResultado").style.letterSpacing = "2px";
            // console.log(letrasOcultas);
            for(let i = 0; i < letrasOcultas.length; i++) {
                if(letrasOcultas[i] == "_") {
                    letrasOcultas[i] = palabraOculta[i];
                }
            }
            
            document.getElementById("ocultas").innerHTML = letrasOcultas.join(" ");

            //DESHABILITO QUE LA USUARIA PUEDA SEGUIR PULSANDO TECLAS
            window.removeEventListener("keyup", LetraPulsada);
            
            //DOY ESTILO A LAS ERRÓNEAS
            document.getElementById("ocultas").style.color = "red";
            
            //DESHABILITO TODOS LOS BOTONES
            for(let i = 0; i < arrayBotones.length; i++) {
                arrayBotones[i].disabled = true;
            }
        } 
    }

};

//FUNCIÓN QUE GENERA UNA NUEVA PALABRA
let OtraPalabra = () => {
    contadorFallos = 0;
    contador = 6;
    palabraOculta;
    letrasOcultas = [];
    letrasUsadas = [];
    document.getElementById("nombrePista").innerHTML = "";
    document.getElementById("salidaResultado").style.color = "black";
    let salidaLetrasUsadas = document.getElementById("usadas");
    salidaLetrasUsadas.innerHTML = "Letras usadas: ";
    let teclado = document.getElementById("keyboard");
    teclado.innerHTML = "";
    let imagen = document.getElementById("imagen");
    imagen.setAttribute("src","img/00.png");
    document.getElementById("ocultas").style.color = "black";

    EmpiezaJuego();
};
