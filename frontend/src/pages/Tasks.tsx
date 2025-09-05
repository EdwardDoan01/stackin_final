import { useEffect, useMemo, useState } from 'react'
import { taskApi } from '../lib/api'
import { Link, useSearchParams } from 'react-router-dom'
import { useUIStore } from '../store/ui'

type Task = {
  id: number
  title: string
  price: string
  status: string
}

export default function TasksPage() {
  const [items, setItems] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [params, setParams] = useSearchParams()
  const toast = useUIStore((s) => s.showToast)

  const [search, setSearch] = useState(params.get('q') || '')
  const [category, setCategory] = useState(params.get('category') || '')
  const [status, setStatus] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 8

  useEffect(() => {
    const load = async () => {
      try {
        const [list, cats] = await Promise.all([taskApi.list(), taskApi.categories()])
        setItems(list.data)
        setCategories(cats.data)
      } catch (e: any) {
        toast('Không tải được danh sách task', 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const p = new URLSearchParams()
    if (search) p.set('q', search)
    if (category) p.set('category', category)
    setParams(p, { replace: true })
  }, [search, category])

  const filtered = useMemo(() => {
    let data = items
    if (search) data = data.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    if (category) data = data.filter((t: any) => String(t.category?.id ?? t.category) === category)
    if (status) data = data.filter((t) => t.status === status)
    const min = Number(minPrice)
    const max = Number(maxPrice)
    if (!Number.isNaN(min) && minPrice) data = data.filter((t) => Number(t.price) >= min)
    if (!Number.isNaN(max) && maxPrice) data = data.filter((t) => Number(t.price) <= max)
    return data
  }, [items, search, category, status, minPrice, maxPrice])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)
  useEffect(() => { if (page > totalPages) setPage(1) }, [totalPages])

  if (loading) return <div className="container">Đang tải...</div>

  return (
    <div className="container">
      <h2 className="text-slate-900" style={{ marginBottom: 12 }}>Danh sách Task</h2>
      <div className="card" style={{ padding: 12, marginBottom: 12 }}>
        <div className="grid gap-3" style={{ gridTemplateColumns: '1fr' }}>
          <input className="input" placeholder="Tìm theo tiêu đề" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)} style={{ maxWidth: 220 }}>
              <option value="">Tất cả danh mục</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 220 }}>
              <option value="">Tất cả trạng thái</option>
              <option value="posted">Posted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input className="input" style={{ maxWidth: 140 }} placeholder="Giá từ" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input className="input" style={{ maxWidth: 140 }} placeholder="Giá đến" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-1-2">
        {paged.map((t) => (
          <Link key={t.id} to={`/task/${t.id}`} className="bg-white rounded-lg shadow-md border" style={{ padding: 12, textDecoration: 'none', color: '#111827' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div className="rounded-2xl" style={{ width: 44, height: 44, background: '#e5edfb', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                  {(t.title || 'T').slice(0,1).toUpperCase()}
                </div>
                <div>
                  <div className="text-slate-900" style={{ fontWeight: 600 }}>{t.title}</div>
                  <div className="text-slate-700" style={{ fontSize: 13 }}>Trạng thái: {t.status}</div>
                </div>
              </div>
              <div className="text-slate-900" style={{ fontWeight: 700 }}>{t.price}</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
        <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))}>Trang trước</button>
        <div className="text-slate-700" style={{ padding: '8px 12px' }}>{page}/{totalPages}</div>
        <button className="btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Trang sau</button>
      </div>
    </div>
  )
}


