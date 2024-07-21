// Variable global para almacenar los números del ejercicio
var num1, num2; // Variables para almacenar los números del ejercicio

// Función para generar números aleatorios entre -10 y +10
function generarNumerosAleatorios() {
    num1 = Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);
    num2 = Math.floor(Math.random() * (10 - (-10) + 1)) + (-10);
}

// Función para crear un ejercicio aleatorio y mostrarlo en el index.html
function crearEjercicio() {
    generarNumerosAleatorios(); // Generar números aleatorios para el ejercicio

    // Contenido del ejercicio
    var ejercicioHTML = `
        <h2>Resuelve el siguiente ejercicio:</h2>
        <p class="fs-4">${num1} + ${num2}</p>
        <div class="btn-group my-3 d-flex justify-content-center">
            <button id="pista" class="btn btn-secondary mx-2">Dame una pista</button>
            <button id="evaluar" class="btn btn-primary mx-2">Evaluar</button>
            <button id="mostrar-solucion" class="btn btn-info mx-2">Mostrar solución</button>
        </div>
        <div class="mb-3">
            <label for="respuestas" class="form-label">Selecciona la respuesta correcta:</label>
            <div id="respuestas" class="d-flex justify-content-center">
                <div class="form-check form-check-inline">
                    <input type="radio" id="opcion1" name="respuesta" value="${num1 + num2 - 4}" class="form-check-input">
                    <label for="opcion1" class="form-check-label">${num1 + num2 - 4}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" id="opcion2" name="respuesta" value="${num1 + num2 - 2}" class="form-check-input">
                    <label for="opcion2" class="form-check-label">${num1 + num2 - 2}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" id="opcion3" name="respuesta" value="${num1 + num2}" class="form-check-input">
                    <label for="opcion3" class="form-check-label">${num1 + num2}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" id="opcion4" name="respuesta" value="${num1 + num2 + 2}" class="form-check-input">
                    <label for="opcion4" class="form-check-label">${num1 + num2 + 2}</label>
                </div>
                <div class="form-check form-check-inline">
                    <input type="radio" id="opcion5" name="respuesta" value="${num1 + num2 + 4}" class="form-check-input">
                    <label for="opcion5" class="form-check-label">${num1 + num2 + 4}</label>
                </div>
            </div>
        </div>
        <div id="pista-container"></div>
        <div id="resultado-container"></div>
    `;

    document.getElementById('contenido-ejercicio').innerHTML = ejercicioHTML;

    // Añadir manejadores de eventos a los nuevos elementos
    var pistaBtn = document.getElementById('pista');
    if (pistaBtn) {
        pistaBtn.addEventListener('click', mostrarPista);
    }

    var evaluarBtn = document.getElementById('evaluar');
    if (evaluarBtn) {
        evaluarBtn.addEventListener('click', function() {
            evaluarRespuesta();
        });
    }

    var mostrarSolucionBtn = document.getElementById('mostrar-solucion');
    if (mostrarSolucionBtn) {
        mostrarSolucionBtn.addEventListener('click', function() {
            mostrarSolucion();
        });
    }
}

// Función para mostrar una pista
function mostrarPista() {
    limpiarContenido();
    var pistaContainer = document.getElementById('pista-container');
    
    // Crear y añadir el mensaje de pista
    var pistaMensaje = document.createElement('p');
    pistaMensaje.textContent = 'Piensa en cómo se comportan los números positivos y negativos al sumarse.';
    pistaContainer.appendChild(pistaMensaje);

    // Crear y añadir el ejemplo resuelto paso a paso
    var ejemploResuelto = document.createElement('div');
    ejemploResuelto.innerHTML = `
        <p><strong>Ejemplo:</strong> Resolver ${num1} + ${num2}</p>
        <p>Paso 1: Identifica los signos de los números.</p>
        <p>Paso 2: Observa que ${num1} es negativo y ${num2} es positivo.</p>
        <p>Paso 3: Resta los números de mayor a menor sin signos: ${Math.abs(num1)} - ${Math.abs(num2)} = ${num1 - num2}</p>
        <p>Paso 4: El resultado toma el signo del número mayor (${Math.max(Math.abs(num1), Math.abs(num2))}), que es ${num1 > num2 ? num1 : num2}</p>
        <p><strong>Resultado:</strong> ${num1} + ${num2} = ${num1 + num2}</p>
    `;
    pistaContainer.appendChild(ejemploResuelto);
}

