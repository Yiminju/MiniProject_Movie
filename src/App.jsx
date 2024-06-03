// 필요한 라이브러리 및 데이터 파일 임포트
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieCard from './MovieCard';
import MovieDetail from './MovieDetail';
import movieListData from './movieListData.json';
import './App.css';

// 메인 페이지 컴포넌트 정의
const MainPage = () => {
  // 영화 데이터를 상태로 관리
  const [movies, setMovies] = useState([]);

  // 컴포넌트가 마운트될 때 movieListData를 상태에 설정
  useEffect(() => {
    setMovies(movieListData.results);
  }, []);

  return (
    // 영화 목록을 렌더링하는 div
    <div className="movie-list">
      {/* movies 배열을 순회하며 각 영화에 대해 MovieCard 컴포넌트 생성 */}
      {movies.map((movie, index) => (
        <MovieCard
          key={index}
          poster={movie.poster_path}
          title={movie.title}
          rating={movie.vote_average}
        />
      ))}
    </div>
  );
};

// 전체 앱 컴포넌트 정의
const App = () => {
  return (
    // Router 설정
    <Router>
      <Routes>
        {/* 루트 경로에 대한 라우트 설정 */}
        <Route path="/" element={<MainPage />} />
        {/* /details 경로에 대한 라우트 설정 */}
        <Route path="/details" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
};

// App 컴포넌트 내보내기
export default App;
