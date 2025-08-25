'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  CheckCircleIcon,
  CalendarDaysIcon,
  UsersIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import packages from '@/data/packages.json'

const BookingContent = () => {
  const searchParams = useSearchParams()
  const packageId = parseInt(searchParams.get('package') || '1')
  const travelers = parseInt(searchParams.get('travelers') || '2')
  const selectedDate = searchParams.get('date') || ''
  const addons = searchParams.get('addons')?.split(',').map(Number).filter(Boolean) || []

  const pkg = packages.find(p => p.id === packageId)
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'credit',
    installments: false,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    confirmationNumber: ''
  })

  if (!pkg) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h1>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </Layout>
    )
  }

  const calculateTotal = () => {
    const basePrice = pkg.price * travelers
    const addOnPrice = addons.reduce((sum, index) => 
      sum + (pkg.addOns[index]?.price || 0), 0
    )
    return basePrice + addOnPrice
  }

  const total = calculateTotal()
  const installmentAmount = bookingData.installments ? Math.ceil(total / 3) : total

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const generateConfirmationNumber = () => {
    return 'WL' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      const confirmationNumber = generateConfirmationNumber()
      setBookingData(prev => ({ ...prev, confirmationNumber }))
      setCurrentStep(3)
    }
  }

  const steps = [
    { id: 1, name: 'Traveler Details', icon: UsersIcon },
    { id: 2, name: 'Payment', icon: CreditCardIcon },
    { id: 3, name: 'Confirmation', icon: CheckCircleIcon }
  ]

  return (
    <Layout>
      {/* Progress Header */}
      <div className="py-8" style={{ background: 'linear-gradient(135deg, #ff7849 0%, #ff9a56 25%, #ffb366 50%, #ff8c42 75%, #ff6b35 100%)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-8">Complete Your Booking</h1>
          
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-white text-sunset-orange-600' 
                    : 'bg-white/30 text-white'
                }`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-white/70'
                  }`}>
                    Step {step.id}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.id ? 'text-white' : 'text-white/70'
                  }`}>
                    {step.name}
                  </p>
                </div>
                {step.id < steps.length && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-8 ${
                    currentStep > step.id ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Traveler Information</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={bookingData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Dietary restrictions, accessibility needs, celebration occasions, etc."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                    />
                  </div>

                  <Button type="submit" size="lg" fullWidth>
                    Continue to Payment
                  </Button>
                </form>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'credit', name: 'Credit/Debit Card', icon: CreditCardIcon },
                      { id: 'paypal', name: 'PayPal', icon: BanknotesIcon },
                      { id: 'bank', name: 'Bank Transfer', icon: BanknotesIcon }
                    ].map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          bookingData.paymentMethod === method.id
                            ? 'border-sunset-orange-300 bg-sunset-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('paymentMethod', method.id)}
                      >
                        <div className="flex items-center">
                          <method.icon className="h-6 w-6 text-gray-600 mr-3" />
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Installment Option */}
                <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="installments"
                      checked={bookingData.installments}
                      onChange={(e) => handleInputChange('installments', e.target.checked.toString())}
                      className="h-4 w-4 text-sunset-orange-600 focus:ring-sunset-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="installments" className="ml-3 text-sm font-medium text-gray-900">
                      Pay in 3 installments (No extra fees)
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {bookingData.installments 
                      ? `Pay ${installmentAmount} today, then ${installmentAmount} after 30 days, and ${installmentAmount} after 60 days.`
                      : 'Split your payment into 3 equal parts with no additional fees.'
                    }
                  </p>
                </div>

                {bookingData.paymentMethod === 'credit' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={bookingData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={bookingData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={bookingData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.nameOnCard}
                        onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Billing Address
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={bookingData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none focus:ring-2 focus:ring-sunset-orange-200"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" size="lg" className="flex-1">
                        Complete Booking (${bookingData.installments ? installmentAmount : total})
                      </Button>
                    </div>
                  </form>
                )}

                {bookingData.paymentMethod !== 'credit' && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-6">
                      You will be redirected to {bookingData.paymentMethod === 'paypal' ? 'PayPal' : 'your bank'} to complete the payment.
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button onClick={handleSubmit} size="lg" className="flex-1">
                        Continue to {bookingData.paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="p-8 text-center">
                <div className="mb-6">
                  <CheckCircleIcon className="h-16 w-16 text-jungle-green-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-lg text-gray-600">Your adventure awaits</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmation Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Confirmation Number:</span>
                      <span className="font-mono font-bold text-sunset-orange-600">
                        {bookingData.confirmationNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Traveler:</span>
                      <span>{bookingData.firstName} {bookingData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{bookingData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    A confirmation email has been sent to your email address with all the details.
                    Our travel coordinator will contact you within 24 hours.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" fullWidth>
                      Download Confirmation
                    </Button>
                    <Button fullWidth onClick={() => window.location.href = '/'}>
                      Plan Another Trip
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-16 h-16 bg-cover bg-center rounded-lg"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')`
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{pkg.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{pkg.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
                      <span>{selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Date not selected'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-4 w-4 text-gray-400" />
                      <span>{travelers} Travelers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Package (×{travelers})</span>
                      <span>${pkg.price * travelers}</span>
                    </div>
                    {addons.map(index => (
                      <div key={index} className="flex justify-between">
                        <span>{pkg.addOns[index]?.name}</span>
                        <span>${pkg.addOns[index]?.price}</span>
                      </div>
                    ))}
                    <hr className="border-gray-200" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-sunset-orange-600">${total}</span>
                    </div>
                    {bookingData.installments && currentStep >= 2 && (
                      <div className="text-xs text-gray-600 text-center pt-2">
                        Paying ${installmentAmount} today
                      </div>
                    )}
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-jungle-green-500 mt-0.5" />
                    <div className="text-sm text-jungle-green-700">
                      <div className="font-medium">Secure Booking</div>
                      <div>Your information is protected with bank-level encryption</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const LoadingSpinner = () => (
  <Layout>
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-orange-600"></div>
    </div>
  </Layout>
)

const BookingPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingContent />
    </Suspense>
  )
}

export default BookingPage
