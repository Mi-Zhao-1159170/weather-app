import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import SearchBox from './components/SearchBox'
import WeatherCard from './components/WeatherCard'

function App() {
  const [isDark, setIsDark] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? true : false;
  });

  useEffect (() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDardMode = () => {
    setIsDark(!isDark);
  }

  const [coords, setCoords] = useState({ lat: null, lon: null })
  const [city, setCity] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setCoords({ lat: latitude, lon: longitude })
      },
        (err) => {
          setError('Failed to get location. Please allow location access.')
          console.error(err)
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }, [])

  const handleSearch = (cityName) => {
    setCity(cityName)
  }

  return (
   
    <div className={`
      relative min-h-screen overflow-hidden transition-all duration-700
      ${isDark ? 'bg-[#020617]' : 'bg-blue-50'} 
    `}>
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {/* Day time video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          key="day-video" 
          className={`
            absolute inset-0 w-full h-full object-cover 
            transition-opacity duration-1000
            ${isDark ? 'opacity-0' : 'opacity-100'}
          `}
          src="/videos/background.mp4"
        />

        {/* Night time video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          key="night-video" 
          className={`
            absolute inset-0 w-full h-full object-cover 
            transition-opacity duration-1000
            ${isDark ? 'opacity-100' : 'opacity-0'}
          `}
          src="/videos/background_dark.mp4"
        />

        {/* OVERLAY */}
        <div className={`
          absolute inset-0 z-10 transition-all duration-1000
          ${isDark 
            ? 'bg-indigo-950/20' 
            : 'bg-black/10'
          }
        `}></div>
      </div>

      {/* CONTENT LAYER: Must be z-20 to stay on top */}
      <div className="relative z-20 min-h-screen"> 
        <Navbar isDark={isDark} onToggle={toggleDardMode} />
        
        <div className="max-w-4xl mx-auto px-4 mt-6">
          <SearchBox onSearch={handleSearch} />
          
          {error && (
            <div className={`
              mt-4 p-3 rounded-lg text-sm 
              ${isDark ? 'bg-red-900/30 text-red-200' : 'bg-red-100 text-red-600'}
            `}>
              {error}
            </div>
          )}
          
          <WeatherCard coords={coords} city={city} isDark={isDark}/>
        </div>
      </div>
    </div>
  )
}

export default App