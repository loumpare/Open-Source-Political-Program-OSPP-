import { useEffect, useRef } from 'react'

interface Props {
  message?: string
  countryFlag?: string
  countryName?: string
}

// Fixed nodes on the sphere (theta = polar from north, phi = azimuthal)
const NODES = [
  { theta: 0.8, phi: 0.3 },  { theta: 1.2, phi: 1.8 },
  { theta: 0.5, phi: 3.5 },  { theta: 1.6, phi: 0.9 },
  { theta: 2.1, phi: 2.4 },  { theta: 0.9, phi: 5.1 },
  { theta: 1.4, phi: 4.2 },  { theta: 0.4, phi: 1.1 },
  { theta: 1.9, phi: 3.0 },  { theta: 1.1, phi: 0.0 },
  { theta: 2.4, phi: 1.5 },  { theta: 0.7, phi: 2.7 },
  { theta: 1.7, phi: 5.8 },  { theta: 1.0, phi: 4.8 },
  { theta: 2.7, phi: 0.6 },
].map((n, i) => ({ ...n, pulseOffset: i * 0.42 }))

export default function GlobeLoader({ message, countryFlag, countryName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const W = 240, H = 240
    const cx = W / 2, cy = H / 2
    const R = 100
    let rotation = 0
    let raf: number

    function project(theta: number, phi: number) {
      const x3 = Math.sin(theta) * Math.cos(phi + rotation)
      const y3 = Math.cos(theta)
      const z3 = Math.sin(theta) * Math.sin(phi + rotation)
      return {
        x:       cx + R * x3,
        y:       cy - R * y3,
        z:       z3,
        alpha:   Math.max(0, (z3 + 0.25) / 1.25),
        visible: z3 > -0.2,
      }
    }

    function draw(ts: number) {
      rotation += 0.006
      ctx.clearRect(0, 0, W, H)

      // ── Globe background ────────────────────────────────────────────────
      const bg = ctx.createRadialGradient(cx - 28, cy - 28, 8, cx, cy, R)
      bg.addColorStop(0, '#1e40af')
      bg.addColorStop(0.5, '#1e3a8a')
      bg.addColorStop(1, '#0f172a')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = bg
      ctx.fill()

      // ── Clip drawing to globe ───────────────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // Latitude grid lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const rad  = lat * Math.PI / 180
        const yPos = cy - R * Math.sin(rad)
        const xRad = R * Math.cos(rad)
        ctx.beginPath()
        ctx.ellipse(cx, yPos, xRad, xRad * 0.22, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.07)'
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // Longitude grid lines (rotate with globe)
      for (let i = 0; i < 6; i++) {
        const phi   = (i * Math.PI) / 6 + rotation
        const xRad  = R * Math.abs(Math.cos(phi))
        const alpha = Math.abs(Math.cos(phi)) * 0.09
        ctx.beginPath()
        ctx.ellipse(cx, cy, xRad, R, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      ctx.restore()

      // ── Globe rim ───────────────────────────────────────────────────────
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(99,102,241,0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // ── Project nodes ───────────────────────────────────────────────────
      const pts = NODES.map(n => ({ ...project(n.theta, n.phi), pulse: n.pulseOffset }))

      // Connection lines (behind nodes)
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          if (!a.visible || !b.visible) continue
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > R * 1.1) continue

          const alpha = Math.min(a.alpha, b.alpha) * 0.55
          // Animated opacity pulse on connections
          const pulse = 0.6 + 0.4 * Math.sin(ts * 0.0008 + i * 0.7 + j * 0.4)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(239,68,68,${alpha * pulse})`
          ctx.lineWidth = 0.9
          ctx.stroke()
        }
      }

      // Nodes
      for (const p of pts) {
        if (!p.visible) continue
        const pulseFactor = 1 + 0.18 * Math.sin(ts * 0.002 + p.pulse)
        const r = 4.5 * pulseFactor * (0.5 + 0.5 * p.alpha)

        // Outer glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.5)
        glow.addColorStop(0, `rgba(239,68,68,${p.alpha * 0.45})`)
        glow.addColorStop(1, 'rgba(239,68,68,0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(239,68,68,${p.alpha})`
        ctx.fill()

        // Bright center
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,200,200,${p.alpha * 0.9})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-80 gap-3 select-none">
      <div className="relative">
        <canvas ref={canvasRef} width={240} height={240} />

        {/* Country badge overlay */}
        {countryFlag && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2
                          bg-white/90 backdrop-blur-sm rounded-full px-3 py-1
                          flex items-center gap-1.5 shadow-lg border border-slate-200">
            <span className="text-lg leading-none">{countryFlag}</span>
            {countryName && (
              <span className="text-xs font-semibold text-slate-700">{countryName}</span>
            )}
          </div>
        )}
      </div>

      {/* Animated dots + message */}
      <div className="text-center space-y-1">
        <p className="text-slate-700 font-medium text-sm">{message ?? 'Running simulation…'}</p>
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
