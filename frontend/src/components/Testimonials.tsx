export default function Testimonials() {
  const items = [
    { name: 'Elisa R.', text: 'Tuyệt vời! Nhanh, gọn, chuyên nghiệp.' },
    { name: 'Jana T.', text: 'Liên lạc tốt, xử lý hiệu quả.' },
    { name: 'Tiffany B.', text: 'Rất hài lòng với chất lượng công việc.' },
  ]
  return (
    <section className="bg-white rounded-2xl shadow-lg border" style={{ padding: 20 }}>
      <h2 className="text-slate-900" style={{ marginTop: 0 }}>Khách hàng nói gì</h2>
      <div className="grid gap-4" style={{ gridTemplateColumns: '1fr' }}>
        {items.map((t) => (
          <div key={t.name} className="rounded-lg border" style={{ padding: 16, background: '#fff' }}>
            <div className="text-slate-900" style={{ fontWeight: 700 }}>{t.name}</div>
            <div className="text-slate-700">{t.text}</div>
          </div>
        ))}
      </div>
      <style>{`@media(min-width:900px){ section > div{ grid-template-columns: repeat(3, minmax(0,1fr)); } }`}</style>
    </section>
  )
}


