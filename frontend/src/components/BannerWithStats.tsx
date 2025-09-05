import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import bannerImage from '../assets/images/Banner.jpg'

interface StatItem {
  label: string
  value: string
  highlight: string
}

// Fallback static statistics - 6 key metrics with vibrant colors
const fallbackStats: StatItem[] = [
  { label: 'Furniture Assemblies', value: '3.4M+', highlight: 'text-green-600 font-bold' },
  { label: 'Moving Tasks', value: '1.5M+', highlight: 'text-blue-600 font-bold' },
  { label: 'Items Mounted', value: '1.0M+', highlight: 'text-purple-600 font-bold' },
  { label: 'Home Repairs', value: '700K+', highlight: 'text-orange-600 font-bold' },
  { label: 'Homes Cleaned', value: '890K+', highlight: 'text-teal-600 font-bold' },
  { label: 'IT Support', value: '450K+', highlight: 'text-red-600 font-bold' }
]

export default function BannerWithStats() {
  const [stats, setStats] = useState<StatItem[]>(fallbackStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Try to fetch dynamic stats from backend
        const response = await api.get('/platform/stats/')
        if (response.data && Array.isArray(response.data)) {
          const dynamicStats = response.data.map((stat: any) => ({
            label: stat.label || stat.name,
            value: stat.value || stat.count,
            highlight: stat.highlight || 'text-green-600 font-bold'
          }))
          setStats(dynamicStats)
        }
      } catch (error) {
        console.warn('Failed to load platform stats, using fallback:', error)
        // Keep fallback stats
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div 
        className="rounded-2xl shadow-lg border overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)',
          minHeight: '400px'
        }}
      >
        {/* Desktop Layout: Banner left, Stats right */}
        <div className="hidden lg:flex h-full">
          {/* Banner Section */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Get Things Done with Stackin
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed font-semibold mx-6">
                Connect with skilled taskers for furniture assembly, moving, home repairs, 
                cleaning, and more. Trusted by millions of satisfied customers.
              </p>
              <br />
              <div className="relative">
              <img
                src={bannerImage}
                alt="Stackin Platform Banner"
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-xl"></div>
            </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
              Platform Statistics
            </h3>
            {loading ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} style={{ textAlign: 'center', minWidth: '100px' }}>
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
                {stats.map((stat, index) => (
                  <div key={index} style={{ textAlign: 'center', minWidth: '100px' }}>
                    <div className="text-sm text-gray-600 mb-2 leading-tight">
                      {stat.label}
                    </div>
                    <div className={`text-xl ${stat.highlight} leading-tight`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <br />
        </div>
      </div>
    </div>
  )
}
