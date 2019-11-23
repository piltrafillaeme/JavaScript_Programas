window.onload = function(){
    document.getElementById("digitosCronometro").innerHTML = "00:00:00";
    document.getElementById("play").disabled = false;
}
var segundos = 0;
var minutos = 0;
var horas = 0;

var escribeTiempo = function(){
    var horasAuxiliar, minutosAuxiliar, segundosAuxiliar;
    segundos++;
    if(segundos > 59)
    {
        minutos++;
        segundos = 0;
    }
    if(minutos > 59)
    {
        horas++;
        minutos = 0;
    }
    if(horas > 24)
    {
        horas = 0;
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

    document.getElementById("digitosCronometro").innerHTML = horasAuxiliar + ":" + minutosAuxiliar + ":" + segundosAuxiliar;
}

var Cronometrar = function(){
    escribeTiempo();
    intervalos = setInterval(escribeTiempo,1000);
    document.getElementById("play").disabled = true;
}

var Parar = function(){
    clearInterval(intervalos);
    document.getElementById("play").disabled = false;
}

var Reiniciar = function(){
    clearInterval(intervalos);
    document.getElementById("digitosCronometro").innerHTML = "00:00:00";
    horas = 0;
    minutos = 0;
    segundos = 0;
    document.getElementById("play").disabled = false;
}