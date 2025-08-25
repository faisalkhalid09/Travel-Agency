import HeroSection from '@/components/home/HeroSection'
import FeaturedPackages from '@/components/home/FeaturedPackages'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import NewsletterSignup from '@/components/home/NewsletterSignup'
import PromoBanner from '@/components/home/PromoBanner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <PromoBanner />
      <main>
        <HeroSection />
        <FeaturedPackages />
        <WhyChooseUs />
        <Testimonials />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
