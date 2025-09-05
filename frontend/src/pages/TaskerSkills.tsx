import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function TaskerSkillsPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({ category: '', experience_level: 'beginner' })

  const load = async () => {
    const [s, c] = await Promise.all([
      api.get('/task/skills/'),
      api.get('/task/categories/'),
    ])
    setSkills(s.data)
    setCategories(c.data)
  }

  useEffect(() => { load() }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/task/skills/', { category: Number(form.category), experience_level: form.experience_level })
    setForm({ category: '', experience_level: 'beginner' })
    load()
  }

  const remove = async (id: number) => {
    await api.delete(`/task/skills/${id}/`)
    load()
  }

  return (
    <div className="container grid gap-4 grid-1-2">
      <form onSubmit={add} className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Kỹ năng Tasker</h2>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Chọn danh mục</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select className="input" value={form.experience_level} onChange={(e) => setForm({ ...form, experience_level: e.target.value })}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <button className="btn" type="submit">Thêm</button>
        </div>
      </form>
      <div className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16 }}>
        <h3 className="text-slate-900">Danh sách kỹ năng</h3>
        <div className="grid gap-3" style={{ marginTop: 12 }}>
          {skills.map((s) => (
            <div key={s.id} className="border rounded-lg" style={{ padding: 12, display: 'flex', justifyContent: 'space-between' }}>
              <div className="text-slate-800">{s.category?.name} • {s.experience_level}</div>
              <button className="btn" onClick={() => remove(s.id)}>Xóa</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


