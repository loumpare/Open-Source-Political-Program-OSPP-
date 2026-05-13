import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { useLanguage } from '../../i18n'

interface BandPoint {
  year: number
  mean: number
  p5: number
  p95: number
}

interface Props {
  data: BandPoint[]
  label: string
  color?: string
  formatY?: (v: number) => string
}

export default function MonteCarloChart({
  data,
  label,
  color = '#6366f1',
  formatY,
}: Props) {
  const { t } = useLanguage()
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return

    const W = svgRef.current.clientWidth || 480
    const H = 190
    const m = { top: 16, right: 20, bottom: 28, left: 52 }
    const iw = W - m.left - m.right
    const ih = H - m.top - m.bottom

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3
      .select(svgRef.current)
      .attr('height', H)
      .attr('viewBox', `0 0 ${W} ${H}`)

    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`)

    const xScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map(d => d.year))])
      .range([0, iw])

    const allVals = data.flatMap(d => [d.p5, d.p95])
    const yPad = (d3.max(allVals)! - d3.min(allVals)!) * 0.2 || 1
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(allVals)! - yPad, d3.max(allVals)! + yPad])
      .range([ih, 0])

    const fmt = formatY ?? ((v: number) => v.toFixed(2))

    // Grid
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(4).tickSize(-iw).tickFormat('' as never))
      .call(gg => gg.select('.domain').remove())
      .call(gg => gg.selectAll('line')
        .attr('stroke', '#f1f5f9')
        .attr('stroke-dasharray', '3,3'))

    // Axes
    g.append('g')
      .attr('transform', `translate(0,${ih})`)
      .call(d3.axisBottom(xScale).ticks(data.length - 1).tickFormat(d => `Y${d}`))
      .call(gg => gg.select('.domain').remove())

    g.append('g')
      .call(d3.axisLeft(yScale).ticks(4).tickFormat(fmt as never))
      .call(gg => gg.select('.domain').remove())

    // P5–P95 band (shaded area)
    const area = d3.area<BandPoint>()
      .x(d => xScale(d.year))
      .y0(d => yScale(d.p5))
      .y1(d => yScale(d.p95))
      .curve(d3.curveMonotoneX)

    g.append('path')
      .datum(data)
      .attr('fill', color)
      .attr('fill-opacity', 0.12)
      .attr('d', area)

    // P5 line (dashed)
    const lineGen = (key: keyof BandPoint) =>
      d3.line<BandPoint>()
        .x(d => xScale(d.year))
        .y(d => yScale(d[key] as number))
        .curve(d3.curveMonotoneX)

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,2')
      .attr('stroke-opacity', 0.5)
      .attr('d', lineGen('p5'))

    // P95 line (dashed)
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,2')
      .attr('stroke-opacity', 0.5)
      .attr('d', lineGen('p95'))

    // Mean line (solid, bold)
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2.5)
      .attr('d', lineGen('mean'))

    // Mean dots
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.mean))
      .attr('r', 3)
      .attr('fill', color)

  }, [data, color, formatY])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <div className="flex gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 border-t-2" style={{ borderColor: color }} />
            {t.simulation.mc_chart_mean}
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block w-4 h-3 rounded-sm opacity-30"
              style={{ backgroundColor: color }}
            />
            {t.simulation.mc_chart_band}
          </span>
        </div>
      </div>
      <svg ref={svgRef} className="w-full" />
    </div>
  )
}
