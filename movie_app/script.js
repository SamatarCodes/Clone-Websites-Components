const moviesContainer = document.getElementById('movies__container');
const tvContainer = document.getElementById('tv_container');

// * fetch movies

const apiKey = key(); //  REMOVE THIS FUNCTION AND ENTER YOUR API KEY HERE
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const popularTvShows = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;
const fetchMovies = async () => {
  try {
    // Fetch movies and tv shows
    const response = await fetch(popularMovies);
    const responseTvShows = await fetch(popularTvShows);

    const moviesArray = await response.json();
    const tvArray = await responseTvShows.json();

    // Call both movies and tv shows functions
    displayPopularMovies(moviesArray.results);
    displayPopularTvShows(tvArray.results);
  } catch (err) {
    console.log(err);
  }
};

const displayPopularMovies = (moviesArray) => {
  // loop through the movie array
  moviesArray.forEach((movie) => {
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
  });
};

const displayPopularTvShows = (tvArray) => {
  // Loop through the tv array
  tvArray.forEach((tv) => {
    // for each tv show, do this below
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
  });
};

fetchMovies();
