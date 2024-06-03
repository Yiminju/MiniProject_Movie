// 필요한 라이브러리 및 스타일 파일 임포트
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

// MovieCard 컴포넌트 정의
const MovieCard = ({ poster, title, rating }) => {
  return (
    // Link 컴포넌트를 사용하여 클릭 시 "/details" 경로로 이동
      <Link className='cardBox' to={`/details`}>
        <div className="movie-card">
          {/* 영화 포스터 이미지 */}
          <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title} className="movie-poster" />
          {/* 영화 제목 */}
          <h3>{title}</h3>
          {/* 영화 평점 */}
          <p>Rating: {rating}</p>
        </div>
      </Link>
  );
};

// MovieCard 컴포넌트 내보내기
export default MovieCard;