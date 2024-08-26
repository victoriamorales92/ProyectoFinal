let resultadoPromedio;  // Variable para almacenar el promedio

// Función para calcular el promedio de calificaciones
function calcularPromedio() {
    let cantidadCalificaciones = parseInt(prompt("¿Cuántas calificaciones quieres ingresar?"));
    let sumaCalificaciones = 0;

    if (isNaN(cantidadCalificaciones) || cantidadCalificaciones <= 0) {
        alert("Por favor, ingresa un número válido para la cantidad de calificaciones.");
        return; 
    }

    for (let i = 1; i <= cantidadCalificaciones; i++) {
        let calificacion = parseFloat(prompt("Ingresa la calificación " + i + ":"));
        while (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            alert("Solo puedes ingresar números entre 0 y 10. Inténtalo de nuevo.");
            calificacion = parseFloat(prompt("Ingresa la calificación " + i + ":"));
        }
        sumaCalificaciones += calificacion;
    }

    // Calcular el promedio
    let promedio = sumaCalificaciones / cantidadCalificaciones;
    resultadoPromedio = Math.round(promedio * 10) / 10; 
//Resultado promedio
    if (resultadoPromedio >= 9) {
        alert("¡Excelente! Aprobaste con un promedio sobresaliente de: " + resultadoPromedio.toFixed(2));
    } else if (resultadoPromedio >= 7 && resultadoPromedio < 9) {
        alert("Aprobaste con un buen promedio de: " + resultadoPromedio.toFixed(2));
    } else if (resultadoPromedio >= 5 && resultadoPromedio < 7) {
        alert("No aprobaste, pero estuviste cerca. Tu promedio es: " + resultadoPromedio.toFixed(2));
    } else {
        alert("Reprobaste con un promedio de: " + resultadoPromedio.toFixed(2));
    }
}

// Llamar a la función para calcular el promedio
calcularPromedio();

//Acceder al resultado desde la consola
console.log("El promedio calculado es: " + resultadoPromedio);
