import { useEffect, useRef, useState } from 'react'
import { chatApi } from '../lib/api'
import { useAuthStore } from '../store/auth'

export default function ChatPage() {
  const [rooms, setRooms] = useState<any[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')
  const me = useAuthStore((s) => s.user)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatApi.rooms().then((r) => setRooms(r.data))
  }, [])

  useEffect(() => {
    let active = true
    const load = async () => {
      if (!selected) return
      const r = await chatApi.messages(selected)
      if (active) setMessages(r.data)
    }
    load()
    const id = setInterval(load, 3000)
    return () => { active = false; clearInterval(id) }
  }, [selected])

  const send = async () => {
    if (!selected || !text) return
    await chatApi.sendMessage(selected, { content: text })
    setText('')
    const r = await chatApi.messages(selected)
    setMessages(r.data)
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
  }

  return (
    <div className="container" style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr' }}>
      <div className="bg-white border rounded-2xl shadow-lg" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: 480 }}>
        <div style={{ borderRight: '1px solid #eef2f6' }}>
          {rooms.map((rm) => (
            <div
              key={rm.id}
              onClick={() => setSelected(rm.id)}
              style={{ padding: 12, borderBottom: '1px solid #eef2f6', cursor: 'pointer', background: selected === rm.id ? '#eef6ff' : undefined }}
            >
              <div className="text-slate-900" style={{ fontWeight: 600 }}>{rm.name || `Room ${rm.id}`}</div>
              {rm.unread_count ? <div className="text-slate-700" style={{ fontSize: 12 }}>Chưa đọc: {rm.unread_count}</div> : null}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr auto' }}>
          <div ref={scrollerRef} style={{ padding: 12, overflowY: 'auto' }}>
            {messages.map((m) => {
              const mine = me && (m.sender?.id === me.id)
              return (
                <div key={m.id} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start', padding: '6px 0' }}>
                  <div className="rounded-2xl" style={{ maxWidth: '70%', padding: '8px 12px', background: mine ? '#e0f2fe' : '#f1f5f9', color: '#111827' }}>
                    {!mine && <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>{m.sender?.username}</div>}
                    <div>{m.content}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: 12, display: 'flex', gap: 8 }}>
            <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập tin nhắn" style={{ flex: 1 }} />
            <button className="btn" onClick={send}>Gửi</button>
          </div>
        </div>
      </div>
      <style>{`@media(min-width: 900px){ .container{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}


