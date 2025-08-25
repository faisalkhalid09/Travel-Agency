'use client'

import { useState } from 'react'
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { SparklesIcon, GiftIcon, NewspaperIcon } from '@heroicons/react/24/solid'
import Button from '@/components/ui/Button'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState('')
  const { ref, isVisible } = useScrollAnimation(0.1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    setError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubscribed(true)
    setEmail('')
  }

  const features = [
    {
      icon: GiftIcon,
      title: 'Exclusive Deals',
      description: 'Get early access to special offers and discounts up to 30% off'
    },
    {
      icon: NewspaperIcon,
      title: 'Travel Guides',
      description: 'Receive expert travel tips and destination guides every week'
    },
    {
      icon: SparklesIcon,
      title: 'Insider Access',
      description: 'Be the first to know about new destinations and travel experiences'
    }
  ]

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-sunset-orange-500 via-ocean-blue-500 to-jungle-green-500" ref={ref}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="animate-scale-in">
              <CheckCircleIcon className="h-16 w-16 text-white mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome to the Adventure Club! 🎉
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Thank you for subscribing! Check your inbox for a special welcome offer and start exploring amazing destinations.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <p className="text-white/90 text-sm">
                  <strong>What's next?</strong> Look out for our weekly newsletter packed with travel inspiration, 
                  exclusive deals, and insider tips from our travel experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-500 via-blue-500 to-green-500 relative overflow-hidden" ref={ref}>
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-float hidden lg:block" />
      <div className="absolute top-32 right-20 w-6 h-6 bg-white/10 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/30 rounded-full animate-bounce hidden lg:block" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 right-32 w-5 h-5 bg-white/15 rounded-full animate-float hidden lg:block" style={{ animationDelay: '3s' }} />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className={`mx-auto max-w-2xl text-center transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Join the Adventure Club
          </h2>
          <p className="mt-6 text-xl leading-8 text-white">
            Get exclusive travel deals, expert tips, and destination inspiration delivered to your inbox every week.
          </p>
        </div>

        {/* Features */}
        <div className={`mx-auto mt-12 max-w-4xl transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className={`text-center transition-all duration-500 ${
                  isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-white">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Form */}
        <div className={`mx-auto mt-16 max-w-2xl transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border-0 bg-white/20 backdrop-blur-sm px-6 py-4 text-white placeholder:text-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                />
                {error && (
                  <div className="flex items-center gap-2 mt-2 text-red-200 text-sm">
                    <ExclamationCircleIcon className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-sunset-orange-600 hover:bg-gray-50 focus:ring-white/50 px-8 py-4 font-semibold btn-enhanced"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sunset-orange-600 mr-2" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe Now
                    <PaperAirplaneIcon className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-white">
                Join <strong>50,000+</strong> travelers already subscribed. 
                Unsubscribe anytime with one click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
