'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { 
  StarIcon, 
  MapPinIcon, 
  CalendarDaysIcon, 
  ClockIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import packages from '@/data/packages.json'

const PackageDetailsPage = () => {
  const { id } = useParams()
  const packageId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string)
  const pkg = packages.find(p => p.id === packageId)
  
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([])
  const [travelers, setTravelers] = useState(2)
  const [selectedDate, setSelectedDate] = useState('')

  if (!pkg) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <Link href="/packages">
              <Button>Back to Packages</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  const toggleAddOn = (addOnIndex: number) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnIndex) 
        ? prev.filter(i => i !== addOnIndex)
        : [...prev, addOnIndex]
    )
  }

  const calculateTotal = () => {
    const basePrice = pkg.price * travelers
    const addOnPrice = selectedAddOns.reduce((sum, index) => 
      sum + (pkg.addOns[index]?.price || 0), 0
    )
    return basePrice + addOnPrice
  }

  return (
    <Layout>
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <Link href="/packages" className="inline-flex items-center text-sunset-orange-600 hover:text-sunset-orange-700">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Packages
          </Link>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="relative h-96 lg:h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                  pkg.category === 'luxury' ? 'bg-purple-500/80 text-white' :
                  pkg.category === 'adventure' ? 'bg-green-500/80 text-white' :
                  pkg.category === 'family' ? 'bg-blue-500/80 text-white' :
                  'bg-gray-500/80 text-white'
                }`}>
                  {pkg.category}
                </span>
                <div className="flex items-center gap-1">
                  <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">{pkg.rating}</span>
                  <span className="text-gray-200">({pkg.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">{pkg.title}</h1>
              <div className="flex items-center gap-2 text-lg">
                <MapPinIcon className="h-5 w-5" />
                <span>{pkg.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{pkg.description}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CalendarDaysIcon className="h-6 w-6 text-sunset-orange-500" />
                  <div>
                    <div className="font-medium text-gray-900">Duration</div>
                    <div className="text-gray-600">{pkg.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ClockIcon className="h-6 w-6 text-ocean-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Best Time</div>
                    <div className="text-gray-600">Year Round</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Highlights */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="h-5 w-5 text-jungle-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Itinerary */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map((day, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center text-white font-bold">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{day.title}</h3>
                      <ul className="space-y-1">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-sunset-orange-400 rounded-full mt-2 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Add-ons */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Optional Add-ons</h2>
              <div className="space-y-4">
                {pkg.addOns.map((addOn, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                      selectedAddOns.includes(index) 
                        ? 'border-sunset-orange-300 bg-sunset-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleAddOn(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{addOn.name}</div>
                        <div className="text-sm text-gray-600">{addOn.description}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-sunset-orange-600">
                          +${addOn.price}
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedAddOns.includes(index)
                            ? 'border-sunset-orange-500 bg-sunset-orange-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAddOns.includes(index) && (
                            <CheckIcon className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${pkg.price}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                  >
                    <option value="">Choose a date</option>
                    {pkg.availableDates.map((date, index) => (
                      <option key={index} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travelers */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="text-xl font-medium w-12 text-center">{travelers}</span>
                    <button
                      onClick={() => setTravelers(travelers + 1)}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Package (×{travelers})</span>
                      <span>${pkg.price * travelers}</span>
                    </div>
                    {selectedAddOns.map(index => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{pkg.addOns[index].name}</span>
                        <span>${pkg.addOns[index].price}</span>
                      </div>
                    ))}
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-sunset-orange-600">${calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Book Now Button */}
                <Link href={`/booking?package=${pkg.id}&travelers=${travelers}&date=${selectedDate}&addons=${selectedAddOns.join(',')}`}>
                  <Button 
                    fullWidth 
                    size="lg" 
                    disabled={!selectedDate}
                    className="mb-4"
                  >
                    Book Now
                  </Button>
                </Link>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Free cancellation up to 24 hours before departure
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PackageDetailsPage
