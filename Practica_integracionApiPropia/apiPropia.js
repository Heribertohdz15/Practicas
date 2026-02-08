const urlApi = "https://unicafe.grupoctic.com/appMovil/api/apiProductos.php";

// Función asíncrona para pedir los datos
const cargarProductos = () => {
  // Usamos fetch para hacer la petición HTTP
  fetch(urlApi)
    .then((respuesta) => respuesta.json()) // Convertimos la respuesta cruda a formato JSON
    .then((data) => {
      // La API devuelve un objeto con una propiedad 'items' que contiene el array
      const productos = data;

      console.log("Datos recibidos:", productos); // Debugging en consola

      // Llamamos a la función que se encarga de dibujar en pantalla
      mostrarProductos(productos);
    })
    .catch((error) => {
      // Buena práctica: Manejar errores por si falla la red o la API
      console.error("Error al cargar los personajes:", error);
      alert("Hubo un error al cargar los datos. Revisa la consola.");
    });
};

// Función encargada de manipular el DOM
const mostrarProductos = (productos) => {
  // 1. Seleccionamos el contenedor del HTML
  const contenedorProductos = document.getElementById("contenedorProductos");

  // 2. Limpiamos el contenedor por si ya tenía contenido previo
  contenedorProductos.innerHTML = "";

  // 3. Recorremos cada personaje del array
  productos.forEach((producto) => {
    // Creamos un elemento DIV nuevo en memoria
    const tarjeta = document.createElement("div");

    // Le añadimos la clase CSS que definimos en el paso 3
    tarjeta.classList.add("practice-card");

    // Usamos Template Strings (``) para inyectar el HTML interno con los datos
    tarjeta.innerHTML = `
    <img src="https://unicafe.grupoctic.com/${producto.imagenProdc}" alt="${producto.nombre}">
    <div class="card-details"> 
    <h3 class="practice-title">${producto.nombre}</h3>
    <p class="card-description"><strong>Descripcion:</strong> ${producto.descripcion}</p>
    <p class="card-price"><strong>Precio:</strong> ${producto.precio}</p>
    </div>
    `;

    // Finalmente, agregamos la tarjeta completa al contenedor principal
    contenedorProductos.appendChild(tarjeta);
  });
};
