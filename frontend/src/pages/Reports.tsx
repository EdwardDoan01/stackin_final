import { useEffect, useState } from 'react'
import { reportApi } from '../lib/api'

export default function ReportsPage() {
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const load = async () => {
    const res = await reportApi.list()
    setItems(res.data)
  }

  useEffect(() => { load() }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await reportApi.create({ title, body })
    setTitle(''); setBody('')
    load()
  }

  return (
    <div className="container grid gap-4 grid-1-2">
      <div className="card" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Gửi báo cáo</h2>
        <form onSubmit={submit} className="grid gap-3" style={{ marginTop: 12 }}>
          <input className="input" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input" placeholder="Nội dung" value={body} onChange={(e) => setBody(e.target.value)} />
          <button className="btn" type="submit">Gửi</button>
        </form>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Danh sách báo cáo</h2>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          {items.map((r) => (
            <div key={r.id} className="border rounded-lg left-accent" style={{ padding: 12 }}>
              <div className="text-slate-900" style={{ fontWeight: 600 }}>{r.title}</div>
              <div className="text-slate-700">{r.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


