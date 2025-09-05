import type { FormEvent } from 'react'
import { useState } from 'react'
import { authApi } from '../lib/api'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', password2: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (form.password !== form.password2) {
        setError('Mật khẩu xác nhận không khớp')
        setLoading(false)
        return
      }
      await authApi.register({
        username: form.username,
        email: form.email,
        password: form.password,
        password2: form.password2,
      })
      navigate('/login')
    } catch (e: any) {
      const data = e?.response?.data
      if (typeof data === 'string') setError(data)
      else if (data && typeof data === 'object') {
        const msg = Object.values(data).flat().join('\n')
        setError(msg || 'Đăng ký thất bại')
      } else setError('Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 60px)',
      padding: '24px'
    }}>
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg border" style={{ 
        padding: '32px', 
        width: 'min(400px, 100%)',
        maxWidth: '400px'
      }}>
        <h2 className="text-slate-900 text-2xl font-bold" style={{ 
          margin: 0, 
          marginBottom: 24,
          textAlign: 'center'
        }}>Đăng ký</h2>
        
        {error && (
          <div style={{ 
            color: '#dc2626', 
            marginBottom: 16,
            padding: '12px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            {String(error)}
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label className="text-slate-700 font-medium" style={{ textAlign: 'left' }}>Tên người dùng</label>
          <input 
            className="input" 
            value={form.username} 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
            required 
            placeholder="username"
            style={{ padding: '12px 16px' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label className="text-slate-700 font-medium" style={{ textAlign: 'left' }}>Email</label>
          <input 
            className="input" 
            value={form.email} 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            required 
            type="email" 
            placeholder="you@example.com"
            style={{ padding: '12px 16px' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          <label className="text-slate-700 font-medium" style={{ textAlign: 'left' }}>Mật khẩu</label>
          <input 
            className="input" 
            value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required 
            type="password" 
            placeholder="••••••••"
            style={{ padding: '12px 16px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          <label className="text-slate-700 font-medium" style={{ textAlign: 'left' }}>Nhập lại mật khẩu</label>
          <input 
            className="input" 
            value={form.password2} 
            onChange={(e) => setForm({ ...form, password2: e.target.value })} 
            required 
            type="password" 
            placeholder="••••••••"
            style={{ padding: '12px 16px' }}
          />
        </div>
        
        <button 
          disabled={loading} 
          type="submit" 
          className="btn w-full"
          style={{ 
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </button>
        
        <div style={{ 
          marginTop: 20, 
          fontSize: 14, 
          textAlign: 'center'
        }} className="text-slate-700">
          Đã có tài khoản?{' '}
          <Link 
            to="/login" 
            style={{ 
              color: 'var(--primary-600)', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-600)'}
          >
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  )
}


