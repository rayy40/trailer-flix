const API_KEY = "c2ddd421df000578339377f36ea2834c";

export const requests = {
  getMovieList: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  getTvList: `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`,
  getTrending: `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`,
  getTrendingSeries: `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`,
  getTrendingMovie: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
  getLatestMovie: `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}&language=en-US`,
  getNowPlayingMovies: `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`,
  getTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=3`,
  getUpcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  getPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=2`,
  getLatestTv: `https://api.themoviedb.org/3/tv/latest?api_key=${API_KEY}&language=en-US`,
  getTvOnAir: `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
  getAiringToday: `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=2`,
  getTopRatedTv: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
  getPopularTv: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
};

export const requestSimilar = (type, id) => {
  const getSimilar = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
  return getSimilar;
};

export const requestCast = (type, id) => {
  const getCast = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`;
  return getCast;
};

export const requestSpecific = (type, id) => {
  const getSpecifics = `
  https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
  return getSpecifics;
};

export const requestEpisodes = (id, number) => {
  const getEpisodes = `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&language=en-US`;
  return getEpisodes;
};
