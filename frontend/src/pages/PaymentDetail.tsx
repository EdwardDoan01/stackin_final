import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { paymentApi } from '../lib/api'
import { useUIStore } from '../store/ui'

export default function PaymentDetailPage() {
  const { id } = useParams()
  const [payment, setPayment] = useState<any | null>(null)
  const [error, setError] = useState('')
  const toast = useUIStore((s) => s.showToast)

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setError('')
      try {
        const res = await paymentApi.detail(Number(id))
        setPayment(res.data)
      } catch (e: any) {
        setError('Không tải được payment')
      }
    }
    load()
  }, [id])

  if (error) return <div className="container" style={{ color: '#b00020' }}>{error}</div>
  if (!payment) return <div className="container">Đang tải...</div>

  return (
    <div className="container">
      <div className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Payment #{payment.id}</h2>
        <div className="text-slate-700">Số tiền: {payment.amount} {payment.currency}</div>
        <div className="text-slate-700">Trạng thái: {payment.status}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
          <button className="btn" onClick={async () => { await paymentApi.release(payment.id); toast('Đã release', 'success') }}>Release</button>
          <button className="btn" onClick={async () => { await paymentApi.refund(payment.id); toast('Đã refund', 'success') }}>Refund</button>
        </div>
      </div>
    </div>
  )
}


