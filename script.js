//Creacion del elemento general que tiene el contenido encriptado - desencriptado
var mensaje = document.createElement("p");
mensaje.id = "text-encripted";

//Reglas de encriptacion
var reglas = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

// Crear un objeto para almacenar las reglas de desencriptación
var reglasDesencriptacion = {};

// Invertir las reglas de encriptación para obtener las reglas de desencriptación
for (var key in reglas) {
    var valorEncriptado = reglas[key];
    reglasDesencriptacion[valorEncriptado] = key;
}

function agregarContenido(val){
    //true: Encriptacion
    //false: Desencriptacion
    let division1_4 = document.getElementById("contenido");
    division1_4.innerHTML = ''; // Limpiar contenido
    let textoOriginal = document.getElementById("text-user").value;
    let text = ""
    if (val) {
        text = encriptarTexto(textoOriginal);
    } else {
        text = desencriptarTexto(textoOriginal);
    }
    var contentDiv = document.createElement("div");
    contentDiv.style.width = "100%";
    contentDiv.style.height = "80%";
    contentDiv.classList.add("content");
    mensaje.textContent = text;
    contentDiv.appendChild(mensaje);
    //Botón de Copiado
    let boton = document.createElement("button");
    boton.textContent = "Copiar";
    boton.style.width = "100%";
    boton.style.borderRadius = "5px";
    boton.style.marginTop = "10px";
    boton.onclick = copiarAlPortapapeles;
    boton.classList.add("boton");
    //Agregando elementos a la división
    division1_4.appendChild(contentDiv);
    division1_4.appendChild(boton);

    division1_4.style.height = "100%";
}

// Ecriptación de Texto
function encriptarTexto(textoOriginal) {
    // Encriptado
    var textoEncriptado = "";
    for (var i = 0; i < textoOriginal.length; i++) {
        var caracter = textoOriginal[i];
        // Verificar si el caracter está en las reglas de encriptación
        if (caracter in reglas) {
            // Reemplazar el caracter por su valor encriptado
            textoEncriptado += reglas[caracter];
        } else {
            // Mantener el caracter original si no está en las reglas
            textoEncriptado += caracter;
        }
    }
    return textoEncriptado;
}

// Desencriptación de Texto
function desencriptarTexto(textoEncriptado) {
    var textoDesencriptado = textoEncriptado;
    for (var claveEncriptada in reglasDesencriptacion) {
        var valorOriginal = reglasDesencriptacion[claveEncriptada];
        var expresionRegular = new RegExp(claveEncriptada, 'g');
        textoDesencriptado = textoDesencriptado.replace(expresionRegular, valorOriginal);
    }
    
    return textoDesencriptado;
}


//Copiado de Portapapeles
function copiarAlPortapapeles() {
    // Obtener texto del text-encripted
    var textoEncriptado = document.getElementById("text-encripted").textContent;
    
    // Copiar el texto al portapapeles
    navigator.clipboard.writeText(textoEncriptado)
        .then(function() {
            console.log('Texto copiado con éxito:', textoEncriptado);
        })
        .catch(function(error) {
            console.error('Error:', error);
        });
}

