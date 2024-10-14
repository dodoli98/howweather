# How Weather
이 프로젝트는 사용자가 도시 이름을 입력하여 날씨 정보를 검색할 수 있는 간단한 날씨 애플리케이션입니다. OpenWeather API를 통해 날씨 데이터를 받아오며, 현재 시간, 온도, 날씨 설명을 화면에 표시합니다.

## 사용기술
React: 사용자 인터페이스 구축
Axios: API 요청을 위해 사용
SCSS: 스타일링을 위해 사용
OpenWeather API: 날씨 데이터를 제공하는 API

## 주요기술
날씨 데이터 가져오기 :
axios를 사용하여 OpenWeather API에서 선택한 도시의 날씨 데이터를 가져옵니다.

시간 업데이트 : 
useEffect와 setInterval을 사용하여 페이지에 현재 시간을 실시간으로 표시합니다.