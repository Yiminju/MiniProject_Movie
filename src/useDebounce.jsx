//  useDebounce 훅은 검색 요청에 일정 시간의 지연을 주어
//  사용자가 타이핑하는 동안 너무 많은 검색 요청을 보내는 것을 방지하는 데 사용됩니다.
//  이를 통해 네트워크 부하를 줄일 수 있습니다.

import { useState, useEffect } from "react";

// debounce delay를 적용하는 커스텀 훅
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 입력 값이 변경될 때마다 타이머를 재설정
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 이전 타이머를 해제하고 새 타이머를 설정
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
