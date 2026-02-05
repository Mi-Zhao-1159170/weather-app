import { useEffect, useState } from 'react';
import {
    fetchForecastByCoords,
    fetchWeatherByCity,
    fetchWeatherByCoords
} from '../services/api';

import { getWeatherIcon } from "../utils/weatherIcons"


// Added isDark to props to support theme switching
function WeatherCard({ coords, city, isDark }) { // <--- KEY CHANGE: Added isDark

    const [weather, setWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getWeather = async () => {
            try {
                setLoading(true)
                setError(null)

                let data, forecastRaw

                if (city) {
                    data = await fetchWeatherByCity(city)
                    const { lat, lon } = data.coord
                    forecastRaw = await fetchForecastByCoords(lat, lon)
                } else if (coords.lat && coords.lon) {
                    data = await fetchWeatherByCoords(coords.lat, coords.lon)
                    forecastRaw = await fetchForecastByCoords(coords.lat, coords.lon)
                }

                if (data && forecastRaw) {
                    setWeather(data)
                    const filteredForecast = forecastRaw.list.filter(
                        (item) => item.dt_txt.includes("12:00:00")
                    )
                    setForecast(filteredForecast)
                }

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        getWeather()
    }, [coords, city])

    if (loading) return <p className="text-white text-center mt-10">Loading...</p>
    if (error) return <p className="text-red-400 text-center mt-10">Error: {error}</p>
    if (!weather) return null


    const CurrentIcon = getWeatherIcon(weather?.weather?.[0]?.main)

    return (
        <div className="space-y-8 w-full transition-all duration-700">
            {/* 1. CURRENT WEATHER CARD */}
            <div className={`
                backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl border transition-all duration-700
                ${isDark
                    ? 'bg-black/10 border-white/10'
                    : 'bg-white/30 border-white/20'
                }
            `}>
                {/* Location & Date */}
                <div className="text-center">
                    <h2 className={`
                        text-3xl md:text-4xl font-black tracking-tight transition-colors
                        ${isDark ? 'text-white' : 'text-slate-800/80'}
                    `}>
                        {weather.name}
                    </h2>
                    <p className={`
                        font-medium mt-2 opacity-80
                        ${isDark ? 'text-indigo-200' : 'text-gray-500'}
                    `}>
                        {new Date().toLocaleDateString([], {
                            weekday: 'long', month: 'long', day: 'numeric'
                        })}
                    </p>
                </div>

                {/* Main Weather Info */}
                <div className="flex flex-col items-center mt-8">
                    <CurrentIcon className="w-24 h-24 text-sky-500 drop-shadow" />

                    <div className="flex items-start">
                        <span className={`
                            text-8xl md:text-9xl font-black tracking-tighter transition-all
                            ${isDark ? 'text-white' : 'text-slate-800'}
                        `}>
                            {Math.round(weather.main.temp)}
                        </span>
                        <span className="text-3xl md:text-4xl font-bold text-blue-500 mt-6 ml-2">°C</span>
                    </div>
                    <p className={`
                        text-xl md:text-2xl font-bold capitalize mt-4
                        ${isDark ? 'text-blue-200' : 'text-gray-700'}
                    `}>
                        {weather.weather[0].description}
                    </p>
                </div>
            </div>

            {/* 2. 5-DAY FORECAST SECTION */}
            <div className="px-2">
                <h3 className={`
                    text-xl font-black ml-4 mb-6 tracking-widest uppercase
                    ${isDark ? 'text-white/80' : 'text-gray-800'}
                `}>
                    5-Day Forecast
                </h3>

                <ul className="grid gap-4 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
                    {forecast.map((day) => {
                        const DayIcon = getWeatherIcon(day?.weather?.[0]?.main)

                        return (
                            <li
                                key={day.dt}
                                className={`
          flex flex-col items-center justify-between transition-all duration-500 
          hover:scale-105 rounded-[2.5rem] border backdrop-blur-md
          p-6 shadow-lg aspect-[3/4] 
          ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/20 border-white/10'}
        `}
                            >
                                {/* Day of the Week */}
                                <p
                                    className={`
            text-xs font-black uppercase tracking-widest opacity-70
            ${isDark ? 'text-indigo-200' : 'text-gray-500'}
          `}
                                >
                                    {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
                                </p>

                                {/* Icon  */}
                                <DayIcon className="w-14 h-14 md:w-16 md:h-16 text-sky-500 drop-shadow" />

                                {/* Temperature */}
                                <div className="text-center">
                                    <p className="text-2xl font-black tracking-tighter">
                                        {Math.round(day.main.temp)}°
                                    </p>
                                    <p className="hidden sm:block text-[10px] font-bold opacity-50 uppercase mt-1">
                                        {day.weather[0].main}
                                    </p>
                                </div>
                            </li>
                        )
                    })}
                </ul>

            </div>
        </div>
    )
}

export default WeatherCard;