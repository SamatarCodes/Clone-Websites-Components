const moviesContainer = document.getElementById('movies__container');
const tvContainer = document.getElementById('tv_container');
const searchInput = document.getElementById('search');
const menuLi = document.querySelectorAll('.menu__list_item');
const img = document.querySelectorAll('img');
const moviesAndTvs = new Movies();

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

const createMovieDom = (movie) => {
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
            <span class="movie--genre"> ${movie.release_date}</span>
    `;

  // append it
  moviesContainer.appendChild(movieCard);
};

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const displayPopularMovies = (moviesArray) => {
  moviesContainer.innerHTML = '';
  // loop through the movie array
  moviesArray.forEach((movie) => {
    createMovieDom(movie);
  });
};

const displayPopularTvShows = (tvArray) => {
  tvContainer.innerHTML = '';
  // Loop through the tv array
  tvArray.forEach((tv) => {
    createTvDom(tv);
  });
};

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const onInput = async (e) => {
  const userInput = e.target.value;
  const results = await moviesAndTvs.searchData(e.target.value); // returns array

  // Clear movie container
  moviesContainer.innerHTML = '';
  // Clear tv container
  tvContainer.innerHTML = '';

  // loop through the results of search data
  results.forEach((movie) => {
    // for each  movie
    if (movie.media_type === 'movie') {
      createMovieDom(movie);
    } else if (movie.media_type === 'tv') {
      createTvDom(movie);
    }
  });
  // Clear input field
  e.target.value = '';
};

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Search input
searchInput.addEventListener('input', debounce(onInput, 500));

// Sidebar  Menu
menuLi.forEach((menu) => {
  menu.addEventListener('click', () => {
    switch (menu.textContent) {
      case 'Popular Movies':
        moviesAndTvs.fetchAnything('movie', 'popular');
        break;
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
const saveMovieToLocalStorage = (movieId) => {
  localStorage.setItem('movieId', movieId);
};

const saveTvToLocalStorage = (tvId) => {
  localStorage.setItem('tvId', tvId);
};

document.addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'img') {
    //moviesAndTvs.test = e.target.getAttribute('data-movie-id');
    const movieID = e.target.getAttribute('data-movie-id');
    const tvID = e.target.getAttribute('data-tv-id');

    // check which id that is defined to localStorage so we can use it on another file
    saveMovieToLocalStorage(movieID);
    if (movieID) {
      saveMovieToLocalStorage(movieID);
    } else {
      saveTvToLocalStorage(tvID);
    }
  }
});

//Load movies
moviesAndTvs.loadPopularMoviesAndTvs();
