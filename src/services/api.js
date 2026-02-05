const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const UNITS = 'metric';

export const fetchWeatherByCity = async (city) => {
    const response = await fetch (`${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=${UNITS}`);
    const data = await response.json();
    return data;
}

export const fetchWeatherByCoords = async (lat, lon) => {
    const response = await fetch (`${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`);
    const data = await response.json();
    return data;
}


export const fetchForecastByCoords = async (lat, lon) => {
    const response = await await fetch(`${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`);

    if (!response.ok) {
        throw new Error('Failed to fetch 7-day forecast')
    }

    const data = await response.json()
    return data
}
