'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleBottomCenterTextIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import reviews from '@/data/reviews.json'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { ref, isVisible } = useScrollAnimation(0.1)
  
  // Get first 6 reviews as featured testimonials
  const testimonials = reviews.slice(0, 6)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isVisible, testimonials.length])
  
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
    setIsAutoPlaying(false)
  }
  
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-sunset-orange-50 via-ocean-blue-50 to-jungle-green-50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What Our Travelers Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Don't just take our word for it. Here's what thousands of satisfied travelers have to say about their experiences with WanderlustTravel.
          </p>
        </div>

        {/* Featured Testimonial Carousel */}
        <div className={`mx-auto mt-16 max-w-4xl transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative">
            {/* Auto-play control */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={toggleAutoPlay}
                className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 transition-colors shadow-lg"
                aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
              >
                {isAutoPlaying ? (
                  <PauseIcon className="h-4 w-4" />
                ) : (
                  <PlayIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            {/* Main Testimonial */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl card-hover">
              <div className="relative">
                {/* Quote Icon */}
                <ChatBubbleBottomCenterTextIcon className="absolute -top-4 -left-2 h-8 w-8 text-sunset-orange-300 animate-float" />
                
                {/* Stars */}
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < testimonials[currentTestimonial].rating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {testimonials[currentTestimonial].rating}/5
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="text-xl leading-8 text-gray-900 mb-8 transition-all duration-500">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>

                {/* Reviewer Info */}
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-gradient-to-br from-sunset-orange-400 to-ocean-blue-500 rounded-full flex items-center justify-center hover-scale">
                    <span className="text-white font-bold text-lg">
                      {testimonials[currentTestimonial].customerName.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].customerName}
                    </div>
                    <div className="text-sm text-gray-600">
                      Verified Traveler • {testimonials[currentTestimonial].date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 hover-lift hover-glow"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 z-10 hover-lift hover-glow"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial 
                    ? 'bg-sunset-orange-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className={`mx-auto mt-20 max-w-6xl transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-6 shadow-lg card-hover transition-all duration-500 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < testimonial.rating 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.comment.length > 120 
                    ? testimonial.comment.substring(0, 120) + '...' 
                    : testimonial.comment}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="h-8 w-8 bg-gradient-to-br from-sunset-orange-400 to-ocean-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {testimonial.customerName.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900 text-sm">
                      {testimonial.customerName}
                    </div>
                    <div className="text-xs text-gray-500">
                      Verified Traveler
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`mx-auto mt-16 max-w-2xl text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Own Adventure?
          </h3>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied travelers and start planning your dream vacation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 btn-enhanced hover-glow">
              Start Planning
            </Button>
            <Button variant="outline" size="lg" className="px-8 btn-enhanced hover-lift">
              View All Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
