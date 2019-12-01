var cuentaLetras = 0;
var numerosIntentos = 0;
var puntos = 0;


var Corregir = function() {
  var aciertos = 0;
  var fallos = 0;
  puntos = 0;
  var controlaPuntosCheckbox = 0;
  numerosIntentos++;
  

  //COMPROBAMOS PRIMERA PREGUNTA
  var preguntaRadioButtons = document.getElementsByName("radio");
  console.log(preguntaRadioButtons);

  for (var i = 0; i < preguntaRadioButtons.length; i++) {
    console.log(preguntaRadioButtons[i].checked);
    if (preguntaRadioButtons[i].checked) {
      if (preguntaRadioButtons[i].value == 1) {
        aciertos++;
        puntos = puntos + 2.5;
      } else {
        fallos++;
      }
    }
  }
console.log(puntos);
  console.log("Aciertos:" + aciertos);
  console.log("Fallos:" + fallos);

  //COMPROBAMOS SEGUNDA PREGUNTA
  var preguntaCheckbox = document.getElementsByName("checkbox");
  console.log(preguntaCheckbox);
  for (var i = 0; i < preguntaCheckbox.length; i++) {
    console.log(preguntaCheckbox[i].checked);
    if (preguntaCheckbox[i].checked) {
      if (preguntaCheckbox[i].value == 1) {
        aciertos++;
        puntos = puntos + 0.83;
        controlaPuntosCheckbox++;
        //Para que si, ha acertado todas las preguntas del test, salga 10 en vez de 9.99
        if(controlaPuntosCheckbox == 3) {
            puntos = Math.ceil(puntos);
        }
      } else {
        fallos++;
        puntos = puntos - 0.625;
      }
    }
  }

 
  console.log(puntos);
  console.log("Aciertos:" + aciertos);
  console.log("Fallos:" + fallos);

  //COMPROBAMOS TERCERA PREGUNTA
  var preguntaSelect = document.getElementById("select").options;
  console.log(preguntaSelect);
  for (var i = 0; i < preguntaSelect.length; i++) {
    console.log(preguntaSelect[i].selected);
    if (preguntaSelect[i].selected) {
      if (preguntaSelect[i].value == 1) {
        aciertos++;
        puntos = puntos + 2.5;
      } else {
        if (preguntaSelect[i].value == 0) {
          fallos++;   
        }
      }
    }
  }
  console.log(puntos);
  console.log("Aciertos:" + aciertos);
  console.log("Fallos:" + fallos);

  //COMPROBAMOS CUARTA PREGUNTA
  var preguntaTexto = document.getElementById("campoTexto").value;
  console.log(preguntaTexto);
  preguntaTexto = preguntaTexto.toLowerCase().trim();
  console.log(preguntaTexto);
  if (preguntaTexto === "sí" || preguntaTexto === "si" || preguntaTexto === "") {
    fallos++;
  } else {
      if(preguntaTexto === "no")
      {
          aciertos++;
          puntos = puntos + 2.5;
      }
  }
  console.log(puntos);
  console.log("Aciertos:" + aciertos);
  console.log("Fallos:" + fallos);

  
  //Después del primer intento, en el botón submit pondrá REINTENTAR
  if (numerosIntentos >= 1) {
    document.getElementById("corrige").innerHTML = "Reintentar";
  }

  //EL BOTÓN SE DESHABILITA CUANDO CONSIGA EL 100% DE ACIERTOS
  if(aciertos == 6)
  {
      document.getElementById("corrige").innerHTML = "Corregir";
      document.getElementById("corrige").disabled = true;
      document.getElementById("salida").style.display =  "inline";
  }

  //CONTROL DEL NÚMERO DE INTENTOS QUE LLEVA LA USUARIA
  if(numerosIntentos == 1)
  {
    //   document.getElementById("intentos").innerHTML = `Llevas ${numerosIntentos} intento.`;
      document.getElementById("salida").style.display =  "inline";
      document.getElementById("numeroIntentos").innerHTML = `Número de intentos: ${numerosIntentos}`;
      document.getElementById("notaFinal").innerHTML = `Nota: ${puntos}`;
  } else {
    //   document.getElementById("intentos").innerHTML = `Llevas ${numerosIntentos} intentos.`;
      document.getElementById("salida").style.display =  "inline";
      document.getElementById("numeroIntentos").innerHTML = `Número de intentos: ${numerosIntentos}`;
      document.getElementById("notaFinal").innerHTML = `Nota: ${puntos}`;
  }

};

var quitaTarjeta = function(){
    document.getElementById("salida").style.display =  "none";
}
