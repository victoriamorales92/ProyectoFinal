const productos = [
    {
        id: "fragancia-01",
        titulo: "Fragancia Alejandro Sanz 50 ml",
        imagen: "./assets/alesaenz.png",
        categoria: {
            nombre: "Fragancias",
            id: "fragancias"
        },
        precio: 45052
    },
    {
        id: "fragancia-02",
        titulo: "Fragancia Antonio Banderas 100 ml",
        imagen: "./assets/antoniob.png",
        categoria: {
            nombre: "Fragancias",
            id: "fragancias"
        },
        precio: 49873
    },
    {
        id: "fragancia-03",
        titulo: "Fragancia Aqua di Gio",
        imagen: "./assets/aquadiogio.png",
        categoria: {
            nombre: "Fragancias",
            id: "fragancias"
        },
        precio: 54055
    },
    {
        id: "fragancia-04",
        titulo: "Fragancia Cher gift 50ml",
        imagen: "./assets/cherRegalo.png",
        categoria: {
            nombre: "Fragancias",
            id: "fragancias"
        },
        precio: 41606
    },
    {
        id: "protector-01",
        titulo: "Protector Solar Isdin FPS 99",
        imagen: "./assets/isdin99.png",
        categoria: {
            nombre: "Protectores Solares",
            id: "protectores"
        },
        precio: 21606
    },
    {
        id: "protector-02",
        titulo: "Protector Solar Isdin FPS 50",
        imagen: "./assets/isdintres.png",
        categoria: {
            nombre: "Protectores Solares",
            id: "protectores"
        },
        precio: 23606
    },
    {
        id: "protector-03",
        titulo: "Protector solar Isdin pediátrico",
        imagen: "./assets/larocche.png",
        categoria: {
            nombre: "Protectores Solares",
            id: "protectores"
        },
        precio: 41606
    },
    {
        id: "protector-04",
        titulo: "Protector solar Eucerin FPS 50",
        imagen: "./assets/protectorsolar.png",
        categoria: {
            nombre: "Protectores Solares",
            id: "protectores"
        },
        precio: 41606
    },
    {
        id: "serum-01",
        titulo: "Serum Niacinamida LRP",
        imagen: "./assets/nicinamida.png",
        categoria: {
            nombre: "Serums",
            id: "serums"
        },
        precio: 71606
    },
    {
        id: "serum-02",
        titulo: "Serum Acnique",
        imagen: "./assets/cepage.png",
        categoria: {
            nombre: "Serums",
            id: "serums"
        },
        precio: 41606
    },
    {
        id: "serum-03",
        titulo: "Serum Antipigmento",
        imagen: "./assets/serum.png",
        categoria: {
            nombre: "Serums",
            id: "serums"
        },
        precio: 41606
    },
    {
        id: "serum-04",
        titulo: "Serum Mineral 89",
        imagen: "./assets/vichy.png",
        categoria: {
            nombre: "Serums",
            id: "serums"
        },
        precio: 41606
    }
];


//  DOM
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
    contadorCarrito.textContent = carrito.length;
}

// Función para agregar productos al carrito

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);

    // Guardar en localStorage

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar el contador del carrito

    actualizarContadorCarrito();
    mostrarProductosEnCarrito(); 
}

// Función para quitar productos del carrito

function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    actualizarContadorCarrito();
}

// Función para vaciar el carrito

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductosEnCarrito();
    actualizarContadorCarrito();
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
        button.addEventListener('click', function() {
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
        carrito.forEach((producto, index) => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            div.innerHTML = `
                <p>${producto.titulo}</p>
                <p>$${producto.precio}</p>
                <button class="btn-quitar" data-index="${index}">Quitar</button>
            `;
            carritoProductos.appendChild(div);
        });

        // Añadir evento para quitar productos

        document.querySelectorAll('.btn-quitar').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                quitarDelCarrito(index); // Quitar producto al hacer clic
            });
        });
    }

    const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
    totalCarrito.textContent = total.toLocaleString('es-AR');
    

    // botones seguir comprando y vaciar carrito

    agregarBotonesCarrito();
}

// Función para agregar botones de "Seguir Comprando" y "Vaciar Carrito"
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
    }
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
    mostrarProductos("fragancias"); // fragancias
});

protectores.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarProductos("protectores"); // protectores
});

serums.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarProductos("serums"); // solo serums
});

// Inicializar el contador del carrito 

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
    mostrarProductosEnCarrito(); // 
});
