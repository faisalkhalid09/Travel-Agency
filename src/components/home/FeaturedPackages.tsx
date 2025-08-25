'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StarIcon, MapPinIcon, CalendarDaysIcon, UsersIcon, HeartIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ArrowRightIcon, HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import packages from '@/data/packages.json'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const FeaturedPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [filter, setFilter] = useState('all')
  const { ref, isVisible } = useScrollAnimation(0.1)
  
  // Get first 6 packages as featured
  const allPackages = packages.slice(0, 6)
  const featuredPackages = filter === 'all' 
    ? allPackages
    : allPackages.filter(pkg => pkg.category === filter)
  
  const toggleFavorite = (packageId: number) => {
    setFavorites(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    )
  }
  
  const categories = ['all', 'adventure', 'luxury', 'family']
  const categoryLabels = {
    all: 'All Packages',
    adventure: 'Adventure',
    luxury: 'Luxury',
    family: 'Family'
  }

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Featured Travel Packages
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover our most popular destinations and create unforgettable memories with expertly crafted travel experiences.
          </p>
        </div>
        
        {/* Filter Tabs */}
        <div className={`flex justify-center mt-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex rounded-full bg-white p-1 shadow-lg border border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 min-w-[100px] ${
                  filter === category
                    ? 'bg-gradient-to-r from-sunset-orange-400 to-sunset-orange-500 text-black shadow-md transform scale-105 border-2 border-sunset-orange-300'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className={`mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {featuredPackages.map((pkg, index) => (
            <Card key={pkg.id} className={`group card-hover transition-all duration-500 ${
              isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
            }`} style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Package Image */}
              <div className="relative overflow-hidden rounded-t-xl h-64">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <button
                    onClick={() => toggleFavorite(pkg.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                      favorites.includes(pkg.id)
                        ? 'bg-red-500 text-white animate-heartbeat'
                        : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    {favorites.includes(pkg.id) ? (
                      <HeartIcon className="h-4 w-4" />
                    ) : (
                      <HeartOutlineIcon className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-ocean-blue-50 hover:text-ocean-blue-600 transition-all duration-300"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-sunset-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover-scale">
                  ${pkg.price}
                </div>
                
                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <StarIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium">{pkg.rating}</span>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    pkg.category === 'luxury' ? 'bg-purple-100 text-purple-800' :
                    pkg.category === 'adventure' ? 'bg-green-100 text-green-800' :
                    pkg.category === 'family' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {pkg.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sunset-orange-600 transition-colors">
                  {pkg.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-600 mb-3">
                  <MapPinIcon className="h-4 w-4" />
                  <span className="text-sm">{pkg.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {pkg.description}
                </p>

                {/* Package Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UsersIcon className="h-4 w-4" />
                    <span>{pkg.reviewCount} reviews</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Highlights:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.highlights.slice(0, 2).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-sunset-orange-500 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="flex gap-3">
                  <Link href={`/packages/${pkg.id}`} className="flex-1">
                    <Button fullWidth className="group/btn btn-enhanced hover-glow">
                      View Details
                      <ArrowRightIcon className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Link href="/packages">
            <Button variant="outline" size="lg" className="px-8 btn-enhanced hover-lift">
              View All Packages
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
        
        {/* Quick Preview Modal */}
        {selectedPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPackage(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              
              {/* Modal Content */}
              <div className="relative h-64 rounded-t-2xl overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{selectedPackage.title}</h3>
                  <p className="text-lg opacity-90">{selectedPackage.location}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">{selectedPackage.rating}</span>
                    <span className="text-gray-500">({selectedPackage.reviewCount} reviews)</span>
                  </div>
                  <div className="text-2xl font-bold text-sunset-orange-500">
                    ${selectedPackage.price}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{selectedPackage.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{selectedPackage.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">{selectedPackage.reviewCount} reviews</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Package Highlights</h4>
                  <ul className="space-y-2">
                    {selectedPackage.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-sunset-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Link href={`/packages/${selectedPackage.id}`} className="flex-1">
                    <Button fullWidth className="btn-enhanced">
                      View Full Details
                    </Button>
                  </Link>
                  <Link href="/booking">
                    <Button variant="outline" className="btn-enhanced">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedPackages
