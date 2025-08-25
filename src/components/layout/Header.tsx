'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bars3Icon, 
  XMarkIcon, 
  GlobeAltIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  MapPinIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Packages', href: '/packages' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Blog', href: '/blog' },
  { name: 'Weather', href: '/weather' },
  { name: 'Contact', href: '/contact' },
]

const megaMenuPackages = [
  {
    category: 'Popular Destinations',
    items: [
      { name: 'Bali Paradise', href: '/packages/1', description: 'Tropical beaches & temples' },
      { name: 'Morocco Desert', href: '/packages/2', description: 'Sahara adventures' },
      { name: 'Iceland Northern Lights', href: '/packages/3', description: 'Aurora & glaciers' },
      { name: 'Japan Journey', href: '/packages/4', description: 'Culture & cherry blossoms' }
    ]
  },
  {
    category: 'Trip Types',
    items: [
      { name: 'Adventure Tours', href: '/packages?category=adventure', description: 'For thrill seekers' },
      { name: 'Luxury Escapes', href: '/packages?category=luxury', description: 'Premium experiences' },
      { name: 'Family Vacations', href: '/packages?category=family', description: 'Fun for all ages' },
      { name: 'Romantic Getaways', href: '/packages?category=romantic', description: 'Perfect for couples' }
    ]
  }
]

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showPackagesMega, setShowPackagesMega] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/packages?search=${encodeURIComponent(searchQuery)}`
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-lg border-b-4 border-sunset-orange-500'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 lg:py-6" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <GlobeAltIcon className="h-8 w-8 text-sunset-orange-500" />
            <span className="font-bold text-xl text-gray-900">WanderlustTravel</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link 
            href="/" 
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-sunset-orange-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-sunset-orange-50"
          >
            Home
          </Link>
          
          {/* Packages Mega Menu */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowPackagesMega(true)}
              onMouseLeave={() => setShowPackagesMega(false)}
              className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-sunset-orange-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-sunset-orange-50"
            >
              Packages
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                showPackagesMega ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Mega Menu Dropdown */}
            {showPackagesMega && (
              <div 
                className="absolute left-0 top-full pt-2 z-50"
                onMouseEnter={() => setShowPackagesMega(true)}
                onMouseLeave={() => setShowPackagesMega(false)}
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-[600px]">
                  <div className="grid grid-cols-2 gap-8">
                    {megaMenuPackages.map((section) => (
                      <div key={section.category}>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                          {section.category}
                        </h3>
                        <ul className="space-y-3">
                          {section.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-sunset-orange-50 hover:to-ocean-blue-50 transition-all duration-200 group"
                              >
                                <div className="font-medium text-gray-900 group-hover:text-sunset-orange-600 text-sm">
                                  {item.name}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {item.description}
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* Featured Package CTA */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="bg-gradient-to-r from-sunset-orange-500 to-ocean-blue-500 rounded-xl p-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">Special Offer</h4>
                          <p className="text-xs opacity-90">Save up to 25% on early bookings</p>
                        </div>
                        <Link href="/packages" className="bg-white text-sunset-orange-600 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 transition-colors">
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {navigation.slice(2).map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-sunset-orange-600 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-sunset-orange-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-4">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 hover:text-sunset-orange-600" />
          </button>
          
          {/* Search Dropdown */}
          {showSearch && (
            <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-sunset-orange-500 text-white rounded-lg hover:bg-sunset-orange-600 transition-colors"
                >
                  <MagnifyingGlassIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Try: "Bali", "Morocco", "Iceland", "Japan"
              </div>
            </div>
          )}
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="h-8 w-8 bg-gradient-to-br from-sunset-orange-400 to-ocean-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {user?.firstName.charAt(0)}
                    </span>
                  </div>
                  <span>Welcome, {user?.firstName}!</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-sunset-orange-600 transition-colors duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Logout
                </button>
              </div>
              <Link 
                href="/booking" 
                className="gradient-sunset text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200"
              >
                Book Now
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-sunset-orange-600 transition-colors duration-200"
              >
                Log in
              </Link>
              <Link 
                href="/booking" 
                className="gradient-sunset text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200"
              >
                Book Now
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <GlobeAltIcon className="h-8 w-8 text-sunset-orange-500" />
                <span className="font-bold text-xl text-gray-900">WanderlustTravel</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  {isAuthenticated ? (
                    <>
                      <div className="-mx-3 px-3 py-2.5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-sunset-orange-400 to-ocean-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {user?.firstName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Welcome, {user?.firstName}!</div>
                            <div className="text-sm text-gray-600">{user?.email}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            logout()
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center gap-2 text-base font-semibold text-gray-900 hover:text-sunset-orange-600"
                        >
                          <ArrowRightOnRectangleIcon className="h-5 w-5" />
                          Logout
                        </button>
                      </div>
                      <Link 
                        href="/booking" 
                        className="gradient-sunset text-white px-6 py-3 rounded-full text-base font-semibold block text-center hover:shadow-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Book Now
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link 
                        href="/booking" 
                        className="gradient-sunset text-white px-6 py-3 rounded-full text-base font-semibold block text-center hover:shadow-lg transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Book Now
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
