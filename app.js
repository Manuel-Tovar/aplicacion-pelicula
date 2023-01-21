const formulario = document.getElementById("formulario");
const btnSiguiente = document.getElementById("siguiente");
const btnAnterior = document.getElementById("anterior");
const urlBase = "https://api.themoviedb.org/3/";
const apiKey = "api_key=c9b993483c9002e040faf6c3550d97fd";
const urlImg = "https://image.tmdb.org/t/p/original/";
let contador = 1;

btnSiguiente.addEventListener("click", ()=>{
    if(contador < 1000){
        contador++
        cargarpelicula();
    }
})

btnAnterior.addEventListener("click", ()=>{

    if(contador > 1){
        contador--
        cargarpelicula();
    }
})

formulario.addEventListener("submit", buscarPelicula);

function buscarPelicula(e){
    e.preventDefault();
    const buscar = document.getElementById("buscar").value;
   consultarApi(buscar);
}

async function consultarApi(buscar){
    const url = `${urlBase}search/movie?${apiKey}&query=${buscar}`

    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        let peliculas = "";
        resultado.results.forEach(async (pelicula)=>{
            peliculas += `
            <ul>
                <li class="peliculas">
                    <img class="img-pelicula" src="${urlImg}${pelicula.poster_path}">
                    <h3>${pelicula.title}</h3>
                    <p>${pelicula.vote_average}${" "}⭐</p>
                </li>
            </ul>
            `
        })
        document.getElementById("contenedor").innerHTML = peliculas

    } catch (error) {
        console.log(error)
    }
}

const cargarpelicula = async() => {
    try {
        const respuesta = await fetch(`${urlBase}movie/popular?${apiKey}&language=es-ES&page=${contador}`);
        const datos = await respuesta.json();
        let peliculas = "";
        
            datos.results.forEach( async(pelicula) => {
                peliculas += `
                
                <ul>
                    <li class="peliculas">
                        <img class="img-pelicula" src="${urlImg}${pelicula.poster_path}">
                        <h3>${pelicula.title}</h3>
                        <p>${pelicula.vote_average}${" "}⭐</p>
                    </li>
                </ul>
            `
        });

        document.getElementById("contenedor").innerHTML = peliculas;

    } catch(error){
        console.log(error);
    }

}

cargarpelicula();




