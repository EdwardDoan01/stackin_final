import { useEffect, useState } from 'react'
import { authApi, userApi } from '../lib/api'

export default function ProfilePage() {
  const [me, setMe] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setError(null)
    setLoading(true)
    try {
      const data = await authApi.me()
      setMe(data)
    } catch (e: any) {
      setError('Không tải được hồ sơ')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '' })

  useEffect(() => {
    if (me) setForm({ first_name: me.first_name || '', last_name: me.last_name || '', phone: me.phone || '' })
  }, [me])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await userApi.updateProfile(form)
    load()
  }

  if (loading) return <div className="container">Đang tải...</div>
  if (error) return <div className="container" style={{ color: '#b00020' }}>{error}</div>
  if (!me) return null

  return (
    <div className="container grid gap-4 grid-1-2">
      <div className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Hồ sơ</h2>
        <div className="text-slate-700">{me.email}</div>
        <div className="text-slate-700">Vai trò: {me.is_tasker ? 'Tasker' : 'Client'}</div>
      </div>
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16 }}>
        <h3 className="text-slate-900">Cập nhật thông tin</h3>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          <div>
            <label className="text-slate-700">Họ</label>
            <input className="input" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
          </div>
          <div>
            <label className="text-slate-700">Tên</label>
            <input className="input" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
          </div>
          <div>
            <label className="text-slate-700">Số điện thoại</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <button className="btn" type="submit">Lưu</button>
        </div>
      </form>
    </div>
  )
}


