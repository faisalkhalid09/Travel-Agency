'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    preferredContact: 'email'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        preferredContact: 'email'
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      description: 'Mon-Fri 9AM-8PM, Sat-Sun 10AM-6PM'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: ['info@wanderlusttravel.com', 'support@wanderlusttravel.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPinIcon,
      title: 'Office',
      details: ['123 Adventure Street', 'Travel City, TC 12345'],
      description: 'Visit us for personalized planning'
    },
    {
      icon: ClockIcon,
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 8:00 PM', 'Sat-Sun: 10:00 AM - 6:00 PM'],
      description: '24/7 emergency support available'
    }
  ]

  const faqItems = [
    {
      question: 'How far in advance should I book my trip?',
      answer: 'We recommend booking 6-8 weeks in advance for best availability and prices. However, we can accommodate last-minute bookings based on availability.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Free cancellation up to 48 hours before departure for most packages. Some special packages may have different terms.'
    },
    {
      question: 'Do you provide travel insurance?',
      answer: 'Yes, we offer comprehensive travel insurance options to protect your investment and give you peace of mind.'
    },
    {
      question: 'Can I customize my travel package?',
      answer: 'Absolutely! All our packages can be customized to meet your specific preferences, budget, and travel dates.'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #ff7849 0%, #ff9a56 25%, #ffb366 50%, #ff8c42 75%, #ff6b35 100%)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Ready to start your next adventure? Our travel experts are here to help you plan the perfect trip.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="booking">New Booking</option>
                      <option value="existing">Existing Booking</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'email', label: 'Email' },
                      { id: 'phone', label: 'Phone Call' },
                      { id: 'text', label: 'Text Message' }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method.id}
                          checked={formData.preferredContact === method.id}
                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                          className="h-4 w-4 text-sunset-orange-600 focus:ring-sunset-orange-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your travel plans, questions, or how we can help you..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-sunset-orange-100 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-sunset-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                      <p className="text-gray-500 text-xs mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Live Chat */}
            <Card className="p-6 bg-gradient-to-br from-sunset-orange-50 to-ocean-blue-50">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-sunset-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Immediate Help?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Chat with our travel experts now for instant assistance
                </p>
                <Button fullWidth className="mb-3">
                  Start Live Chat
                </Button>
                <p className="text-xs text-gray-500">
                  Average response time: 2 minutes
                </p>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-6 bg-red-50 border-red-200">
              <h3 className="text-lg font-bold text-red-800 mb-2">Emergency Support</h3>
              <p className="text-red-700 text-sm mb-3">
                For travelers needing urgent assistance while on their trip
              </p>
              <div className="text-red-800 font-semibold">
                📞 +1 (555) HELP-NOW
              </div>
              <div className="text-red-600 text-xs mt-1">
                Available 24/7 for emergencies
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <QuestionMarkCircleIcon className="h-12 w-12 text-sunset-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our travel services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Don't see your question answered?
            </p>
            <Button variant="outline">
              View All FAQs
            </Button>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Visit Our Office</h2>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPinIcon className="h-12 w-12 mx-auto mb-2" />
                <p>Interactive Map</p>
                <p className="text-sm">123 Adventure Street, Travel City, TC 12345</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">
                Located in the heart of Travel City, our office is easily accessible by public transport and has free parking available.
              </p>
              <Button variant="outline">
                Get Directions
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
