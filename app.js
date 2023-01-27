const formulario = document.getElementById("formulario");
const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");
const detalles = document.getElementById("detalles");
const video = document.getElementById("video");
const contenedorPelicula = document.getElementById("contenedor");
const titulo = document.querySelector(".titulo");
const urlBase = "https://api.themoviedb.org/3/";
const apiKey = "api_key=c9b993483c9002e040faf6c3550d97fd";
const urlImg = "https://image.tmdb.org/t/p/original/";

let contador = 1;


btnSiguiente.addEventListener("click", ()=>{
    if(contador < 1000){
        contador++;
        detalles.innerHTML = "";
        video.innerHTML = "";
        cargarpelicula();
    }
})

btnAnterior.addEventListener("click", ()=>{

    if(contador > 1){
        contador--;
        detalles.innerHTML = "";
        video.innerHTML = "";
        cargarpelicula();
    }
})


function buscarPelicula(e){
    e.preventDefault();
    const buscar = document.getElementById("buscar").value;
    consultarApi(buscar);
    detalles.innerHTML = "";
    video.innerHTML = "";
}

formulario.addEventListener("submit", buscarPelicula);

async function consultarApi(buscar){
    
    try {
       const api = await fetch(`${urlBase}search/movie?${apiKey}&query=${buscar}`)
        .then(respuesta => respuesta.json())
        .then(resultado => resultado);
        
        let peliculas = "";
        api.results.forEach(async (pelicula)=>{
            peliculas += `
                <ul>
                    <li class="peliculas">
                        <a href="#formulario"> <img class="img-pelicula" src="${urlImg}${pelicula.poster_path}" onclick="detallePelicula(${pelicula.id})"> </a>
                        <h3>${pelicula.title}</h3>
                        <p>${pelicula.vote_average}${" "}⭐</p>
                    </li>
                </ul>
            `
        })
        contenedorPelicula.innerHTML = peliculas;
        
        if (peliculas == ""){
            detalles.innerHTML = `
            <h1 class="sinResult">Sin Resultado</h1>
            `
        }

    } catch (error) {
        console.log(error);
    }
}

const cargarpelicula = async() => {
    try {

        const api = await fetch(`${urlBase}movie/popular?${apiKey}&language=es-ES&page=${contador}`)
        .then(respuesta => respuesta.json())
        .then(resultado => resultado);

        let peliculas = "";
        
        api.results.forEach( async(pelicula) => {
            peliculas += `
                
                <ul>
                    <li id="${pelicula.id}" class="peliculas">
                        <a href="#formulario" > <img class="img-pelicula" src="${urlImg}${pelicula.poster_path}" onclick="detallePelicula(${pelicula.id})"> </a>
                        <h3>${pelicula.title}</h3>
                        <p>${pelicula.vote_average}${" "}⭐</p>
                    </li>
                </ul>
            `
           
        });

        contenedorPelicula.innerHTML = peliculas;
        
    } catch(error){
        console.log(error);
    }

}

titulo.addEventListener("click", ()=>{
    detalles.innerHTML = "";
    cargarpelicula();
});

async function detallePelicula(id){
    try {
        const api = await fetch(`${urlBase}movie/${id}?${apiKey}&language=es-ES&page=${contador}`)
        .then(respuesta => respuesta.json())
        .then(resultado => resultado);

        detalles.innerHTML = `
                
                <img class="img-pelicula" src="${urlImg}${api.poster_path}">
                <img class="fondo" src="${urlImg}${api.backdrop_path}">
                <div id="info" >
                    <h2>${api.title}</h2>
                    <p>${api.vote_average}${" "}⭐</p>
                    <h3>Descripción :</h3>
                    <h4>${api.overview}</h4>
                    <h4>Lanzamiento : ${api.release_date}</h4>
                </div>
                
        `
        videos(api.id);
    } catch (error) {
        console.log(error);
    }
}

async function videos(id){
    try {
        
        const api = await fetch(`${urlBase}movie/${id}/videos?${apiKey}&language=es-ES&page=${contador}`)
        .then(respuesta => respuesta.json())
        .then(resultado => resultado);

        video.innerHTML = `
        <iframe width="660" height="415" src="https://www.youtube.com/embed/${api.results[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `

    } catch (error) {
        video.innerHTML = ""
    }
}

cargarpelicula();