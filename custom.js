const siteLetters = document.querySelector(".side-right");
const sideLeft = document.querySelector(".side-left");
const searchLetters = document.querySelector(".search-letters");

const artista =  document.querySelector(".artist");
const cancion =  document.querySelector(".song");

searchLetters.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(artista.value);
    console.log(cancion.value);
    if(artista.value == "" || cancion.value === ""){
        mostrarError("Ambos campos son necesarios!");
        return;
    }

    callApiSong(artista.value, cancion.value);

})

//Ojo

function callApiSong(artista, cancion){
    fetch(`https://api.genius.com/search?q=${artista} ${cancion}`, {
        headers: {
            Authorization: 'Bearer <-h6BY3hV_FD2Lut22sznlHMSie_fLr6UofzaMWwJq6qoXuBfZqH1AM0R92eBwI4G>'
        }
    })
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado);
            // Aquí podrías procesar el resultado y mostrar la letra de la canción
        })
        .catch(error => console.log(error));
}



function mostrarError(mensaje){
    const error = document.createElement("p");
    error.classList.add("error-mensaje");
    error.innerText = mensaje;

    sideLeft.appendChild(error);
    setTimeout(()=>{
        error.remove();
    }, 2000);
}
