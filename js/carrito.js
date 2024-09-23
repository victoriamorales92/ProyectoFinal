const abrirCarrito = document.querySelector("#abrir-carrito");
const carritoDesplegable = document.querySelector("#carrito-desplegable");
const cerrarCarrito = document.querySelector("#cerrar-carrito");

abrirCarrito.addEventListener('click', () => {
    carritoDesplegable.classList.add("activo"); // Mostrar carrito
});

cerrarCarrito.addEventListener('click', () => {
    carritoDesplegable.classList.remove("activo"); // Ocultar carrito
});
