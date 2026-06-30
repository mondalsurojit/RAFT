import type { ChartOptions } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { ClientOnly } from 'vite-react-ssg'
import { publications } from '@/content'
import { ChartSkeleton } from './ChartSkeleton'
import { chartColors, palette } from './theme'
import './registry'

export function PublicationsByYearChart() {
  const counts = new Map<number, number>()
  for (const p of publications) counts.set(p.year, (counts.get(p.year) ?? 0) + 1)
  const years = [...counts.keys()].sort((a, b) => a - b)

  const data = {
    labels: years.map(String),
    datasets: [
      {
        label: 'Publications',
        data: years.map((y) => counts.get(y) ?? 0),
        backgroundColor: chartColors.brand,
        hoverBackgroundColor: chartColors.aqua,
        borderRadius: 6,
        maxBarThickness: 34,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: '#566a86' }, grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#566a86' },
        grid: { color: 'rgba(13,42,82,0.08)' },
      },
    },
  }

  return (
    <ClientOnly fallback={<ChartSkeleton height={300} />}>
      {() => (
        <div style={{ height: 300 }}>
          <Bar data={data} options={options} />
        </div>
      )}
    </ClientOnly>
  )
}

export function PublicationAreasChart() {
  const counts = new Map<string, number>()
  for (const p of publications) if (p.area) counts.set(p.area, (counts.get(p.area) ?? 0) + 1)
  const labels = [...counts.keys()]

  const data = {
    labels,
    datasets: [
      {
        data: labels.map((l) => counts.get(l) ?? 0),
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#3c495c', boxWidth: 12, boxHeight: 12, padding: 12, font: { size: 11 } },
      },
    },
  }

  return (
    <ClientOnly fallback={<ChartSkeleton height={300} />}>
      {() => (
        <div style={{ height: 300 }}>
          <Doughnut data={data} options={options} />
        </div>
      )}
    </ClientOnly>
  )
}
