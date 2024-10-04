let productos = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch("./js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(); // 
        });

    actualizarContadorCarrito();
    mostrarProductosEnCarrito(); 
});

// DOM
const catalogoProductos = document.querySelector("#catalogo-productos");
const todos = document.querySelector("#todos");
const fragancias = document.querySelector("#fragancias");
const protectores = document.querySelector("#protectores");
const serums = document.querySelector("#serums");
const totalCarrito = document.querySelector("#total");
const carritoProductos = document.querySelector("#carrito-productos");
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.querySelector('.numero');
    const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    contadorCarrito.textContent = totalItems;
}

// Función para agregar productos al carrito o incrementar la cantidad si ya existe
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarProductosEnCarrito();


    // Toastify

    Toastify({
        text: "¡Genial! Tu producto ya está en el carrito 🛒",
        duration: 1000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "#28a745",
        stopOnFocus: true,
        className: "toastify-custom" // Clase personalizada
    }).showToast();
}

// Función para decrementar la cantidad de productos en el carrito

function decrementarCantidad(idProducto) {
    const productoEnCarrito = carrito.find(p => p.id === idProducto);

    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
    } else {
        carrito = carrito.filter(p => p.id !== idProducto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarProductosEnCarrito();
}

// Función para mostrar productos filtrados por categoría

function mostrarProductos(categoriaId = "") {
    catalogoProductos.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

    const productosFiltrados = categoriaId
        ? productos.filter(producto => producto.categoria.id === categoriaId)
        : productos;

    // Agregar productos al DOM

    productosFiltrados.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("card-inicio");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div class="card-content">
            <h2>${producto.titulo}</h2>
            <p>$${producto.precio}</p>
            <button class="btn-agregar" id="${producto.id}">Agregar al carrito</button>
        </div>
        `;

        catalogoProductos.append(div);
    });

    // Añadir evento a cada botón de agregar al carrito

    document.querySelectorAll('.btn-agregar').forEach(button => {
        button.addEventListener('click', function () {
            agregarAlCarrito(this.id);
        });
    });
}
// Función para mostrar productos en el carrito y calcular total

function mostrarProductosEnCarrito() {
    carritoProductos.innerHTML = "";

    if (carrito.length === 0) {
        carritoProductos.innerHTML = "<p>Tu carrito está vacío</p>";
    } else {
        carrito.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");

            div.innerHTML = `
                <p>${producto.titulo}</p>
                <p>$${producto.precio}</p>
                <div class="cantidad">
                    <p>Cantidad: ${producto.cantidad}</p>
                    <div class="cantidad-buttons">
                        <button class="btn-decrementar" data-id="${producto.id}">-</button>
                        <button class="btn-incrementar" data-id="${producto.id}">+</button>
                    </div>
                </div>
                <p>Total: $${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</p>
            `;
            carritoProductos.appendChild(div);
        });

        // botón incrementar

        document.querySelectorAll('.btn-incrementar').forEach(button => {
            button.addEventListener('click', function () {
                const idProducto = this.getAttribute('data-id');
                agregarAlCarrito(idProducto);
            });
        });

        // botón decremntar

        document.querySelectorAll('.btn-decrementar').forEach(button => {
            button.addEventListener('click', function () {
                const idProducto = this.getAttribute('data-id');
                decrementarCantidad(idProducto);
            });
        });
    }

    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    totalCarrito.textContent = total.toLocaleString('es-AR');

    // botones seguir comprando y vaciar carrito

    agregarBotonesCarrito();
}


// Función para vaciar el carrito

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    actualizarContadorCarrito();
}

// Función para agregar botones de seguir comprando y vaciar carrito

function agregarBotonesCarrito() {
    const botonSeguirComprando = document.createElement("button");
    botonSeguirComprando.textContent = "Seguir Comprando";
    botonSeguirComprando.classList.add("btn-seguir-comprando");
    carritoProductos.appendChild(botonSeguirComprando);
    botonSeguirComprando.addEventListener("click", cerrarCarritoFunc);

    if (carrito.length > 0) {
        const botonVaciarCarrito = document.createElement("button");
        botonVaciarCarrito.textContent = "Vaciar Carrito";
        botonVaciarCarrito.classList.add("btn-vaciar");
        carritoProductos.appendChild(botonVaciarCarrito);
        botonVaciarCarrito.addEventListener("click", vaciarCarrito);


        const botonComprar = document.createElement("button");
        botonComprar.textContent = "Comprar";
        botonComprar.classList.add("btn-comprar");
        carritoProductos.appendChild(botonComprar);
        botonComprar.addEventListener("click", realizarCompra);
    }
}


// Función para realizar la compra con sweet alert

function realizarCompra() {
    Swal.fire({
        icon: 'success',
        title: 'Gracias por tu compra ♥',
        text: 'Tu pedido está en proceso.',
        showConfirmButton: true
    });

    // Vaciar el carrito después de la compra

    vaciarCarrito();
    actualizarContadorCarrito();
    mostrarProductosEnCarrito();
}

// Función para cerrar el carrito 

function cerrarCarritoFunc() {
    document.querySelector("#carrito-desplegable").classList.remove("activo");
}

// Mostrar todos los productos al cargar la página

mostrarProductos();

// función para mostrar los productos por categoria

todos.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarProductos(); // Mostrar todos los productos
});

fragancias.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarProductos("fragancias"); // Mostrar fragancias
});

protectores.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarProductos("protectores"); // Mostrar protectores solares
});

serums.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarProductos("serums"); // Mostrar serums
});

// Inicializar el contador del carrito 

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    mostrarProductosEnCarrito(); 
});
