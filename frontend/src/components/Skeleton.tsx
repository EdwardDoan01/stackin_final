export function Skeleton({ height = 14 }: { height?: number }) {
  return (
    <div className="rounded-lg" style={{ background: '#e5e7eb', height, width: '100%', animation: 'pulse 1.5s infinite' }} />
  )
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border" style={{ padding: 12 }}>
      <Skeleton height={18} />
      <div style={{ height: 8 }} />
      <Skeleton height={14} />
    </div>
  )
}

/* minimal keyframes */
const style = document.createElement('style')
style.innerHTML = '@keyframes pulse{0%{opacity:.6}50%{opacity:1}100%{opacity:.6}}'
document.head.appendChild(style)


