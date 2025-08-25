'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

const heroSlides = [
  {
    id: 1,
    image: '/images/hero/bali-hero.jpg',
    title: 'Discover Paradise in Bali',
    subtitle: 'Temple adventures, volcano hikes & pristine beaches',
    description: 'Experience the perfect blend of culture, adventure, and relaxation in Indonesia\'s most magical island.',
    price: 'From $1,299',
    cta: 'Explore Bali',
    link: '/packages/1'
  },
  {
    id: 2,
    image: '/images/hero/morocco-hero.jpg',
    title: 'Morocco Desert Expedition',
    subtitle: 'Camel treks, ancient cities & starlit camps',
    description: 'Journey through imperial cities and experience the magic of the Sahara Desert with luxury camping.',
    price: 'From $1,599',
    cta: 'Discover Morocco',
    link: '/packages/2'
  },
  {
    id: 3,
    image: '/images/hero/iceland-hero.jpg',
    title: 'Iceland Northern Lights',
    subtitle: 'Aurora hunting, glaciers & geothermal spas',
    description: 'Chase the magical Northern Lights while exploring Iceland\'s dramatic landscapes and natural wonders.',
    price: 'From $1,899',
    cta: 'See Iceland',
    link: '/packages/3'
  }
]

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions] = useState([
    'Bali, Indonesia', 'Morocco', 'Iceland', 'Japan', 'Thailand', 'Greece', 'Peru', 'Egypt'
  ])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSearching(false)
    
    // Redirect to packages with search query
    window.location.href = `/packages?search=${encodeURIComponent(searchQuery)}`
  }

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Slides */}
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
              }}
            />
            
            {/* Floating Elements for Visual Appeal */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-white/30 rounded-full animate-pulse hidden lg:block" />
            <div className="absolute top-40 right-40 w-2 h-2 bg-sunset-orange-400/50 rounded-full animate-bounce hidden lg:block" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-40 left-20 w-3 h-3 bg-ocean-blue-400/40 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: '2s' }} />
            
            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-4xl pb-32 sm:pb-40 lg:pb-48">
                  <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl transform transition-all duration-1000 delay-300">
                    {slide.title}
                  </h1>
                  <p className="mt-6 text-xl leading-8 text-gray-200 sm:text-2xl transform transition-all duration-1000 delay-500">
                    {slide.subtitle}
                  </p>
                  <p className="mt-4 text-lg leading-8 text-gray-300 transform transition-all duration-1000 delay-700">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="text-3xl font-bold text-sunset-orange-400">
                      {slide.price}
                    </div>
                    <div className="hidden sm:block h-8 w-px bg-gray-400" />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={slide.link}>
                        <Button size="lg" className="px-8 py-4 w-full sm:w-auto">
                          {slide.cta}
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto">
                        <PlayIcon className="h-5 w-5 mr-2" />
                        Watch Video
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Floating Search Bar */}
      <div className="absolute bottom-6 sm:bottom-12 lg:bottom-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white/95 backdrop-blur-lg p-4 sm:p-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="inline h-4 w-4 mr-1" />
                Destination
              </label>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(e.target.value.length > 0)
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200 transition-all duration-200"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(suggestion)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
                    >
                      <MapPinIcon className="inline h-4 w-4 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Dates
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travelers
              </label>
              <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200 transition-all duration-200">
                <option>1 Traveler</option>
                <option>2 Travelers</option>
                <option>3-4 Travelers</option>
                <option>5+ Travelers</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button 
                fullWidth 
                size="lg" 
                onClick={handleSearch}
                disabled={isSearching}
                className="relative overflow-hidden"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Search Adventures
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
