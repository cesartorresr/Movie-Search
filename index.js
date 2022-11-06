const searchBtn = document.getElementById('search-btn')
const inputMovieTitle = document.getElementById('movie-title')
const container = document.getElementById('main')
const watchList = JSON.parse(localStorage.getItem("watchlist")) || []


searchBtn.addEventListener('click', searchForMovie)

// llamo a la api para buscar la pelicula
 function searchForMovie() {
   fetch(`https://www.omdbapi.com/?s=${inputMovieTitle.value}&apikey=38a301e7`)
   .then(response => response.json())
   .then(data => {
    render(data)
   })
     
 }
 
 // llamo a la api otra vez para entrar en cada detalle de la pelicula

function render(data) {
    let html = '';
    for(let i = 0; i< data.Search.length; i++) {
        fetch(`https://www.omdbapi.com/?i=${data.Search[i].imdbID}&apikey=76667b48`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
         const {Poster, Title, imdbRating, Runtime, Genre, imdbID, Plot, watchId} = data
         // hago esto para no hacer data.Poster sino Poster
         
          let text = watchId ? "Added" : "Wachtlist"
          let addFunc = watchId ? null : `addMovie(${imdbID})`
          
            html += `
             <img class="imagen-movie" src="${Poster}" alt='imagenes'
            <div class="movie-description">
                <div class="movie-info">
                    <div class="main-info">
                        <h3 class='title-movie'> ${Title}</h3>
                            <img src="../star.png" class="star-image"/>
                            <p>${imdbRating}</p>
                    </div>
                    <div class="duration-container">
                        <h3 class="duration-movie">${Runtime}</h3>
                        <h3 class="genre-movie">${Genre}</h3>
                        <img src="../watchlist.png" class="watchlist-image" onclick="${addFunc}"/>
                        <h3 id="elem" class="watchlist-movie">${text}</h3>
                    </div>
                        <h3 class="parrafo">${Plot}</h3>
                 </div>
                 
                
                </div>
               
                
                
            </div>
        `
        container.innerHTML =  html
            })
          
    }
    
    
    
}

// adding movies in watchlis
function addMovie(imbdID){
        watchList.push(imdbID)
        document.getElementById('elem').textContent = 'Added'
      localStorage.setItem("watchlist", JSON.stringify(watchList))
      
}