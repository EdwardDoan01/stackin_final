import { useParams } from 'react-router-dom'
import { taskApi } from '../lib/api'

export default function TaskCompleteQRPage() {
  const { id } = useParams()

  const complete = async () => {
    if (!id) return
    await taskApi.completeQR(Number(id))
    alert('Xác nhận QR thành công')
  }

  return (
    <div className="container">
      <div className="bg-white rounded-2xl shadow-lg border" style={{ padding: 16 }}>
        <h2 className="text-slate-900">Xác nhận hoàn thành bằng QR</h2>
        <p className="text-slate-700">Yêu cầu client quét mã để xác nhận.</p>
        <button className="btn" onClick={complete}>Xác nhận</button>
      </div>
    </div>
  )
}


