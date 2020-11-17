class Movies {
  constructor() {
    this.test = '';
    this.key = key(); // ENTER YOUR OWN API KEY HERE
    this.popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${this.key}&language=en-US&page=1`;
    this.popularTvShows = `https://api.themoviedb.org/3/tv/popular?api_key=${this.key}&language=en-US&page=1`;
  }

  async getMovieDetails(movieId) {
    const movieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.key}`;

    try {
      // Fetch movies and tv shows
      const response = await fetch(movieDetails);
      const movieInfo = await response.json();
      return movieInfo;
    } catch (err) {
      console.log(err);
    }
  }
  async loadPopularMoviesAndTvs() {
    try {
      // Fetch movies and tv shows
      const response = await fetch(this.popularMovies);
      const responseTvShows = await fetch(this.popularTvShows);

      const moviesArray = await response.json();
      const tvArray = await responseTvShows.json();

      // Call both movies and tv shows functions
      displayPopularMovies(moviesArray.results);
      displayPopularTvShows(tvArray.results);
    } catch (err) {
      console.log(err);
    }
  }

  async fetchAnything(category, filter) {
    const data = `https://api.themoviedb.org/3/${category}/${filter}?api_key=${this.key}&language=en-US&page=1`;
    try {
      const response = await fetch(data);
      const resultsData = await response.json();

      if (category === 'movie') {
        displayPopularMovies(resultsData.results);
      } else if (category === 'tv') {
        console.log(resultsData.results);
        displayPopularTvShows(resultsData.results);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async searchData(searchTerm) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${this.key}&language=en-US&page=1&include_adult=false&query=${searchTerm}`
      );
      const resultsData = await response.json();
      return resultsData.results;
    } catch (err) {
      console.log(err);
    }
  }

  async searchById() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/find/tt4566758?api_key=${this.key}&language=en-US&external_source=imdb_id`
      );
      const resultsData = await response.json();
      console.log(resultsData);
      return resultsData.results;
    } catch (err) {
      console.log(err);
    }
  }
}
