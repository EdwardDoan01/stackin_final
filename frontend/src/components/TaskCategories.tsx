import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { taskApi } from '../lib/api'

interface Category {
  id: string
  name: string
  slug?: string
  icon?: string
}

// Fallback categories with Material Icons
const fallbackCategories: Category[] = [
  { id: 'cleaning', name: 'Cleaning', slug: 'cleaning', icon: 'cleaning_services' },
  { id: 'plumbing', name: 'Plumbing', slug: 'plumbing', icon: 'plumbing' },
  { id: 'moving', name: 'Moving', slug: 'moving', icon: 'local_shipping' },
  { id: 'mounting', name: 'Mounting', slug: 'mounting', icon: 'hardware' },
  { id: 'assembly', name: 'Assembly', slug: 'assembly', icon: 'build' },
  { id: 'outdoor', name: 'Outdoor Help', slug: 'outdoor', icon: 'park' },
  { id: 'repairs', name: 'Home Repairs', slug: 'repairs', icon: 'handyman' },
  { id: 'painting', name: 'Painting', slug: 'painting', icon: 'format_paint' },
  { id: 'it-support', name: 'IT Support', slug: 'it-support', icon: 'computer' },
  { id: 'trending', name: 'Trending', slug: 'trending', icon: 'whatshot' }
]

export default function TaskCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const activeCategory = searchParams.get('category')

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await taskApi.categories()
        const apiCategories = response.data || []
        
        if (apiCategories.length > 0) {
          // Map API categories to our format, adding icons
          const mappedCategories = apiCategories.map((cat: any) => {
            const fallback = fallbackCategories.find(f => 
              f.slug === cat.slug || 
              f.name.toLowerCase() === cat.name.toLowerCase()
            )
            return {
              id: cat.id || cat.slug,
              name: cat.name,
              slug: cat.slug,
              icon: fallback?.icon || 'work'
            }
          })
          setCategories(mappedCategories)
        } else {
          setCategories(fallbackCategories)
        }
      } catch (error) {
        console.warn('Failed to load categories, using fallback:', error)
        setCategories(fallbackCategories)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const handleCategoryClick = (category: Category) => {
    const params = new URLSearchParams(searchParams)
    if (activeCategory === category.id) {
      params.delete('category')
    } else {
      params.set('category', category.id)
    }
    navigate(`/tasks?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="container" style={{ marginTop: 24 }}>
        <div className="flex gap-6 overflow-x-auto pb-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ marginTop: 50 }}>
      <h2 className="text-slate-900 text-xl font-bold mb-4">Browse Categories</h2>
      
      {/* Horizontal scrollable row for all screen sizes */}
      <div
        className="grid overflow-x-auto pb-2 category-scroll"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '30px',
        }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`flex-shrink-0 flex flex-col items-center justify-center px-4 py-3 rounded-xl transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-blue-50 text-blue-600 border border-blue-600'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'
            }`}
          >
            <span className="material-icons text-2xl mb-1">
              {category.icon}
            </span>
            <span className="text-sm font-medium text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
