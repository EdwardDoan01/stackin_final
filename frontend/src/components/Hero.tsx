import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    navigate(`/tasks?${params.toString()}`)
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg border" style={{ padding: 24, backgroundImage: 'linear-gradient(135deg, #eef6ff, #ffffff)' }}>
      <h1 className="text-slate-900" style={{ marginTop: 0, marginBottom: 8 }}>Tìm Task nhanh chóng</h1>
      <p className="text-slate-700" style={{ marginTop: 0, marginBottom: 16 }}>Nhập nhu cầu của bạn và bắt đầu ngay.</p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input className="input" placeholder="Ví dụ: Sửa ống nước, dọn nhà..." value={q} onChange={(e) => setQ(e.target.value)} style={{ flex: 1, minWidth: 240 }} />
        <button className="btn" type="submit">Tìm kiếm</button>
      </form>
    </div>
  )
}


