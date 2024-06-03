// 필요한 라이브러리 및 데이터 파일 임포트
import React, { useState, useEffect } from 'react';
import movieDetailData from './movieDetailData.json';
import './MovieDetail.css';

// MovieDetail 컴포넌트 정의
const MovieDetail = () => {
  // 영화 상세 정보를 상태로 관리
  const [movie, setMovie] = useState(movieDetailData);

  // 영화 데이터가 로드되지 않았을 때 로딩 메시지 표시
  if (!movie) return <div>Loading...</div>;

  return (
    // 영화 상세 정보를 렌더링하는 div
    <div className="movie-detail">
      {/* 영화 배경 이미지 */}
      <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt={movie.title} className="movie-backdrop" />
      {/* 영화 정보를 포함하는 div */}
      <div className="movie-info">
        {/* 영화 포스터 이미지 */}
        <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} className="movie-poster" />
        {/* 영화 제목 */}
        <h2>{movie.title}</h2>
        {/* 영화 평점 */}
        <p>Rating: {movie.vote_average}</p>
        {/* 영화 장르 */}
        <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
        {/* 영화 줄거리 */}
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

// MovieDetail 컴포넌트 내보내기
export default MovieDetail;