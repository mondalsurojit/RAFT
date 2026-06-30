export function ChartSkeleton({ height = 360 }: { height?: number }) {
  return (
    <div
      className="flex w-full animate-pulse items-end gap-2 rounded-2xl bg-ink-100/70 p-6"
      style={{ height }}
      aria-hidden
    >
      {[60, 80, 45, 92, 70, 55].map((h, i) => (
        <div key={i} className="flex-1 rounded-md bg-ink-200" style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}
