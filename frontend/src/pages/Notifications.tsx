import { useEffect, useState } from 'react'
import { notiApi } from '../lib/api'

export default function NotificationsPage() {
  const [items, setItems] = useState<any[]>([])
  const [unread, setUnread] = useState<number>(0)

  const load = async () => {
    const [list, count] = await Promise.all([notiApi.list(), notiApi.unreadCount()])
    setItems(list.data)
    setUnread(count.data?.count ?? 0)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: number) => { await notiApi.markRead(id); load() }
  const archive = async (id: number) => { await notiApi.archive(id); load() }

  return (
    <div className="container">
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="text-slate-900">Thông báo</h2>
          <div className="text-slate-700">Chưa đọc: {unread}</div>
        </div>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          {items.map((n) => (
            <div key={n.id} className="border rounded-lg left-accent" style={{ padding: 12, background: n.is_read ? '#fff' : '#f0fff9' }}>
              <div className="text-slate-900" style={{ fontWeight: 600 }}>{n.title}</div>
              <div className="text-slate-700">{n.body}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {!n.is_read && <button className="btn" onClick={() => markRead(n.id)}>Đánh dấu đã đọc</button>}
                {!n.is_archived && <button className="btn" onClick={() => archive(n.id)}>Lưu trữ</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


