import { useEffect, useState } from 'react'
import { api } from '../lib/api'

interface StatItem {
  label: string
  value: string
  highlight: string
}

// Fallback static statistics - 5 key metrics with vibrant colors
const fallbackStats: StatItem[] = [
  { label: 'Furniture Assemblies', value: '3.4M+', highlight: 'text-green-600 font-bold' },
  { label: 'Moving Tasks', value: '1.5M+', highlight: 'text-blue-600 font-bold' },
  { label: 'Home Repairs', value: '700K+', highlight: 'text-orange-600 font-bold' },
  { label: 'Homes Cleaned', value: '890K+', highlight: 'text-purple-600 font-bold' },
  { label: 'IT Support', value: '450K+', highlight: 'text-red-600 font-bold' }
]

export default function Statistics() {
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
            highlight: stat.highlight || 'text-green-700'
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

  if (loading) {
    return (
      <div className="container" style={{ marginTop: 24 }}>
        <div className="bg-white rounded-2xl shadow-lg border p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ marginTop: 24 }}>
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-slate-900 text-xl font-bold mb-6 text-center">Platform Statistics</h2>
        
        {/* Horizontal flex layout with inline styles */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px' }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: 'center', minWidth: '120px', flexShrink: 0 }}>
              <div className="text-sm text-gray-600 mb-2 leading-tight">
                {stat.label}
              </div>
              <div className={`text-2xl ${stat.highlight} leading-tight`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
