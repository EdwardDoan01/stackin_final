export default function ErrorAlert({ message }: { message: string }) {
  if (!message) return null
  return (
    <div className="rounded-lg" style={{ background: '#fee2e2', color: '#7f1d1d', padding: '10px 12px', border: '1px solid #fecaca' }}>
      {message}
    </div>
  )
}


