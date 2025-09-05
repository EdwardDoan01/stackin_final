import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'

// Local images
import furnitureImg from '../assets/images/popular_project/furniture.png'
import mountImg from '../assets/images/popular_project/mount_TV.png'
import movingImg from '../assets/images/popular_project/help_moving.png'
import cleaningImg from '../assets/images/popular_project/cleaning_house.png'
import paintingImg from '../assets/images/popular_project/painting.png'
import fixingImg from '../assets/images/popular_project/fixing_thing.png'

interface Project {
  id: string
  title: string
  price: string
  image: string
  to: string
  alt: string
}

const fallbackProjects: Project[] = [
  { id: 'furniture', title: 'Furniture Assembly', price: 'Projects starting at $49', image: furnitureImg, to: '/tasks?category=assembly', alt: 'Furniture assembly service' },
  { id: 'mounting', title: 'Mount Art or Shelves', price: 'Projects starting at $39', image: mountImg, to: '/tasks?category=mounting', alt: 'TV and shelf mounting service' },
  { id: 'moving', title: 'Help Moving', price: 'Projects starting at $89', image: movingImg, to: '/tasks?category=moving', alt: 'Moving and relocation service' },
  { id: 'cleaning', title: 'Home Cleaning', price: 'Projects starting at $49', image: cleaningImg, to: '/tasks?category=cleaning', alt: 'Professional house cleaning service' },
  { id: 'painting', title: 'Painting & Touch-ups', price: 'Projects starting at $59', image: paintingImg, to: '/tasks?category=painting', alt: 'Interior and exterior painting service' },
  { id: 'repairs', title: 'Minor Home Repairs', price: 'Projects starting at $45', image: fixingImg, to: '/tasks?category=repairs', alt: 'General home repair and maintenance service' },
]

export default function PopularProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await api.get('/task/popular-projects/')
        if (Array.isArray(data) && data.length) {
          const mapped: Project[] = data.map((p: any, idx: number) => ({
            id: p.id || p.slug || `proj-${idx}`,
            title: p.title || p.name || 'Project',
            price: p.price || `Projects starting at $${p.starting_price ?? 49}`,
            image:
              p.image ||
              fallbackProjects.find(fp => fp.id === (p.id || p.slug))?.image ||
              furnitureImg,
            to: `/tasks?category=${p.category || p.id || 'general'}`,
            alt: `${p.title || p.name} service`,
          }))
          setProjects(mapped)
        }
      } catch (e) {
        console.warn('Popular projects fallback used:', e)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-slate-900 text-2xl font-bold mb-6 text-center">Popular Projects</h2>
        
        {loading ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ width: '250px', height: '200px' }} className="bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.to}
                className="group block bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300"
                style={{ textDecoration: 'none', width: '250px', flexShrink: 0 }}
              >
                <div className="relative h-24 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-blue-600 font-semibold text-xs">
                    {project.price}
                  </p>
                                  </div>
                </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
