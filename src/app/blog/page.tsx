'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { 
  CalendarDaysIcon, 
  ClockIcon, 
  TagIcon,
  MagnifyingGlassIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import blogPosts from '@/data/blog-posts.json'

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPost, setSelectedPost] = useState<number | null>(null)

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)))

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts[0]
  const regularPosts = selectedPost ? filteredPosts : filteredPosts.slice(1)

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost)
    if (!post) return <div>Post not found</div>

    return (
      <Layout>
        {/* Article Header */}
        <section className="relative py-24">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${post.image}')`
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-sunset-orange-500 text-white rounded-full text-sm font-medium capitalize mb-4">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="h-5 w-5" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <div className="text-xl leading-8 text-gray-700 mb-8">
              {post.excerpt}
            </div>
            
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-900">Tags:</span>
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button 
                variant="outline"
                onClick={() => setSelectedPost(null)}
              >
                Back to Blog
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #ff7849 0%, #ff9a56 25%, #ffb366 50%, #ff8c42 75%, #ff6b35 100%)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-6xl mb-6">
            Travel Blog
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Discover amazing destinations, travel tips, and inspiring stories from around the world
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-sunset-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Posts
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-sunset-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {!searchTerm && selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <Card className="overflow-hidden group cursor-pointer" onClick={() => setSelectedPost(featuredPost.id)}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('${featuredPost.image}')`
                    }}
                  />
                </div>
                <div className="p-8 lg:p-12">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-sunset-orange-100 text-sunset-orange-800 rounded-full text-sm font-medium capitalize">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-sunset-orange-600 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <UserIcon className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="h-4 w-4" />
                      <span>{new Date(featuredPost.publishDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <Button>
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div>
          {searchTerm || selectedCategory !== 'all' ? (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchTerm ? `Search Results for "${searchTerm}"` : `${selectedCategory} Articles`}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedPost(post.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundImage: `url('${post.image}')`
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-medium capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sunset-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <UserIcon className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        <TagIcon className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{post.tags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <MagnifyingGlassIcon className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-sunset-orange-500 to-ocean-blue-500 text-white p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">
              Never Miss a Travel Story
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest travel tips, destination guides, and exclusive deals delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <Button 
                className="bg-white text-sunset-orange-600 hover:bg-gray-100 px-8"
              >
                Subscribe
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
