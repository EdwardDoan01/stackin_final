import { useUIStore } from '../store/ui'

export default function Toasts() {
  const toasts = useUIStore((s) => s.toasts)
  const remove = useUIStore((s) => s.removeToast)
  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, display: 'grid', gap: 8, zIndex: 50 }}>
      {toasts.map((t) => (
        <div key={t.id} className="rounded-lg shadow-md" style={{ background: t.type === 'error' ? '#fee2e2' : t.type === 'success' ? '#dcfce7' : '#e0e7ff', padding: '10px 12px', minWidth: 240 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <div className="text-slate-900">{t.message}</div>
            <button className="btn" style={{ padding: '4px 8px' }} onClick={() => remove(t.id)}>×</button>
          </div>
        </div>
      ))}
    </div>
  )
}


