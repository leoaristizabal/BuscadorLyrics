const sideLetters = document.querySelector(".side-right");
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

    callApiSong(artista, cancion);

})

//Ojo

const apiUrl = 'https://api.musixmatch.com/ws/1.1/';
const apiKey = 'd2420abdcecd2fdc676a4524856b3e34';

function callApiSong() {

  const apiEndpoint = 'track.search';
  const queryUrl = `${apiUrl}${apiEndpoint}?q_track=${cancion.value}&q_artist=${artista.value}&apikey=${apiKey}`;


  fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
//        console.log(data);
      const trackList = data.message.body.track_list;
      if (trackList.length > 0) {
        const trackId = trackList[0].track.track_id;
        const lyricsEndpoint = 'track.lyrics.get';
        const lyricsUrl = `${apiUrl}${lyricsEndpoint}?track_id=${trackId}&apikey=${apiKey}`;
        fetch(lyricsUrl)
          .then(response => response.json())
          .then(data => {
            const lyrics = data.message.body.lyrics.lyrics_body;
            mostrarLetra(lyrics);
            console.log(lyrics);
          })
          .catch(error => console.error(error));
      } else {
        console.log('No se encontraron resultados para la canción');
      }
    })
    .catch(error => console.error(error));
}

callApiSong();

function mostrarLetra(lyrics){
    sideLetters.innerHTML = "";
    const title = document.createElement("h4");
    title.innerText = `${cancion.value} by ${artista.value}`; 
    sideLetters.appendChild(title);
    const letra = document.createElement("p");
    letra.innerText = lyrics;
    letra.style.marginBottom = "20px";
    sideLetters.appendChild(letra);
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
