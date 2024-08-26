// Simulador de promedios
alert("¡Vamos a calcular tu promedio de calificaciones!");

let cantidadCalificaciones = parseInt(prompt("¿Cuántas calificaciones quieres ingresar?"));
let sumaCalificaciones = 0;


if (isNaN(cantidadCalificaciones) || cantidadCalificaciones <= 0) {
    alert("Por favor, ingresa un número válido para la cantidad de calificaciones.");
} else {
    for (let i = 1; i <= cantidadCalificaciones; i++) {
        let calificacion = parseFloat(prompt("Ingresa la calificación " + i + ":"));
        
        // Validación de la calificación
        while (isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
            alert("Solo puedes ingresar números entre 0 y 10. Inténtalo de nuevo.");
            calificacion = parseFloat(prompt("Ingresa la calificación " + i + ":"));
        }

        sumaCalificaciones += calificacion;
    }

    // Calcular el promedio
    let promedio = sumaCalificaciones / cantidadCalificaciones;
    promedio = Math.round(promedio * 10) / 10;  

    if (promedio >= 9) {
        alert("¡Excelente! Aprobaste con un promedio sobresaliente de: " + promedio.toFixed(2));
    } else if (promedio >= 7 && promedio < 9) {
        alert("Aprobaste con un buen promedio de: " + promedio.toFixed(2));
    } else if (promedio >= 5 && promedio < 7) {
        alert("No aprobaste, pero estuviste cerca. Tu promedio es: " + promedio.toFixed(2));
    } else {
        alert("Reprobaste con un promedio de: " + promedio.toFixed(2));
    }
}
