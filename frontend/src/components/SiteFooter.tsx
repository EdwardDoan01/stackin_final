export default function SiteFooter() {
  return (
    <footer className="bg-white border" style={{ marginTop: 16, width: '100%' }}>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr', padding: '16px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <div>
          <div className="text-slate-900" style={{ fontWeight: 800 }}>Stackin</div>
          <div className="text-slate-700">Kết nối bạn với Tasker đáng tin cậy.</div>
        </div>
        <div className="text-slate-700">© {new Date().getFullYear()} Stackin</div>
      </div>
    </footer>
  )
}


