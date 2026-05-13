import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface DataPoint {
  year: number
  control: number
  policy: number
}

interface TimelineChartProps {
  data: DataPoint[]
  label: string
  unit?: string
  color?: string
  formatY?: (v: number) => string
}

export default function TimelineChart({
  data,
  label,
  unit = '',
  color = '#6366f1',
  formatY,
}: TimelineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    const W = svgRef.current.clientWidth || 480
    const H = 180
    const margin = { top: 16, right: 16, bottom: 28, left: 52 }
    const iw = W - margin.left - margin.right
    const ih = H - margin.top - margin.bottom

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('height', H)
      .attr('viewBox', `0 0 ${W} ${H}`)

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const xScale = d3.scaleLinear()
      .domain([0, Math.max(...data.map(d => d.year))])
      .range([0, iw])

    const allVals = data.flatMap(d => [d.control, d.policy])
    const yPad = (d3.max(allVals)! - d3.min(allVals)!) * 0.15 || 1
    const yScale = d3.scaleLinear()
      .domain([d3.min(allVals)! - yPad, d3.max(allVals)! + yPad])
      .range([ih, 0])

    const fmt = formatY ?? ((v: number) => `${v.toFixed(2)}${unit}`)

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${ih})`)
      .call(
        d3.axisBottom(xScale)
          .ticks(data.length - 1)
          .tickFormat(d => `Y${d}`)
      )
      .call(gg => gg.select('.domain').remove())
      .call(gg => gg.selectAll('line').attr('stroke', '#e2e8f0'))

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(4).tickFormat(fmt as never))
      .call(gg => gg.select('.domain').remove())
      .call(gg => gg.selectAll('line').attr('stroke', '#e2e8f0'))

    // Grid
    g.append('g')
      .attr('class', 'grid')
      .call(
        d3.axisLeft(yScale).ticks(4).tickSize(-iw).tickFormat('' as never)
      )
      .call(gg => gg.select('.domain').remove())
      .call(gg => gg.selectAll('line')
        .attr('stroke', '#f1f5f9')
        .attr('stroke-dasharray', '3,3')
      )

    // Line helper
    const line = (key: 'control' | 'policy') =>
      d3.line<DataPoint>()
        .x(d => xScale(d.year))
        .y(d => yScale(d[key]))
        .curve(d3.curveMonotoneX)

    // Control line (grey dashed)
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4,3')
      .attr('d', line('control'))

    // Policy line (colored)
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2.5)
      .attr('d', line('policy'))

    // Dots for policy
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.policy))
      .attr('r', 3)
      .attr('fill', color)

  }, [data, color, unit, formatY])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <div className="flex gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 border-t-2 border-dashed border-slate-400" />
            Without
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-4 border-t-2"
              style={{ borderColor: color }}
            />
            With policy
          </span>
        </div>
      </div>
      <svg ref={svgRef} className="w-full" />
    </div>
  )
}
