import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/MovieDetail.css";
import NavBar from "./NavBar";

// 환경변수로부터 TMdb API 키를 가져옴
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  // URL 파라미터에서 영화 ID를 가져옴
  const { id } = useParams();
  // 영화 상세 정보를 상태로 관리
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // TMdb API를 호출하여 영화 상세 정보를 가져옴
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );
        // 가져온 영화 데이터를 상태에 저장
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  // 영화 데이터가 로드되지 않았을 때 로딩 메시지 표시
  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="movie-detail">
        {/* 영화 배경 이미지 */}
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={movie.title}
          className="movie-backdrop"
        />
        <div className="movie-info">
          {/* 영화 포스터 이미지 */}
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
            className="movie-poster"
          />
          {/* 영화 제목 */}
          <h2>{movie.title}</h2>
          {/* 영화 평점 */}
          <p>Rating: {movie.vote_average}</p>
          {/* 영화 장르 */}
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          {/* 영화 줄거리 */}
          <p>{movie.overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
