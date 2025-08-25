'use client'

import { useState } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { MagnifyingGlassIcon, FunnelIcon, StarIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import packages from '@/data/packages.json'

const PackagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('popular')

  // Filter packages based on search and filters
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory
    
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'budget' && pkg.price < 1500) ||
                        (priceRange === 'mid' && pkg.price >= 1500 && pkg.price <= 2000) ||
                        (priceRange === 'luxury' && pkg.price > 2000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  // Sort packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'popular':
      default:
        return b.reviewCount - a.reviewCount
    }
  })

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24" style={{ background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Travel Packages
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Discover amazing destinations and create unforgettable memories with our carefully crafted travel experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-0 z-40 bg-white shadow-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="adventure">Adventure</option>
                <option value="luxury">Luxury</option>
                <option value="family">Family</option>
                <option value="cultural">Cultural</option>
              </select>

              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
              >
                <option value="all">All Prices</option>
                <option value="budget">Under $1,500</option>
                <option value="mid">$1,500 - $2,000</option>
                <option value="luxury">Over $2,000</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedPackages.length} of {packages.length} packages
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {sortedPackages.length === 0 ? (
            <div className="text-center py-16">
              <FunnelIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No packages found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPackages.map((pkg) => (
                <Card key={pkg.id} className="group hover:shadow-2xl transition-all duration-300">
                  {/* Package Image */}
                  <div className="relative overflow-hidden rounded-t-xl h-64">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-sunset-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${pkg.price}
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
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
                        <StarIcon className="h-4 w-4" />
                        <span>{pkg.reviewCount} reviews</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href={`/packages/${pkg.id}`}>
                      <Button fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default PackagesPage
