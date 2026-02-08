const BASE_URL = "https://dummyjson.com/products";

const state = {
    skip: 0,
    limit: 10,
    total: 0,
    busqueda: "",
    categoria: "",
    ordenar: null
};

function buildURL() {

    let url = BASE_URL;

    if (state.busqueda) {
        url += `/search?q=${encodeURIComponent(state.busqueda)}`;
    }
    else if (state.categoria) {
        url += `/category/${state.categoria}`;
    }

    url += `?limit=${state.limit}&skip=${state.skip}`;

    if (state.ordenar) {
        url += `&sortBy=${state.ordenar.campo}&order=${state.ordenar.tipo}`;
    }

    return url;
}

async function cargarProductos() {

    try {

        const res = await fetch(buildURL());
        const data = await res.json();

        state.total = data.total;

        renderizarTabla(data.products);
        actualizarPaginacion();

    } catch {
        alert("Error al cargar productos");
    }
}

function renderizarTabla(productos) {

    productTable.innerHTML = "";

    if (!productos.length) {
        productTable.innerHTML = `
            <tr><td colspan="6">Sin resultados</td></tr>`;
        return;
    }

    productos.forEach(p => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}"></td>
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

function actualizarPaginacion() {

    const pagina = Math.floor(state.skip / state.limit) + 1;
    const totalPaginas = Math.ceil(state.total / state.limit);

    pageInfo.textContent = `Página ${pagina} de ${totalPaginas}`;

    prevBtn.disabled = state.skip === 0;
    nextBtn.disabled = state.skip + state.limit >= state.total;
}

/* ================= EVENTOS ================= */

prevBtn.onclick = () => {
    state.skip -= state.limit;
    cargarProductos();
};

nextBtn.onclick = () => {
    state.skip += state.limit;
    cargarProductos();
};

searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        state.busqueda = e.target.value.trim();
        state.categoria = "";
        state.skip = 0;
        cargarProductos();
    }
});

categorySelect.onchange = e => {
    state.categoria = e.target.value;
    state.busqueda = "";
    state.skip = 0;
    cargarProductos();
};

sortSelect.onchange = e => {

    if (!e.target.value) state.ordenar = null;
    else {
        const [campo, tipo] = e.target.value.split("-");
        state.ordenar = { campo, tipo };
    }

    state.skip = 0;
    cargarProductos();
};

/* ================= CATEGORIAS ================= */

async function cargarCategorias() {

    const res = await fetch(`${BASE_URL}/category-list`);
    const data = await res.json();

    data.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

/* ================= EDITAR ================= */

async function editarProducto(id) {

    const titulo = prompt("Nuevo título:");
    const precio = prompt("Nuevo precio:");

    if (!titulo || !precio) return;

    await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titulo, price: precio })
    });

    alert("Producto actualizado");

    cargarProductos();
}

/* ================= ELIMINAR ================= */

async function eliminarProducto(id) {

    if (!confirm("¿Eliminar este producto?")) return;

    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

    alert("Producto eliminado");

    cargarProductos();
}

/* INIT */
cargarCategorias(); 
cargarProductos();
