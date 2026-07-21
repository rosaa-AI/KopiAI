import { Navbar } from '../components/landing/Navbar'
import { Hero } from '../components/landing/Hero'
import { PainPoints } from '../components/landing/PainPoints'
import { Features } from '../components/landing/Features'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Stats } from '../components/landing/Stats'
import { Testimonials } from '../components/landing/Testimonials'
import { CTA } from '../components/landing/CTA'
import { Footer } from '../components/landing/Footer'

export function Landing() {
  return (
    <div className="min-h-screen bg-[#F8F4EC] dark:bg-[#1a1a2e] selection:bg-coffee/20 selection:text-coffee-dark">
      <Navbar />
      <Hero />
      <PainPoints />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
