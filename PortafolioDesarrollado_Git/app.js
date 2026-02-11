urlApi = 'https://api.github.com/users/Heribertohdz15'

CargarUsuario = () => {

    fetch(urlApi)
        .then(Response => Response.json())
        .then(data => {

            const usuario = data

            console.log("Datos recibidos: ", usuario)
            mostrarUsuario(usuario)
        })


}
mostrarUsuario = (usuario) => {
    const contenedor = document.getElementById("perfil-container")
    contenedor.innerHTML = ""

    const tarjeta = document.createElement("div")

    tarjeta.innerHTML = `
      <img src="https://avatars.githubusercontent.com/u/219858667?s=400&v=4" alt="Avatar" class="profile-img mb-3" id="avatar-perfil">
                <h1 class="display-4" id="user-name">${usuario.name}</h1>
                <p class="lead" id="user-bio">${usuario.bio}</p>
                <div class="d-flex justify-content-center gap-3">
                    <span class="location-badge" id="user-location">${usuario.location}</span>
    `

    contenedor.appendChild(tarjeta)
}

mostrarRepos = () => {

    fetch(`${urlApi}/repos?sort=update&per_page=6&type=ower&direction=desc`)
        .then(Response => Response.json())
        .then(data => {
            const contenedor = document.getElementById("repos-container")
            contenedor.innerHTML = ""

            data.forEach(repo => {
                const tarjeta = document.createElement("div")
                tarjeta.classList.add("col")
                tarjeta.innerHTML = `
            <div class="col">
                        <div class="card repo-card border-0 shadow-sm">
                            <div class="card-body">
                                <h5 class="card-title text-primary">${repo.name}</h5>
                                <p class="card-text text-muted small">${repo.description}</p>
                                <a href="${repo.html_url}" class="btn-code">Ver Código</a>
                            </div>
                        </div>
                    </div>
            `
                contenedor.appendChild(tarjeta)

            });

        })


}

mostrarSeguidores = () => {
    fetch(`${urlApi}/followers`)
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById("followers-container");
            lista.innerHTML = "";

            // Tomar solo los primeros 5
            data.slice(0, 5).forEach(seguidores => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("follower-card");

                tarjeta.innerHTML = `
                <img src="${seguidores.avatar_url}" class="follower-img">
                <span class="follower-name">${seguidores.login}</span>
                `;
                lista.appendChild(tarjeta);
            });
        })
        .catch(error => console.error("Error al obtener seguidores:", error));
};

CargarUsuario()
mostrarRepos()
mostrarSeguidores()