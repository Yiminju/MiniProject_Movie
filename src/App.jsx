// 필요한 라이브러리 및 데이터 파일 임포트
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import "./App.css";
import NavBar from "./NavBar";
import Signup from "./Signup";
import Login from "./Login";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
  );
};

const App = () => {
  return (
    <>
      {/* NavBar 컴포넌트를 추가 */}
      <NavBar />
      <Routes>
        {/* 루트 경로에 대한 라우트 설정 */}
        <Route path="/" element={<MainPage />} />
        {/* /details/:id 경로에 대한 라우트 설정 */}
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
