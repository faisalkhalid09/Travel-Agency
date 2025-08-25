'use client'

import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  ClockIcon, 
  StarIcon,
  PhoneIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const features = [
  {
    name: 'Expert Travel Planning',
    description: 'Our experienced travel consultants craft personalized itineraries based on your preferences and budget.',
    icon: GlobeAltIcon,
    colorClasses: 'bg-blue-500',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-600'
  },
  {
    name: '24/7 Customer Support',
    description: 'Round-the-clock assistance wherever you are in the world. We\'re always here when you need us.',
    icon: PhoneIcon,
    colorClasses: 'bg-orange-500',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-orange-600'
  },
  {
    name: 'Best Price Guarantee',
    description: 'Find a lower price? We\'ll match it and beat it by 5%. No hidden fees, just transparent pricing.',
    icon: CurrencyDollarIcon,
    colorClasses: 'bg-green-500',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-green-600'
  },
  {
    name: 'Secure Booking System',
    description: 'Your personal and payment information is protected with bank-level security and encryption.',
    icon: ShieldCheckIcon,
    colorClasses: 'bg-purple-500',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-purple-600'
  },
  {
    name: 'Flexible Cancellation',
    description: 'Life happens. Enjoy peace of mind with our flexible cancellation and rescheduling policies.',
    icon: ClockIcon,
    colorClasses: 'bg-indigo-500',
    gradientFrom: 'from-indigo-400',
    gradientTo: 'to-indigo-600'
  },
  {
    name: '5-Star Experience',
    description: 'Join thousands of satisfied travelers who rate us 5 stars for exceptional service and unforgettable trips.',
    icon: StarIcon,
    colorClasses: 'bg-yellow-500',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-yellow-600'
  }
]

const WhyChooseUs = () => {
  const { ref, isVisible } = useScrollAnimation(0.1)
  
  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Why Choose WanderlustTravel?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We're committed to making your travel dreams a reality with exceptional service, unbeatable value, and unforgettable experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className={`mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className={`group relative transition-all duration-500 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-8 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 transition-all duration-300 hover:shadow-xl card-hover">
                  {/* Icon */}
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} text-white mb-6 group-hover:scale-110 transition-transform duration-300 hover-glow`}>
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold leading-7 text-gray-900 mb-3 group-hover:text-sunset-orange-600 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 leading-7">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sunset-orange-500/5 via-ocean-blue-500/5 to-jungle-green-500/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className={`mt-24 bg-gradient-to-r from-sunset-orange-50 via-ocean-blue-50 to-jungle-green-50 rounded-3xl p-8 lg:p-12 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-sunset-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Happy Travelers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-ocean-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                150+
              </div>
              <div className="text-gray-600 font-medium">Destinations</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-jungle-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                4.9★
              </div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
