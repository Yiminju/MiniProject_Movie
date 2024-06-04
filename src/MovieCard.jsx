import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ id, poster, title, rating }) => {
  return (
    // Link 컴포넌트를 사용하여 클릭 시 "/details/:id" 경로로 이동
    <Link className="cardBox" to={`/details/${id}`}>
      <div className="movie-card">
        {/* 영화 포스터 이미지 */}
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          alt={title}
          className="movie-poster"
        />
        <div className="movie-details">
          {/* 영화 제목 */}
          <h3>{title}</h3>
          {/* 영화 평점 */}
          <p>Rating: {rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
