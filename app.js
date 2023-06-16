// const res = require("express/lib/response");
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener('click', () => {
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async() => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=bbd3035ce4b04d6e9aa6344d63f4c84a&page=${pagina}`);

        console.log(response);

        // Si la respuesta es correcta
        if(response.status === 200){
            const datos = await response.json();

        let peliculas = '';
        datos.results.forEach(pelicula => {
            peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">    
                    <h1 class="titulo">${pelicula.title}</h1><br>
                    <p class="sinopsis">${pelicula.overview}</p><br>
                    <h4 class="fechaEstreno">${pelicula.release_date}</h4>
                </div>
            `;
        });

        document.getElementById('contenedor').innerHTML = peliculas;

        } else if(response.status === 401){
            console.log("Ingresaste mal algún dato");
        } else if(response.status === 404){
            console.log("La película que buscas no existe");
        } else{
            console.log("Se ha producido un error desconocido");
        }

    } catch (error) {
        console.log("Se ha producido un error al consultar la API");
    }
}

cargarPeliculas();