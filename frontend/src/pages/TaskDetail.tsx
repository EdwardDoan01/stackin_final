import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { taskApi, paymentApi } from '../lib/api'

export default function TaskDetailPage() {
  const { id } = useParams()
  const [task, setTask] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    if (!id) return
    setError(null)
    setLoading(true)
    try {
      const res = await taskApi.detail(Number(id))
      setTask(res.data)
    } catch (e: any) {
      setError(e?.response?.data || 'Không tải được task')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  const accept = async () => {
    if (!id) return
    await taskApi.accept(Number(id))
    await load()
  }

  const start = async () => {
    if (!id) return
    await taskApi.status(Number(id), 'start')
    await load()
  }

  const complete = async () => {
    if (!id) return
    await taskApi.status(Number(id), 'complete')
    await load()
  }

  const release = async () => {
    // giả sử task.detail trả về payment id nếu có
    const pid = (task as any)?.payment?.id
    if (!pid) return
    await paymentApi.release(pid)
    await load()
  }

  if (loading) return <div className="container">Đang tải...</div>
  if (error) return <div className="container" style={{ color: '#b00020' }}>{error}</div>
  if (!task) return null

  return (
    <div className="container" style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr' }}>
      <div className="card">
        <div className="card-header"><h2 className="text-slate-900" style={{ margin: 0 }}>{task.title}</h2></div>
        <div style={{ padding: 16 }}>
        <div className="text-slate-700" style={{ marginBottom: 8 }}>{task.description}</div>
        <div className="text-slate-800">Giá: {task.price} {task.currency}</div>
        <div className="text-slate-800">Trạng thái: <span className="badge badge-green">{task.status}</span></div>
        </div>
      </div>
      <div className="card left-accent" style={{ padding: 16, position: 'sticky', top: 16, height: 'fit-content' }}>
        <h3 className="text-slate-900" style={{ marginTop: 0 }}>Hành động</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          <button className="btn" onClick={accept}>Nhận task</button>
          <button className="btn" onClick={start}>Bắt đầu</button>
          <button className="btn" onClick={complete}>Hoàn thành</button>
          <button className="btn-outline" onClick={release}>Client xác nhận trả tiền</button>
        </div>
      </div>
      <style>{`@media(min-width: 900px){ .container{ grid-template-columns: 2fr 1fr !important; } }`}</style>
    </div>
  )
}


