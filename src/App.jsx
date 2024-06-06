import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import MovieCard from "./component/MovieCard";
import MovieDetail from "./component/MovieDetail";
import "./css/App.css";
import NavBar from "./component/NavBar";
import Signup from "./component/Signup";
import Login from "./component/Login";
import SearchPage from "./component/SearchPage";

// TMdb API 키를 환경변수로부터 가져옴
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 메인 페이지 컴포넌트
const MainPage = () => {
  // 영화 데이터를 상태로 관리
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // TMdb API를 호출하여 인기 영화를 가져옴
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              page: 1,
            },
          }
        );
        // 가져온 영화 데이터를 상태에 저장
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="movie-list">
        {/* movies 배열을 순회하며 각 영화에 대해 MovieCard 컴포넌트를 생성 */}
        {movies.map((movie, index) => (
          <MovieCard
            key={index}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
};

// 앱 컴포넌트
const App = () => {
  return (
    <>
      <Routes>
        {/* 루트 경로에 대한 라우트 설정 */}
        <Route path="/" element={<MainPage />} />
        {/* /details/:id 경로에 대한 라우트 설정 */}
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/navBar" element={<NavBar />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
