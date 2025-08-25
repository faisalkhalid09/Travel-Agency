'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { StarIcon, FunnelIcon, PencilIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import reviews from '@/data/reviews.json'
import packages from '@/data/packages.json'

const ReviewsPage = () => {
  const [selectedRating, setSelectedRating] = useState('all')
  const [selectedPackage, setSelectedPackage] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    packageId: '',
    rating: 0,
    title: '',
    comment: '',
    customerName: ''
  })

  // Filter and sort reviews
  const filteredReviews = reviews.filter(review => {
    const matchesRating = selectedRating === 'all' || review.rating === parseInt(selectedRating)
    const matchesPackage = selectedPackage === 'all' || review.packageId === parseInt(selectedPackage)
    return matchesRating && matchesPackage
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating-high':
        return b.rating - a.rating
      case 'rating-low':
        return a.rating - b.rating
      case 'helpful':
        return b.helpful - a.helpful
      case 'newest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate review submission
    alert('Review submitted successfully! Thank you for your feedback.')
    setShowReviewForm(false)
    setNewReview({
      packageId: '',
      rating: 0,
      title: '',
      comment: '',
      customerName: ''
    })
  }

  const getPackageName = (packageId: number) => {
    const pkg = packages.find(p => p.id === packageId)
    return pkg ? pkg.title : 'Unknown Package'
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #ff7849 0%, #ff9a56 25%, #ffb366 50%, #ff8c42 75%, #ff6b35 100%)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
            Customer Reviews
          </h1>
          <p className="text-xl text-white mb-8">
            Real experiences from real travelers who've booked with WanderlustTravel
          </p>
          
          {/* Overall Stats */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon 
                      key={i} 
                      className={`h-6 w-6 ${
                        i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <div className="text-gray-200">Overall Rating</div>
              </div>
              <div className="w-px h-16 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{reviews.length}</div>
                <div className="text-gray-200">Total Reviews</div>
              </div>
              <div className="w-px h-16 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-gray-200">Verified Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-4">
              <select 
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <select 
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
              >
                <option value="all">All Packages</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                ))}
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="rating-high">Highest Rated</option>
                <option value="rating-low">Lowest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>

            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="shrink-0"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Write a Review
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedReviews.length} of {reviews.length} reviews
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {sortedReviews.length === 0 ? (
              <div className="text-center py-16">
                <FunnelIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              sortedReviews.map((review) => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 bg-gradient-to-br from-sunset-orange-400 to-ocean-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {review.customerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.customerName}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon 
                              key={i} 
                              className={`h-5 w-5 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          for {getPackageName(review.packageId)}
                        </span>
                      </div>
                    </div>
                    {review.verified && (
                      <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-sunset-orange-600">
                      👍 Helpful ({review.helpful})
                    </button>
                    <button className="hover:text-sunset-orange-600">
                      Report
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Review Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {showReviewForm ? (
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.customerName}
                        onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Package
                      </label>
                      <select 
                        required
                        value={newReview.packageId}
                        onChange={(e) => setNewReview(prev => ({ ...prev, packageId: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
                      >
                        <option value="">Select a package</option>
                        {packages.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                            className="p-1"
                          >
                            <StarSolidIcon 
                              className={`h-8 w-8 ${
                                rating <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Review Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newReview.title}
                        onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-sunset-orange-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" fullWidth>
                        Submit Review
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowReviewForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Card>
              ) : (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Guidelines</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Be honest and detailed about your experience</li>
                    <li>• Include specific details about the service</li>
                    <li>• Mention both positives and areas for improvement</li>
                    <li>• Keep reviews respectful and constructive</li>
                    <li>• Only review packages you've actually booked</li>
                  </ul>
                  <Button 
                    onClick={() => setShowReviewForm(true)}
                    fullWidth
                    className="mt-6"
                  >
                    <PencilIcon className="h-5 w-5 mr-2" />
                    Share Your Experience
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ReviewsPage
