window.onload = function(){
    document.getElementById("digitosCronometro").innerHTML = "00:00:00.000";
    document.getElementById("play").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = true;
    document.getElementById("vueltas").disabled = true;
}

var divLista;
var listaVueltas;
var numeroVueltas = 1;
var controlTiempo = 0;
var inicioCronometro = 0;
var tiempoActual;
var tiempoInicial;
var milisegundosTotal = 0;
var milisegundos = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var horasAuxiliar, minutosAuxiliar, segundosAuxiliar, milisegundosAuxiliar;

var escribeTiempo = function(){
    tiempoActual = new Date();
    //Obtenemos los milisegundos que han transcurrido
    milisegundosTotal = tiempoActual - tiempoInicial;
    
    //EN FUNCIÓN DE LOS MILISEGUNDOS, OBTENEMOS OBJETO FECHA
    var fecha = new Date();
    fecha.setTime(milisegundosTotal);

    //A PARTIR DE LA FECHA OBTENDREMOS HORAS, MINUTOS, SEGUNDOS Y MILISEGUNDOS
    //Horas:
    horas = fecha.getHours()-1;

    //Minutos:
    minutos = fecha.getMinutes();

    //Segundos:
    segundos = fecha.getSeconds();

    //Milisegundos:
    milisegundos = fecha.getMilliseconds();

    if(milisegundos < 10) {
        milisegundosAuxiliar = "0" + milisegundos;
    } else {
        milisegundosAuxiliar = milisegundos;
    }
    if(segundos < 10)
    {
        segundosAuxiliar = "0" + segundos;
    }else{
        segundosAuxiliar = segundos;
    }
    if(minutos < 10)
    {
        minutosAuxiliar = "0" + minutos;
    }else{
        minutosAuxiliar = minutos;
    }
    if(horas < 10)
    {
        horasAuxiliar = "0" + horas;
    }else{
        horasAuxiliar = horas;
    }

    document.getElementById("digitosCronometro").innerHTML = horasAuxiliar + ":" + minutosAuxiliar + ":" + segundosAuxiliar + "." + milisegundosAuxiliar;
}

//FUNCIÓN PARA INICIAR EL CRONÓMETRO
var Cronometrar = function(){
    tiempoInicial = new Date();
    escribeTiempo();
    intervalos = setInterval(escribeTiempo,10);
    document.getElementById("play").disabled = true;
    divLista = document.getElementById("listaVueltas");
    listaVueltas = document.createElement("ol");
    listaVueltas.setAttribute("id", "registroVueltas");
    divLista.appendChild(listaVueltas);
    document.getElementById("stop").disabled = false;
    document.getElementById("reset").disabled = false;
    document.getElementById("vueltas").disabled = false;
}

//FUNCIÓN PARA PAUSAR EL CRONÓMETRO
var Parar = function(){
    clearInterval(intervalos);
    document.getElementById("play").disabled = false;   
}

//FUNCIÓN PARA REINICIAR EL CRONÓMETRO
var Reiniciar = function(){
    clearInterval(intervalos);
    document.getElementById("digitosCronometro").innerHTML = "00:00:00.000";
    horas = 0;
    minutos = 0;
    segundos = 0;
    milisegundos = 0;
    document.getElementById("play").disabled = false;
    listaVueltas = document.getElementById("registroVueltas");
    listaVueltas.parentNode.removeChild(listaVueltas);
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = true;
    document.getElementById("vueltas").disabled = true;
}

//FUNCIÓN PARA REGISTRAR VUELTAS
var Vuelta = function(){
    var padreVueltas = document.getElementById("registroVueltas");
    var tiempoVuelta = document.createElement("li");
    tiempoVuelta.setAttribute("id",`${numeroVueltas}`);
    tiempoVuelta.innerHTML = horasAuxiliar + ":" + minutosAuxiliar + ":" + segundosAuxiliar + "." + milisegundosAuxiliar;
    padreVueltas.appendChild(tiempoVuelta);
    numeroVueltas++;
}
