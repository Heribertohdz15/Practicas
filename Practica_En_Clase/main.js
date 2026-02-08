// Referencias a los elementos
const contenedorProductos = document.getElementById("contenedorProductos");
const formulario = document.querySelector("form");
const inputBusqueda = document.querySelector('input[name="query"]');

// Función para pintar los productos (mantenemos tu estructura de etiquetas)
const renderizarProductos = (productos) => {
    contenedorProductos.innerHTML = ""; // Limpiamos para la nueva carga o búsqueda

    if (productos.length === 0) {
        contenedorProductos.innerHTML = "No se encontraron productos.";
        return;
    }

    productos.forEach(producto => {
        const tarjeta = document.createElement("a");
        tarjeta.className = "practice-card";
        tarjeta.href = `DetalleProducto.html?id=${producto.id}`;

        tarjeta.innerHTML = `
            <h3>${producto.title}</h3>
            <img src="${producto.images[0]}" alt="${producto.title}" width="200" height="200">
            <div class="meta-datos">
              <p><strong>Precio: </strong> $${producto.price}</p>
              <p><strong>Marca: </strong> ${producto.brand}</p>
              <p><strong>Categoría: </strong> ${producto.category}</p>
              <p><strong>Rating: </strong> ${producto.rating}</p>
            </div>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
};

// Función de carga con .then() como la tenías originalmente
const obtenerProductos = (query = "") => {
    // Decidimos la URL según si hay búsqueda o no
    const url = query 
        ? `https://dummyjson.com/products/search?q=${query}` 
        : 'https://dummyjson.com/products';

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const productos = data.products;
            console.log(productos);
            renderizarProductos(productos);
        })
        .catch(err => console.error("Error:", err));
};

// Evento del formulario para la búsqueda
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const busqueda = inputBusqueda.value;
    obtenerProductos(busqueda);
});

// Carga inicial
obtenerProductos();