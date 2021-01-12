const moviesContainer = document.getElementById('movies__container');
const tvContainer = document.getElementById('tv_container');
const searchInput = document.getElementById('search');
const menuLi = document.querySelectorAll('.menu__list_item');
const img = document.querySelectorAll('img');
const showTvSection = document.querySelector('.show');
const hideMovies = document.querySelector('.hide__movies');
const moviesAndTvs = new Movies();

// ! |||||||||||||||||||||||||||||||DEBOUNCE||||||||||||||||||||||||||||||||
let movieId;
// * Debounce function helper
const debounce = (func, delay = 1000) => {
  let timeoutId;
  // wrapper = call many several times in a row
  return (...args) => {
    // check if timeoutId is defined
    if (timeoutId) {
      // if it is...clear it
      clearTimeout(timeoutId);
    }

    // New execution of the func
    timeoutId = setTimeout(() => {
      // call the func and take all the arguments (arrays) and pass it as seperate arguments to original function
      // Same as func(arg1, arg2, arg3)
      func.apply(null, args);
    }, delay);
  };
};
// ! |||||||||||||||||||||||||||||||||TV DOM||||||||||||||||||||||||||||||||
const createTvDom = (tv) => {
  //console.log(tv);
  // Create a movie div
  const movieCard = document.createElement('div');
  // Add movie class
  movieCard.classList.add('movie');
  // https://image.tmdb.org/t/p/w500/${tv.poster_path}
  movieCard.innerHTML = `
  
    <a href="movie.html">
          <img src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" alt=""
          class="movie--image" data-tv-id=${tv.id} >
    </a>
            <h4 class="movie--title">${tv.original_name}</h4>
            <span class="movie--genre"> ${tv.first_air_date}</span>
    `;

  // append to tv container
  tvContainer.appendChild(movieCard);
};

// ! ||||||||||||||||||||||||||||||||MOVIE DOM|||||||||||||||||||||||||||||
const createMovieDom = (movie) => {
  console.log(movie);
  // Create a movie div
  const movieCard = document.createElement('div');
  // Add movie class
  movieCard.classList.add('movie');
  // create the innerHTML for each movie
  movieCard.innerHTML = `
  <a href="movie.html">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt=""
          class="movie--image" data-movie-id=${movie.id}>
    </a>
            <h4 class="movie--title">${movie.original_title}</h4>
            <span class="movie--genre"> ${new Date(
              movie.release_date
            ).toDateString()}</span>
    `;

  // append it
  moviesContainer.appendChild(movieCard);
};

// ! ||||||||||||||||||||||||||||||||SEARCH TV RESULTS||||||||||||||||||||||
const showTvSearchResults = (tv) => {
  const movieCard = document.createElement('div');
  // Add movie class
  movieCard.classList.add('tv');
  movieCard.innerHTML = `
  <h2 class=" movies--title">TV SHOWS</h2>
  <span class=" movies--text">TV Shows people are watching now </span>
    <div class="movies__container">
    <a href="movie.html">
    <img src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" alt=""
    class="movie--image" data-tv-id=${tv.id} >
</a>
      <h4 class="movie--title">${tv.original_name}</h4>
      <span class="movie--genre"> ${tv.first_air_date}</span>
    </div>
    `;

  // append to tv container
  tvContainer.appendChild(movieCard);
};

// ! ||||||||||||||||||||||||||||||DISPLAY POPULAR MOVIES AND TV SHOWS ||||||||
const displayPopularMovies = (moviesArray) => {
  // Clear movie container div
  moviesContainer.innerHTML = '';
  // Clear tv container div
  tvContainer.innerHTML = '';
  moviesArray.forEach((movie) => {
    // for each movie, call this function below
    createMovieDom(movie);
  });
  // Do not show the tv shows section
  showTvSection.classList.add('show');
  // Remove the display none class from the tv container
  hideMovies.classList.remove('hide__movies');
};

const displayPopularTvShows = (tvArray) => {
  tvContainer.innerHTML = '';
  // Loop through the tv array
  tvArray.forEach((tv) => {
    createTvDom(tv);
  });
  // Remove the popuplar movies TV title
  hideMovies.classList.add('hide__movies');
  showTvSection.classList.remove('show');
};

// ! ||||||||||||||||||||||||||||||ON INPUT |||||||||||||||||||||||||||||||||||||
// If user
const onInput = async (e) => {
  const userInput = e.target.value;
  const results = await moviesAndTvs.searchData(e.target.value); // returns array

  // Clear movie container div
  moviesContainer.innerHTML = '';
  // Clear tv container div
  tvContainer.innerHTML = '';

  // loop through the results of search data
  results.forEach((movie) => {
    // for each  movie, do this below...
    if (movie.media_type === 'movie') {
      createMovieDom(movie);
      // Remove the hide__movies class so it shows the movies results
      hideMovies.classList.remove('hide__movies');
    } else if (movie.media_type === 'tv') {
      createTvDom(movie);
      // Remove the display none so it shows the title of tv shows results
      showTvSection.classList.remove('show');
    }
  });
  // Clear input field
  e.target.value = '';
};

// !||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Search input
searchInput.addEventListener('input', debounce(onInput, 500));

// Sidebar Menu for Movies and TV options
menuLi.forEach((menu) => {
  menu.addEventListener('click', () => {
    switch (menu.textContent) {
      // if user clicks on popular movies
      case 'Popular Movies':
        moviesAndTvs.fetchAnything('movie', 'popular');
        break;
      // if user clicks on Now Playing...and so on and so forth
      case 'Now Playing':
        moviesAndTvs.fetchAnything('movie', 'now_playing');
        break;
      case 'Popular TV Shows':
        moviesAndTvs.fetchAnything('tv', 'popular');
        break;
      case 'Airing Today':
        moviesAndTvs.fetchAnything('tv', 'airing_today');
        break;
      case 'Top Rated':
        moviesAndTvs.fetchAnything('tv', 'top_rated');
        break;

      default:
        moviesAndTvs.fetchAnything('movie', 'popular');
    }
  });
});
// ! ||||||||||||||||||||||||||||||||LOCAL STORAGE||||||||||||||||||||||||||||||||||||||||||||
// We're using the local storage to store the movie ID
const saveMovieToLocalStorage = (movieId) => {
  localStorage.setItem('movieId', movieId);
};

// We're using the local storage to store the TV ID
const saveTvToLocalStorage = (tvId) => {
  localStorage.setItem('tvId', tvId);
};
// ! |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// If user clicks on an image, grab the movieID and TV id if there's any
document.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'img') {
    //moviesAndTvs.test = e.target.getAttribute('data-movie-id');
    const movieID = e.target.getAttribute('data-movie-id');
    const tvID = e.target.getAttribute('data-tv-id');

    // check which id that is defined to localStorage so we can use it on another file
    saveMovieToLocalStorage(movieID);
    // if movieID is defined, save it to local storage
    if (movieID) {
      saveMovieToLocalStorage(movieID);
    } else {
      // else it means the tv ID is defined and store it
      saveTvToLocalStorage(tvID);
    }
  }
});

//Load movies
moviesAndTvs.loadPopularMoviesAndTvs();
