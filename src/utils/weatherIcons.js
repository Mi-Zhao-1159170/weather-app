import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiStrongWind,
} from "react-icons/wi"

export function getWeatherIcon(main) {
  const key = (main || "").toLowerCase()

  switch (key) {
    case "clear":
      return WiDaySunny
    case "clouds":
      return WiCloudy
    case "rain":
      return WiRain
    case "drizzle":
      return WiShowers
    case "thunderstorm":
      return WiThunderstorm
    case "snow":
      return WiSnow
    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "ash":
      return WiFog
    case "squall":
    case "tornado":
      return WiStrongWind
    default:
      return WiCloud
  }
}