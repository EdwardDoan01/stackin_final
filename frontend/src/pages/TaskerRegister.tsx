import { useState } from 'react'
import { userApi } from '../lib/api'
import { useAuthStore } from '../store/auth'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../store/ui'

export default function TaskerRegisterPage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const toast = useUIStore((s) => s.showToast)

  const [form, setForm] = useState({ bio: '', experience: '', categories: '' })
  const [files, setFiles] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate('/login')
  } else if (user.is_tasker) {
    navigate('/tasker-dashboard')
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('bio', form.bio)
      fd.append('experience', form.experience)
      fd.append('categories', form.categories)
      if (files?.length) Array.from(files).forEach((f) => fd.append('documents', f))
      await userApi.registerTasker(fd as any)
      toast('Đăng ký Tasker thành công • đang chờ duyệt', 'success')
      navigate('/tasker-dashboard')
    } catch (e: any) {
      toast('Đăng ký Tasker thất bại', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <form onSubmit={submit} className="card" style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
        <div className="card-header"><h2 className="text-slate-900" style={{ margin: 0 }}>Trở thành Tasker</h2></div>
        <div className="grid gap-3" style={{ paddingTop: 12 }}>
          <label className="text-slate-700">Giới thiệu</label>
          <textarea className="input" placeholder="Giới thiệu bản thân" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <label className="text-slate-700">Kinh nghiệm</label>
          <input className="input" placeholder="VD: 2 năm sửa điện nước" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
          <label className="text-slate-700">Danh mục thế mạnh</label>
          <input className="input" placeholder="VD: cleaning, plumbing" value={form.categories} onChange={(e) => setForm({ ...form, categories: e.target.value })} />
          <label className="text-slate-700">Tài liệu (tùy chọn)</label>
          <input className="input" type="file" multiple onChange={(e) => setFiles(e.target.files)} />
          <button disabled={loading} className="btn" type="submit">{loading ? 'Đang gửi...' : 'Gửi đăng ký'}</button>
          <div className="lead">Sau khi duyệt, bạn sẽ thấy bảng điều khiển Tasker.</div>
        </div>
      </form>
    </div>
  )
}


