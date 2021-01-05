const movieContainer = document.querySelector('.movie__section');

const movies = new Movies();
// Grab movieId and tvId from local storage
const getMovieId = localStorage.getItem('movieId');
const getTvId = localStorage.getItem('tvId');
// Load the DOM
const createMovieDom = async (getInfo) => {
  const movieDetails = await getInfo;
  console.log(movieDetails);

  // Destructuring the movieDetails
  const {
    original_title,
    vote_average,
    release_date,
    overview,
    poster_path,
  } = movieDetails.movieInfo;

  // Movie cast
  const { name } = movieDetails.movieCredits.cast[0];

  // Create a movie div
  const movieCard = document.createElement('div');
  // add movie class for styling
  movieCard.classList.add('movie__container');

  movieCard.innerHTML = `
    
  <div class="movie__description">
  <div class="movie__release">
      <!-- title -->
      <div class="movie__title">
          <h3 class="movie--name">${original_title}</h3>
          <span class="star-vote"><i class="fas fa-star star"></i>${vote_average}</span>
      </div>
      <div class="movie__release--date">
          <span>${new Date(release_date).toDateString()}</span> |
          <span>Action, Adventure</span>
      </div>
  </div>
  <div class="movie__bio">
      <p class="movie__bio--text">${overview}</p>
      <div class="credit">
          <span>Director: ${movieDetails.movieCredits.crew[0].name}</span>
         
          <span>Cast: ${
            movieDetails.movieCredits.cast[0] !== undefined
              ? movieDetails.movieCredits.cast[0].name
              : ''
          }, ${
    movieDetails.movieCredits.cast[1] !== undefined
      ? movieDetails.movieCredits.cast[2].name
      : ''
  }, ${
    movieDetails.movieCredits.cast[2] !== undefined
      ? movieDetails.movieCredits.cast[2].name
      : ''
  }
  </span>
      </div>
  </div>
  </div>
  <div class="image__section">
      <img class="movie--image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="movie or tv image">
  </div>

    `;

  movieContainer.appendChild(movieCard);
};

const createTVDom = async (getInfo) => {
  // getInfo is an async so we wait to get the info back
  const tvDetails = await getInfo;
  console.log(tvDetails.creditInfo);
  console.log(tvDetails.creditInfo.length);

  // Destructuring the tvdetails information
  const {
    name,
    vote_average,
    first_air_date,
    overview,
    poster_path,
  } = tvDetails.movieInfo;

  // TV director
  let createdBy;
  // Check if we have a name of who created the show
  if (tvDetails.movieInfo.created_by.length > 0) {
    // if we have a name, assign it to createdBy
    createdBy = tvDetails.movieInfo.created_by[0].name;
  } else {
    // if we do not have a name, set it as not listed
    createdBy = 'Not listed';
  }
  // |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  // Create a movie div
  const movieCard = document.createElement('div');
  // add movie class for styling
  movieCard.classList.add('movie__container');

  movieCard.innerHTML = `
      
  <div class="movie__description">
      <div class="movie__release">
          <!-- title -->
          <div class="movie__title">
              <h3 class="movie--name">${tvDetails.movieInfo.name}</h3>
           <span class="star-vote"><i class="fas fa-star star"></i>${vote_average}</span>
          </div>
          <div class="movie__release--date">
              <span>First Air Date: ${new Date(
                first_air_date
              ).toDateString()}</span> |
              <span>Fix this</span>
          </div>
      </div>
      <div class="movie__bio">
          <p class="movie__bio--text">${overview}</p>
          <div class="credit">
          <span>Director: ${createdBy}</span>
          <span>Cast: ${tvDetails.creditInfo[0].name}, 
          ${
            tvDetails.creditInfo[1].name !== undefined
              ? tvDetails.creditInfo[1].name
              : ''
          }, ${
    tvDetails.creditInfo[2].name !== undefined
      ? tvDetails.creditInfo[2].name
      : ''
  } </span>

      </div>
      </div>
  </div>
  <div class="image__section">
  <img class="movie--image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="tv show poster" title="${name}">
  </div>
      `;

  // const creditCast = document.querySelector('.movie__bio');
  // movieCard.appendChild(actorDiv);
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
