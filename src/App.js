import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { requests } from "./Api/Requests";
import HomePage from "./Pages/HomePage/HomePage";
import MoviesPage from "./Pages/MoviesPage/MoviesPage";
import TvPage from "./Pages/TvPage/TvPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import Header from "./Components/Header/Header";
import "./Styles/index.css";
import Loading from "./Components/Loading/Loading";
import TrailerPage from "./Pages/TrailerPage/TrailerPage";
import SeeAllPage from "./Pages/SeeAllPage/SeeAllPage";
import ScrollToTop from "./Helpers/ScrollToTop";

function App() {
  const { data: genreMovieList, isLoading: isLoadingMovies } = useQuery(
    "genreMovieList",
    () => axios(requests.getMovieList),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: genreTvList, isLoading: isLoadingTv } = useQuery(
    "genreTvList",
    () => axios(requests.getTvList),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoadingMovies && isLoadingTv) {
    return (
      <div className="loading-container">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <Router>
        <div className="App">
          <ScrollToTop />
          <Header />
          {!isLoadingTv && !isLoadingMovies && (
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <HomePage
                    genreMovie={genreMovieList.data.genres}
                    genreTv={genreTvList.data.genres}
                  />
                }
              />
              <Route
                path="/movies"
                element={
                  <MoviesPage
                    genreMovie={genreMovieList.data.genres}
                    genreTv={genreTvList.data.genres}
                  />
                }
              />
              <Route
                path="/tv"
                element={
                  <TvPage
                    genreMovie={genreMovieList.data.genres}
                    genreTv={genreTvList.data.genres}
                  />
                }
              />
              <Route
                path="/detail"
                element={
                  <DetailPage
                    genreMovie={genreMovieList.data.genres}
                    genreTv={genreTvList.data.genres}
                  />
                }
              />
              <Route path="/trailer" element={<TrailerPage />} />
              <Route
                path="/seeAll"
                element={
                  <SeeAllPage
                    genreMovie={genreMovieList.data.genres}
                    genreTv={genreTvList.data.genres}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
