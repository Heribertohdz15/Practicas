const BASE_URL = "https://dummyjson.com/products";

const productTable = document.getElementById("productTable");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");

const state = {
    skip: 0,
    limit: 10,
    total: 0,
    busqueda: "",
    categoria: "",
    ordenar: null
};

function buildURL() {

    const params = new URLSearchParams({
        limit: state.limit,
        skip: state.skip
    });

    // Solo ordenar cuando NO hay búsqueda
    if (state.ordenar && !state.busqueda) {
        params.append("sortBy", state.ordenar.campo);
        params.append("order", state.ordenar.tipo);
    }

    if (state.busqueda) {
        return `${BASE_URL}/search?q=${encodeURIComponent(state.busqueda)}&${params.toString()}`;
    }

    if (state.categoria) {
        return `${BASE_URL}/category/${state.categoria}?${params.toString()}`;
    }

    return `${BASE_URL}?${params.toString()}`;
}

async function cargarProductos() {

    try {

        const res = await fetch(buildURL());
        if (!res.ok) throw new Error("Error HTTP");

        const data = await res.json();

        state.total = data.total;

        renderizarTabla(data.products);
        actualizarPaginacion();

    } catch (err) {
        console.error(err);
        alert("Error al cargar productos");
    }
}

/* Buscar productos */
function buscarProductos(texto) {

    state.busqueda = texto;
    state.categoria = "";
    state.skip = 0;

    cargarProductos();
}

/* TABLA */

function renderizarTabla(productos) {

    productTable.innerHTML = "";

    if (!productos.length) {
        productTable.innerHTML = `
            <tr>
                <td colspan="6">Sin resultados</td>
            </tr>`;
        return;
    }

    productos.forEach(p => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>
                <img src="${p.thumbnail}" width="60">
            </td>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td>${p.category}</td>
            <td>
                <button class="btn warning" onclick="editarProducto(${p.id})">
                    Editar
                </button>
                <button class="btn danger" onclick="eliminarProducto(${p.id})">
                    Eliminar
                </button>
            </td>
        `;

        productTable.appendChild(tr);
    });
}

/*PAGINACION */

function actualizarPaginacion() {

    const pagina = Math.floor(state.skip / state.limit) + 1;
    const totalPaginas = Math.ceil(state.total / state.limit);

    pageInfo.textContent = `Página ${pagina} de ${totalPaginas}`;

    prevBtn.disabled = state.skip === 0;
    nextBtn.disabled = state.skip + state.limit >= state.total;
}

/*EVENTOS */

prevBtn.onclick = () => {
    state.skip -= state.limit;
    cargarProductos();
};

nextBtn.onclick = () => {
    state.skip += state.limit;
    cargarProductos();
};

/* ENTER en input */
searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        buscarProductos(e.target.value.trim());
    }
});

/* BOTON BUSCAR */
searchBtn.onclick = () => {
    buscarProductos(searchInput.value.trim());
};

categorySelect.onchange = e => {
    state.categoria = e.target.value;
    state.busqueda = "";
    state.skip = 0;
    cargarProductos();
};

sortSelect.onchange = e => {

    if (!e.target.value) {
        state.ordenar = null;
    } else {
        const [campo, tipo] = e.target.value.split("-");
        state.ordenar = { campo, tipo };
    }

    state.skip = 0;
    cargarProductos();
};

/* CATEGORIAS */

async function cargarCategorias() {

    try {
        const res = await fetch(`${BASE_URL}/category-list`);
        const data = await res.json();

        data.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            categorySelect.appendChild(option);
        });

    } catch (err) {
        console.error(err);
    }
}

/* EDITAR */

async function editarProducto(id) {

    const titulo = prompt("Nuevo título:");
    const precio = prompt("Nuevo precio:");

    if (!titulo || !precio) return;

    await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: titulo,
            price: Number(precio)
        })
    });

    alert("Producto actualizado");

    cargarProductos();
}

/* ELIMINAR */

async function eliminarProducto(id) {

    if (!confirm("¿Eliminar este producto?")) return;

    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });

    alert("Producto eliminado");

    cargarProductos();
}

/* INIT */

cargarCategorias();
cargarProductos();
