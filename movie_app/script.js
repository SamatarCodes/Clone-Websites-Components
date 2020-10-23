const moviesContainer = document.getElementById('movies__container');
const tvContainer = document.getElementById('tv_container');
const searchInput = document.getElementById('search');
const menuLi = document.querySelectorAll('.menu__list_item');

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// * fetch movies

const apiKey = key(); //  REMOVE THIS FUNCTION AND ENTER YOUR API KEY HERE
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const popularTvShows = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const loadPopularMoviesAndTvs = async () => {
  try {
    // Fetch movies and tv shows
    const response = await fetch(popularMovies);
    const responseTvShows = await fetch(popularTvShows);

    const moviesArray = await response.json();
    console.log(moviesArray);
    const tvArray = await responseTvShows.json();

    // Call both movies and tv shows functions
    displayPopularMovies(moviesArray.results);
    displayPopularTvShows(tvArray.results);
  } catch (err) {
    console.log(err);
  }
};
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const fetchAnything = async (category, filter) => {
  const data = `https://api.themoviedb.org/3/${category}/${filter}?api_key=${apiKey}&language=en-US&page=1`;
  try {
    const response = await fetch(data);
    const resultsData = await response.json();
    //console.log(resultsData.results);

    if (category === 'movie') {
      displayPopularMovies(resultsData.results);
    } else if (category === 'tv') {
      console.log(resultsData.results);
      displayPopularTvShows(resultsData.results);
    }
  } catch (err) {
    console.log(err);
  }
};
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const searchData = async (searchTerm) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
    );
    const resultsData = await response.json();
    return resultsData.results;
  } catch (err) {
    console.log(err);
  }
};
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const createTvDom = (tv) => {
  // Create a movie div
  const movieCard = document.createElement('div');
  // Add movie class
  movieCard.classList.add('movie');

  movieCard.innerHTML = `
  <a href="https://image.tmdb.org/t/p/w500/${tv.poster_path}">
        <img src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" alt=""
        class="movie--image">
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
  <a href="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt=""
        class="movie--image">
  </a>
          <h4 class="movie--title">${movie.original_title}</h4>
          <span class="movie--genre"> ${movie.release_date}</span>
  `;

  // append it
  moviesContainer.appendChild(movieCard);
};

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
const displayPopularMovies = (moviesArray) => {
  moviesContainer.innerHTML = '';
  // loop through the movie array
  moviesArray.forEach((movie) => {
    createMovieDom(movie);
  });
};
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
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
  const results = await searchData(e.target.value); // returns array

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
    if (menu.textContent === 'Popular Movies') {
      fetchAnything('movie', 'popular');
    } else if (menu.textContent === 'Popular TV Shows') {
      fetchAnything('tv', 'popular');
    } else if (menu.textContent === 'Airing Today') {
      fetchAnything('tv', 'airing_today');
    }
  });
});

//Load movies
loadPopularMoviesAndTvs();
