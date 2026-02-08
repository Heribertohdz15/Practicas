const paramentros = new URLSearchParams(window.location.search);
const idProducto = paramentros.get("id");

const cargarDetalle = async () => {
    try {
        const respuesta = await fetch(`https://dummyjson.com/products/${idProducto}`);
        const producto = await respuesta.json();
        console.log("Datos recibidos:", producto); 
        Detalle_producto(producto);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        alert("Hubo un error al cargar los datos.");
    }
};

const Detalle_producto = (producto) => {
    const contenedor = document.getElementById("detalleProducto");
    
    // El orden solicitado: Nombre, Imagen, Descripcion, Precio, Marca, Categoria
    contenedor.innerHTML = `    
        <div class="detalle-contenedor"> 
            <h3 class="practice-title">${producto.title}</h3>
            
            <div class="detalle-visual">
                <img src="${producto.thumbnail}" alt="${producto.title}">
            </div>
             <strong>Descripcion: </strong>${producto.description}
                <div class="meta-datos">
                    <p><strong>Precio: </strong> $${producto.price}</p>
                    <p><strong>Marca: </strong> ${producto.brand}</p>
                    <p><strong>Categoría: </strong> ${producto.category}</p>
                    <p><strong>Stock: </strong> ${producto.stock} unidades</p>
                    <p><strong>Rating: </strong> ${producto.rating}</p>
                </div>
                
                <button type="button" class="btn-regresar" onclick="window.history.back()">Regresar</button>

        </div>
    `;
}

cargarDetalle();