import { useEffect, useState } from 'react'
import { taskApi } from '../lib/api'
import { Link } from 'react-router-dom'

export default function TaskerDashboardPage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [active, setActive] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const list = await taskApi.list()
      const items = list.data || []
      setTasks(items.filter((t: any) => !t.tasker && ['posted', 'in_progress'].includes(t.status)))
      setActive(items.filter((t: any) => t.tasker))
    }
    load()
  }, [])

  return (
    <div className="container grid gap-4 grid-1-2">
      <div className="card" style={{ padding: 16 }}>
        <div className="card-header"><h2 className="text-slate-900" style={{ margin: 0 }}>Công việc khả dụng</h2></div>
        <div className="grid gap-3" style={{ paddingTop: 12 }}>
          {tasks.map((t) => (
            <Link key={t.id} to={`/task/${t.id}`} className="border rounded-lg" style={{ padding: 12, textDecoration: 'none' }}>
              <div className="text-slate-900" style={{ fontWeight: 700 }}>{t.title}</div>
              <div className="text-slate-700">{t.price} {t.currency} • {t.status}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div className="card-header"><h2 className="text-slate-900" style={{ margin: 0 }}>Task đang làm</h2></div>
        <div className="grid gap-3" style={{ paddingTop: 12 }}>
          {active.map((t) => (
            <Link key={t.id} to={`/task/${t.id}`} className="border rounded-lg" style={{ padding: 12, textDecoration: 'none' }}>
              <div className="text-slate-900" style={{ fontWeight: 700 }}>{t.title}</div>
              <div className="text-slate-700">{t.price} {t.currency} • {t.status}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


