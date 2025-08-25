'use client'

import { SparklesIcon, ClockIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'

const PromoBanner = () => {
  return (
    <div className="py-4" style={{ backgroundColor: '#f97316' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3" style={{ color: 'white' }}>
            <SparklesIcon className="h-6 w-6" style={{ color: 'white' }} />
            <div>
              <span className="text-lg font-bold" style={{ color: 'white' }}>Limited Time Offer!</span>
              <span className="ml-2 text-sm" style={{ color: 'white', opacity: '0.9' }}>Save up to 25% on early bird bookings</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2" style={{ color: 'white' }}>
              <ClockIcon className="h-5 w-5" style={{ color: 'white' }} />
              <span className="text-sm font-medium" style={{ color: 'white' }}>Offer ends in 7 days</span>
            </div>
            <button
              className="px-4 py-2 text-sm font-semibold border border-white bg-transparent transition-all duration-200 hover:bg-white rounded-full"
              style={{
                color: 'white',
                borderColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'white'
                e.target.style.color = '#f97316'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = 'white'
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoBanner
