import Hero from '../components/Hero'
import TaskCategories from '../components/TaskCategories'
import BannerWithStats from '../components/BannerWithStats'
import PopularProjects from '../components/PopularProjects'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import SiteFooter from '../components/SiteFooter'

export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <TaskCategories />
      <BannerWithStats />
      <div style={{ height: 16 }} />
      <PopularProjects />
      <div style={{ height: 16 }} />
      <HowItWorks />
      <div style={{ height: 16 }} />
      <Testimonials />
      <SiteFooter />
    </div>
  )
}


