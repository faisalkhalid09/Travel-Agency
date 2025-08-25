import Link from 'next/link'
import { GlobeAltIcon, ShieldCheckIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

const footerNavigation = {
  destinations: [
    { name: 'Bali Paradise', href: '/packages/1', description: 'Tropical beaches & temples' },
    { name: 'Morocco Desert', href: '/packages/2', description: 'Sahara adventures' },
    { name: 'Iceland Adventure', href: '/packages/3', description: 'Northern lights & glaciers' },
    { name: 'Japan Journey', href: '/packages/4', description: 'Culture & cherry blossoms' },
  ],
  quickLinks: [
    { name: 'Book Now', href: '/booking', highlight: true },
    { name: 'Travel Packages', href: '/packages' },
    { name: 'Travel Blog', href: '/blog' },
    { name: 'Weather Info', href: '/weather' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
  ],
  support: [
    { name: '24/7 Support', href: '/support', icon: PhoneIcon },
    { name: 'Travel Insurance', href: '/insurance', icon: ShieldCheckIcon },
    { name: 'Travel Advisories', href: '/travel-advisories' },
    { name: 'Passport Info', href: '/passport-info' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
  ],
}

const social = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.017 0C8.396 0 7.929.01 7.102.048 6.273.088 5.718.222 5.238.42a5.893 5.893 0 00-2.126 1.384 5.893 5.893 0 00-1.384 2.126C1.53 4.41 1.396 4.965 1.356 5.794.318 6.621.308 7.088.308 10.709s.01 4.088.048 4.915c.04.829.174 1.384.372 1.864.2.78.478 1.45.923 2.126a5.893 5.893 0 001.384 2.126c.676.445 1.346.723 2.126.923.48.198 1.035.332 1.864.372.827.04 1.294.05 4.915.05s4.088-.01 4.915-.05c.829-.04 1.384-.174 1.864-.372a5.893 5.893 0 002.126-1.384 5.893 5.893 0 001.384-2.126c.198-.48.332-1.035.372-1.864.04-.827.05-1.294.05-4.915s-.01-4.088-.05-4.915c-.04-.829-.174-1.384-.372-1.864a5.893 5.893 0 00-.923-2.126A5.893 5.893 0 0018.464.42C17.984.222 17.429.088 16.6.048 15.773.008 15.306-.002 11.685-.002h.332z"
          clipRule="evenodd"
        />
        <path d="M12.017 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 16a4 4 0 110-8 4 4 0 010 8z" />
        <path d="M18.4 4.155a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

const contactInfo = [
  {
    icon: PhoneIcon,
    label: '24/7 Support',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: EnvelopeIcon,
    label: 'Email Us',
    value: 'hello@wanderlusttravel.com',
    href: 'mailto:hello@wanderlusttravel.com'
  },
  {
    icon: MapPinIcon,
    label: 'Headquarters',
    value: 'New York, NY 10001',
    href: 'https://maps.google.com'
  }
]

const Footer = () => {
  return (
    <footer className="bg-gray-900 relative overflow-hidden" aria-labelledby="footer-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sunset-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-ocean-blue-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-jungle-green-500 rounded-full blur-3xl" />
      </div>
      
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32 relative">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-2 group">
              <GlobeAltIcon className="h-8 w-8 text-sunset-orange-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-bold text-xl text-white">WanderlustTravel</span>
            </Link>
            <p className="text-sm leading-6 text-gray-300">
              Discover the world with our curated travel experiences. From adventure-packed expeditions to luxurious getaways, we create unforgettable journeys that inspire and transform.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white mb-3">Get in Touch</h3>
              {contactInfo.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center space-x-3 text-sm text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <contact.icon className="h-4 w-4 text-sunset-orange-400 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <div className="font-medium">{contact.label}</div>
                    <div className="text-xs opacity-90">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {social.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:col-span-2 xl:mt-0">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-6">Quick Links</h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className={`text-sm leading-6 transition-all duration-200 ${
                        item.highlight 
                          ? 'bg-gradient-to-r from-sunset-orange-500 to-ocean-blue-500 bg-clip-text text-transparent font-semibold hover:from-sunset-orange-400 hover:to-ocean-blue-400' 
                          : 'text-gray-300 hover:text-white hover:translate-x-1'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Destinations */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-6">Popular Destinations</h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.destinations.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="block text-sm leading-6 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 group"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300">{item.description}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-6">Company</h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white mb-6">Support & Legal</h3>
              <ul role="list" className="space-y-4">
                {footerNavigation.support.slice(0, 3).map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="flex items-center gap-2 text-sm leading-6 text-gray-300 hover:text-white transition-all duration-200 group"
                    >
                      {item.icon && <item.icon className="h-4 w-4 text-sunset-orange-400 group-hover:scale-110 transition-transform" />}
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </Link>
                  </li>
                ))}
                {footerNavigation.legal.slice(0, 2).map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-sm leading-6 text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Trust Indicators & Certifications */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
            <div className="text-center">
              <ShieldCheckIcon className="h-8 w-8 text-sunset-orange-400 mx-auto mb-2" />
              <div className="text-sm font-semibold text-white">Secure Booking</div>
              <div className="text-xs text-gray-400">SSL Encrypted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sunset-orange-400 mb-2">24/7</div>
              <div className="text-sm font-semibold text-white">Customer Support</div>
              <div className="text-xs text-gray-400">Always Here for You</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-sunset-orange-400 mb-2">50K+</div>
              <div className="text-sm font-semibold text-white">Happy Travelers</div>
              <div className="text-xs text-gray-400">5-Star Rated</div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>&copy; 2025 WanderlustTravel. Made with</span>
              <HeartIcon className="h-3 w-3 text-red-400 animate-pulse" />
              <span>for travelers worldwide.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheckIcon className="h-3 w-3" />
                Licensed Travel Agent #WL123456
              </span>
              <span>|</span>
              <span>ATOL Protected #123456</span>
              <span>|</span>
              <span>IATA Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