// Función para evaluar la respuesta
function evaluarRespuesta() {
    limpiarContenido();
    var respuestas = document.getElementsByName('respuesta');
    var respuestaSeleccionada = "";
    for (var i = 0; i < respuestas.length; i++) {
        if (respuestas[i].checked) {
            respuestaSeleccionada = respuestas[i].value;
            break;
        }
    }
    var resultadoContainer = document.getElementById('resultado-container');

    if (respuestaSeleccionada === "") {
        var mensaje = document.createElement('p');
        mensaje.textContent = 'Por favor, selecciona una respuesta.';
        mensaje.className = 'text-warning';
        resultadoContainer.appendChild(mensaje);
        return;
    }

    var esCorrecto = (respuestaSeleccionada === String(num1 + num2));

    var mensaje = document.createElement('div');
    mensaje.className = esCorrecto ? 'alert alert-success' : 'alert alert-danger';
    mensaje.innerHTML = esCorrecto 
        ? '<i class="bi bi-check-circle-fill"></i> ¡Correcto! <button class="btn btn-warning btn-sm" id="otro-ejercicio">Otro ejercicio</button>' 
        : '<i class="bi bi-x-circle-fill"></i> Incorrecto.';
    resultadoContainer.appendChild(mensaje);

    if (esCorrecto) {
        var otroEjercicioBtn = document.getElementById('otro-ejercicio');
        if (otroEjercicioBtn) {
            otroEjercicioBtn.addEventListener('click', function() {
                crearEjercicio(); // Cargar otro ejercicio similar
            });
        }
    }
}

// Función para mostrar la solución completa
function mostrarSolucion() {
    limpiarContenido();
    var resultadoContainer = document.getElementById('resultado-container');

    var solucion = document.createElement('div');
    solucion.innerHTML = `
        <p><strong>Solución completa:</strong> ${num1} + ${num2} = ${num1 + num2}</p>
        <p>Paso 1: Identifica los signos de los números.</p>
        <p>Paso 2: Observa que ${num1} es negativo y ${num2} es positivo.</p>
        <p>Paso 3: Resta los números de mayor a menor sin signos: ${Math.abs(num1)} - ${Math.abs(num2)} = ${num1 - num2}</p>
        <p>Paso 4: El resultado toma el signo del número mayor (${Math.max(Math.abs(num1), Math.abs(num2))}), que es ${num1 > num2 ? num1 : num2}</p>
        <p><strong>Resultado:</strong> ${num1} + ${num2} = ${num1 + num2}</p>
        <p><button class="btn btn-warning btn-sm" id="otro-ejercicio">Otro ejercicio</button></p>
    `;
    resultadoContainer.appendChild(solucion);

    var otroEjercicioBtn = document.getElementById('otro-ejercicio');
    if (otroEjercicioBtn) {
        otroEjercicioBtn.addEventListener('click', function() {
            crearEjercicio(); // Cargar otro ejercicio similar
        });
    }
}

// Función para limpiar contenido de pista y resultados
function limpiarContenido() {
    var pistaContainer = document.getElementById('pista-container');
    var resultadoContainer = document.getElementById('resultado-container');
    
    pistaContainer.innerHTML = '';
    resultadoContainer.innerHTML = '';
}

// Manejo de eventos en index.html
document.addEventListener('DOMContentLoaded', function() {
    var practicarBtn = document.getElementById('practicar');
    if (practicarBtn) {
        practicarBtn.addEventListener('click', function() {
            crearEjercicio(); // Cargar el contenido del ejercicio
        });
    }
    crearEjercicio(); // Crear un ejercicio aleatorio al cargar la página
});
