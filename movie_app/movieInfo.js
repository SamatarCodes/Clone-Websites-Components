const movieContainer = document.querySelector('.movie__section');

const movies = new Movies();
// Grab movieId and tvId from local storage
const getMovieId = localStorage.getItem('movieId');
const getTvId = localStorage.getItem('tvId');

// Load the DOM
const createMovieDom = async (getInfo) => {
  const movieDetails = await getInfo;
  // Create a movie div
  const movieCard = document.createElement('div');
  // add movie class for styling
  movieCard.classList.add('movie__container');

  movieCard.innerHTML = `
    
    <div class="movie--image">
    <img src="https://image.tmdb.org/t/p/w500/${
      movieDetails.poster_path
    }" alt="">
    </div>
<div class="movie__description">
    <div class="movie__release">
        <!-- title -->
        <div class="movie__title">
            <h3 class="movie--name">${movieDetails.original_title}</h3>
            <span class="star-vote"><i class="fas fa-star star"></i>${
              movieDetails.vote_average
            }</span>
        </div>
        <div class="movie__release--date">
            <span>${new Date(movieDetails.release_date).toDateString()}</span> |
            <span>Action, Adventure</span>
        </div>
    </div>
    <div class="movie__bio">
        <p>${movieDetails.overview}</p>
    </div>
</div>
    `;

  movieContainer.appendChild(movieCard);
};

const createTVDom = async (getInfo) => {
  const movieDetails = await getInfo;

  console.log(movieDetails);
  // Create a movie div
  const movieCard = document.createElement('div');
  // add movie class for styling
  movieCard.classList.add('movie__container');

  movieCard.innerHTML = `
      
      <div class="movie--image">
      <img src="https://image.tmdb.org/t/p/w500/${
        movieDetails.poster_path
      }" alt="">
      </div>
  <div class="movie__description">
      <div class="movie__release">
          <!-- title -->
          <div class="movie__title">
              <h3 class="movie--name">${movieDetails.name}</h3>
           <span class="star-vote"><i class="fas fa-star star"></i>${
             movieDetails.vote_average
           }</span>
          </div>
          <div class="movie__release--date">
              <span>First Air Date: ${new Date(
                movieDetails.first_air_date
              ).toDateString()}</span> |
              <span>Action, Adventure</span>
          </div>
      </div>
      <div class="movie__bio">
          <p>${movieDetails.overview}</p>
      </div>
  </div>
      `;

  movieContainer.appendChild(movieCard);
};

// check local Storage to see if Movie or tv is null
if (getMovieId !== 'null') {
  // means the ID we grabbed is a movie ID
  // call the getMovieDetails and pass the movieID
  createMovieDom(movies.getMovieDetails(getMovieId));
} else if (getTvId !== 'null') {
  // means the movie ID is null so tv ID is not
  // call the getTvDetails and pass the tvID
  createTVDom(movies.getTvDetails(getTvId));
}
