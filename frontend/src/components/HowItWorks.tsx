export default function HowItWorks() {
  const steps = [
    { title: 'Chọn Tasker', desc: 'Theo giá, kỹ năng, đánh giá.' },
    { title: 'Đặt lịch', desc: 'Có thể ngay hôm nay.' },
    { title: 'Chat & thanh toán', desc: 'Tất cả trong một nơi.' },
  ]
  return (
    <section className="bg-white rounded-2xl shadow-lg border" style={{ padding: 20 }}>
      <h2 className="text-slate-900" style={{ marginTop: 0, marginBottom: 20 }}>Cách hoạt động</h2>
      
      <div className="flex gap-8 items-center">
        {/* Image Section */}
        <div className="flex-1">
          <img
            src="/src/assets/images/How.jpg"
            alt="How Stackin Works"
            className="w-full h-64 object-cover rounded-xl shadow-md"
            style={{ border: '2px solid #e5e7eb' }}
          />
        </div>
        
        {/* Steps Section - Horizontal */}
        <div className="flex-1">
          <div className="flex gap-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-lg border flex-1" style={{ padding: 16 }}>
                <div className="text-slate-900" style={{ fontWeight: 700 }}>{i + 1}. {s.title}</div>
                <div className="text-slate-700">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


