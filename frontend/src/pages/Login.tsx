import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/auth'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const loading = useAuthStore((s) => s.loading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/')
    } catch (e: any) {
      const data = e?.response?.data
      if (typeof data === 'string') {
        setError(data)
      } else if (data && typeof data === 'object') {
        // Handle validation errors from Django
        const msg = Object.values(data).flat().join('\n')
        setError(msg || 'Đăng nhập thất bại')
      } else {
        setError('Đăng nhập thất bại')
      }
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
        width: 'min(380px, 100%)',
        maxWidth: '380px'
      }}>
        <h2 className="text-slate-900 text-2xl font-bold" style={{ 
          margin: 0, 
          marginBottom: 24,
          textAlign: 'center'
        }}>Đăng nhập</h2>
        
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
          <label className="text-slate-700 font-medium" style={{ textAlign: 'left' }}>Email</label>
          <input 
            className="input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            type="email" 
            placeholder="you@example.com"
            style={{ padding: '12px 16px' }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          <label className="text-slate-700 font-medium" style={{ textAlign: 'left' }}>Mật khẩu</label>
          <input 
            className="input" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
        
        <div style={{ 
          marginTop: 20, 
          fontSize: 14, 
          textAlign: 'center'
        }} className="text-slate-700">
          Chưa có tài khoản?{' '}
          <Link 
            to="/register" 
            style={{ 
              color: 'var(--primary-600)', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-700)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary-600)'}
          >
            Đăng ký
          </Link>
        </div>
      </form>
    </div>
  )
}


