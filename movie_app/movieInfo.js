const movieContainer = document.querySelector('.movie__section');
const castImages = document.querySelector('.cast__images');

const movies = new Movies();
// Grab movieId and tvId from local storage
const getMovieId = localStorage.getItem('movieId');
const getTvId = localStorage.getItem('tvId');

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

  // Movie cast - name of actors
  //const { name, id, character, profile_path } = movieDetails.movieCredits.cast;
  // console.log(movieDetails.movieCredits.cast[0]);
  // Call the showCast function
  showCast(movieDetails.movieCredits.cast);

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
          <span class="star-vote"><i class="fas fa-star star"></i>${vote_average}/10</span>
      </div>
      <div class="movie__release--date">
          <span>${new Date(release_date).toDateString()}</span> |
          <span>Action, Adventure</span>
      </div>
  </div>
  <div class="movie__bio">
      <p class="movie__bio--text">${overview}</p>
      <div class="credit">
          <span><span class="credit--cast">Director:</span> ${
            movieDetails.movieCredits.crew[0].name
          }</span>
         
          <span class="credit2"><span class="credit--cast">Cast:</span> ${
            movieDetails.movieCredits.cast[0] !== undefined
              ? movieDetails.movieCredits.cast[0].name
              : 'Not Listed'
          } <span> ${
    movieDetails.movieCredits.cast[1] !== undefined
      ? ', ' + movieDetails.movieCredits.cast[1].name
      : ''
  }</span> ${
    movieDetails.movieCredits.cast[2] !== undefined
      ? ', ' + movieDetails.movieCredits.cast[2].name
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
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const showCast = (castArray) => {
  // if there's a cast array, list it
  if (castArray !== undefined) {
    // loop through it

    for (i = 0; i <= 9; i++) {
      const movie = document.createElement('div');
      movie.classList.add('movie');

      // If actor NOT undefined, show it
      if (castArray[i] !== undefined) {
        movie.innerHTML = `
        <div>
       
            <img src="https://image.tmdb.org/t/p/w500/${
              castArray[i].profile_path !== undefined
                ? castArray[i].profile_path
                : ''
            }" alt=""
                class="movie--image">
      
        <h4 class="movie--title">${castArray[i].name} </h4>
        <span class="movie--genre">${castArray[i].character}</span>
      </div>
        
        
        `;
      }
      castImages.appendChild(movie);
    }
  }
};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const createTVDom = async (getInfo) => {
  // getInfo is an async so we wait to get the info back
  const tvDetails = await getInfo;

  // Destructuring the tvdetails information
  const {
    name,
    vote_average,
    first_air_date,
    overview,
    poster_path,
  } = tvDetails.movieInfo;

  console.log(tvDetails.creditInfo);
  //showCast(movieDetails.movieCredits.cast);

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

  // Movie HTML
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
          <span>Cast: ${tvDetails.creditInfo[0].name}
          ${
            tvDetails.creditInfo[1] !== undefined
              ? ', ' + tvDetails.creditInfo[1].name
              : ''
          }
          ${
            tvDetails.creditInfo[2] !== undefined
              ? ', ' + tvDetails.creditInfo[2].name
              : ''
          } 
          
         </span>

      </div>
      </div>
  </div>
  <div class="image__section">
  <img class="movie--image" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="tv show poster" title="${name}">
  </div>
      `;

  // movieCard.appendChild(actorDiv);
  movieContainer.appendChild(movieCard);
};

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
