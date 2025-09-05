import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { paymentApi, taskApi } from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function TaskCreatePage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', price: 0, currency: 'VND', category: '' })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await taskApi.categories()
        setCategories(res.data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      // 1) Tạo task
      const created = await taskApi.create({
        title: form.title,
        description: form.description,
        price: form.price,
        currency: form.currency,
        category: Number(form.category),
      })

      const taskId = created.data.id

      // 2) Tạo PaymentIntent (escrow)
      await paymentApi.createIntent({ task: taskId, amount: Number(form.price), currency: form.currency })

      navigate(`/task/${taskId}`)
    } catch (e: any) {
      setError(e?.response?.data || 'Tạo task thất bại')
    }
  }

  if (loading) return <div className="container">Đang tải...</div>

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg border" style={{ display: 'grid', gap: 12, padding: 16 }}>
        <h2 className="text-slate-900">Đăng Task</h2>
        {error && <div style={{ color: '#b00020' }}>{String(error)}</div>}
        <label className="text-slate-700">Tiêu đề</label>
        <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <label className="text-slate-700">Mô tả</label>
        <textarea className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <label className="text-slate-700">Danh mục</label>
        <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <label className="text-slate-700">Giá</label>
        <input className="input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
        <button type="submit" className="btn">Tạo và thanh toán escrow</button>
      </form>
    </div>
  )
}


