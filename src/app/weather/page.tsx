'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CloudIcon,
  SunIcon
} from '@heroicons/react/24/outline'
import Card from '@/components/ui/Card'
import weatherData from '@/data/weather.json'

const WeatherPage = () => {
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  // Ensure weatherData is an array
  const locations = Array.isArray(weatherData) ? weatherData : []
  
  // Filter locations based on search
  const filteredLocations = locations.filter(location =>
    location.city.toLowerCase().includes(searchLocation.toLowerCase()) ||
    location.country.toLowerCase().includes(searchLocation.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredLocations.length > 0) {
      setSelectedLocation(filteredLocations[0].city)
    }
  }

  const selectedWeather = locations.find(w => w.city === selectedLocation)
  const featuredLocations = locations.slice(0, 6)

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <SunIcon className="h-12 w-12 text-yellow-500" />
      case 'cloudy':
      case 'overcast':
        return <CloudIcon className="h-12 w-12 text-gray-500" />
      case 'rainy':
        return <CloudIcon className="h-12 w-12 text-blue-500" />
      default:
        return <SunIcon className="h-12 w-12 text-yellow-500" />
    }
  }

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-500'
    if (temp >= 20) return 'text-orange-500'
    if (temp >= 10) return 'text-green-500'
    return 'text-blue-500'
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #ff7849 0%, #ff9a56 25%, #ffb366 50%, #ff8c42 75%, #ff6b35 100%)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
            Travel Weather
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Check current weather conditions and forecasts for your dream destinations
          </p>

          {/* Weather Search */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destination..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          </form>

          {/* Search Results */}
          {searchLocation && filteredLocations.length > 0 && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
                {filteredLocations.slice(0, 3).map((location) => (
                  <button
                    key={`${location.city}-${location.country}`}
                    onClick={() => {
                      setSelectedLocation(location.city)
                      setSearchLocation('')
                    }}
                    className="w-full p-3 text-left hover:bg-white/10 transition-colors text-white flex items-center gap-3"
                  >
                    <MapPinIcon className="h-4 w-4" />
                    <span>{location.city}, {location.country}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Selected Location Weather */}
        {selectedWeather && (
          <div className="mb-16">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedWeather.city}, {selectedWeather.country}
                </h2>
                <p className="text-gray-600">Current Weather Conditions</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Current Weather */}
                <div className="lg:col-span-1">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      {getWeatherIcon(selectedWeather.current.condition)}
                    </div>
                    <div className={`text-6xl font-bold mb-2 ${getTemperatureColor(selectedWeather.current.temperature)}`}>
                      {selectedWeather.current.temperature}°C
                    </div>
                    <div className="text-xl text-gray-700 mb-4 capitalize">
                      {selectedWeather.current.condition}
                    </div>
                    <div className="text-sm text-gray-600">
                      Feels like {selectedWeather.current.feelsLike}°C
                    </div>
                  </div>
                </div>

                {/* Weather Details */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Humidity</span>
                      <span className="font-medium">{selectedWeather.current.humidity}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wind Speed</span>
                      <span className="font-medium">{selectedWeather.current.windSpeed} km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Visibility</span>
                      <span className="font-medium">{selectedWeather.current.visibility} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">UV Index</span>
                      <span className="font-medium">{selectedWeather.current.uvIndex}</span>
                    </div>
                  </div>
                </div>

                {/* Best Time to Visit */}
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Time to Visit</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-800 mb-1">Peak Season</div>
                      <div className="text-sm text-green-700">{selectedWeather.bestTime.peak}</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-800 mb-1">Good Weather</div>
                      <div className="text-sm text-yellow-700">{selectedWeather.bestTime.good}</div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-800 mb-1">Off Season</div>
                      <div className="text-sm text-orange-700">{selectedWeather.bestTime.avoid}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">7-Day Forecast</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {selectedWeather.forecast.map((day, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-sm font-medium text-gray-900 mb-2">{day.day}</div>
                      <div className="mb-3 flex justify-center">
                        {getWeatherIcon(day.condition)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2 capitalize">{day.condition}</div>
                      <div className="space-y-1">
                        <div className={`font-bold ${getTemperatureColor(day.high)}`}>{day.high}°</div>
                        <div className="text-gray-500 text-sm">{day.low}°</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Featured Destinations Weather */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLocations.map((location) => (
              <Card 
                key={`${location.city}-${location.country}`}
                className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedLocation(location.city)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{location.city}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      {location.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getTemperatureColor(location.current.temperature)}`}>
                      {location.current.temperature}°C
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(location.current.condition)}
                    <span className="text-gray-700 capitalize">{location.current.condition}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Feels like {location.current.feelsLike}°C
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <div className="text-gray-500 mb-1">Humidity</div>
                    <div className="font-medium">{location.current.humidity}%</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Wind</div>
                    <div className="font-medium">{location.current.windSpeed} km/h</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">UV</div>
                    <div className="font-medium">{location.current.uvIndex}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600 mb-2">Best time to visit:</div>
                  <div className="text-sm font-medium text-green-700">
                    {location.bestTime.peak}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Weather Tips */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                Travel Weather Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <SunIcon className="h-8 w-8 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Check Temperature Range</h4>
                  <p className="text-sm text-blue-100">
                    Pack appropriate clothing for both day and night temperatures
                  </p>
                </div>
                <div className="text-center">
                  <CloudIcon className="h-8 w-8 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Consider Weather Patterns</h4>
                  <p className="text-sm text-blue-100">
                    Research seasonal weather patterns for your destination
                  </p>
                </div>
                <div className="text-center">
                  <CalendarDaysIcon className="h-8 w-8 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Plan Activities</h4>
                  <p className="text-sm text-blue-100">
                    Schedule outdoor activities based on weather forecasts
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default WeatherPage
