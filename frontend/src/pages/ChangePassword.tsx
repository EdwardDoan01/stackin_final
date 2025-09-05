import { useState } from 'react'
import { userApi } from '../lib/api'

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ old_password: '', new_password: '' })
  const [ok, setOk] = useState('')
  const [err, setErr] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOk(''); setErr('')
    try {
      await userApi.changePassword(form)
      setOk('Đổi mật khẩu thành công')
      setForm({ old_password: '', new_password: '' })
    } catch (e: any) {
      setErr('Đổi mật khẩu thất bại')
    }
  }

  return (
    <div className="container">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16, maxWidth: 520 }}>
        <h2 className="text-slate-900">Đổi mật khẩu</h2>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          <input className="input" placeholder="Mật khẩu hiện tại" type="password" value={form.old_password} onChange={(e) => setForm({ ...form, old_password: e.target.value })} />
          <input className="input" placeholder="Mật khẩu mới" type="password" value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} />
          <button className="btn" type="submit">Cập nhật</button>
          {ok && <div style={{ color: '#0a7d28' }}>{ok}</div>}
          {err && <div style={{ color: '#b00020' }}>{err}</div>}
        </div>
      </form>
    </div>
  )
}


