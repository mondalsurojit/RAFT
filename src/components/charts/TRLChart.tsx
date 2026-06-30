import type { ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ClientOnly } from 'vite-react-ssg'
import { projects } from '@/content'
import { ChartSkeleton } from './ChartSkeleton'
import { palette } from './theme'
import './registry'

const shortTitle = (t: string) => t.split(' — ')[0]

export function TRLChart({ height = 440 }: { height?: number }) {
  const items = [...projects].sort((a, b) => b.trl - a.trl)

  const data = {
    labels: items.map((i) => shortTitle(i.title)),
    datasets: [
      {
        label: 'TRL',
        data: items.map((i) => i.trl),
        backgroundColor: items.map((_, i) => palette[i % palette.length]),
        borderRadius: 6,
        maxBarThickness: 18,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (c) => `TRL ${c.parsed.x} of 9` },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 9,
        ticks: { stepSize: 1, color: '#566a86' },
        grid: { color: 'rgba(13,42,82,0.08)' },
        title: { display: true, text: 'Technology Readiness Level', color: '#566a86' },
      },
      y: {
        ticks: { color: '#3c495c', font: { size: 11 } },
        grid: { display: false },
      },
    },
  }

  return (
    <ClientOnly fallback={<ChartSkeleton height={height} />}>
      {() => (
        <div style={{ height }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </ClientOnly>
  )
}
