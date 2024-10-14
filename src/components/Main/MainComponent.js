import { useState, useEffect } from "react";
import styles from "./MainComponent.module.css";
import axios from "axios";

export default function MainComponent() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");
    const [currentTime, setCurrentTime] = useState("");

    const API_KEY = "005c59426d0d586111de8cf5ad7c9264";

    const getWeatherData = () => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        axios
            .get(url)
            .then((response) => {
                const data = response.data;
                setWeatherData({
                    temp: data.main.temp,
                    desc: data.weather[0].description,
                    icon: data.weather[0].icon,
                });
                setError("");
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch weather data.");
            });
    };

    // 실시간 시간 업데이트를 위한 useEffect
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, "0");
            const minutes = String(now.getMinutes()).padStart(2, "0");
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime(); // 초기 시간을 설정
        const intervalId = setInterval(updateTime, 60000); // 매 1분마다 시간 업데이트

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    return (
        <main>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Search for a city in English"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={getWeatherData}>🔎</button>
            </div>

            {/* Error 메시지 표시 */}
            {error && <p className={styles.error}>{error}</p>}


            <div className={styles.weatherInfo}>
                <div className={styles.currentTime}>
                    Current Time: {currentTime}
                </div>
                {/* 날씨 데이터가 있을 때만 렌더링 */}
                {weatherData && (
                    <>
                        <div className={styles.weatherEmoji}>
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                                alt={weatherData.desc}
                            />
                        </div>
                        <div className={styles.temperature}>
                            {weatherData.temp}°C
                        </div>
                        <div className={styles.uvIndex}>
                            Weather: {weatherData.desc}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
