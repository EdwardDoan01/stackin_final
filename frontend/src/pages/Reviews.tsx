import { useEffect, useState } from 'react'
import { reviewApi } from '../lib/api'

export default function ReviewsPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    reviewApi.list().then((r) => setItems(r.data))
  }, [])

  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Đánh giá</h2>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          {items.map((rv) => (
            <div key={rv.id} className="border rounded-lg" style={{ padding: 12, background: '#fff' }}>
              <div className="text-slate-900" style={{ fontWeight: 600 }}>{rv.rating}★</div>
              <div className="text-slate-700">{rv.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


