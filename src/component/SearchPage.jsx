import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../css/SearchPage.css";
import NavBar from "./NavBar";

// TMdb API 키를 환경변수로부터 가져옴
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (searchTerm) {
          // 검색어가 있는 경우에만 요청
          const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
              params: {
                api_key: API_KEY,
                language: "en-US",
                page: 1,
                query: searchTerm,
              },
            }
          );
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <>
      <NavBar />
      <div className="search-page">
        <h2>Search Results for {searchTerm}</h2>
        <div className="movie-list">
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
    </>
  );
};

export default SearchPage;
