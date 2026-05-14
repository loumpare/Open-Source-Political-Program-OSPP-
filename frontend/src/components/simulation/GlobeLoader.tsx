import { useEffect, useRef } from 'react'

interface Props {
  message?: string
  countryFlag?: string
  countryName?: string
}

// ── Simplified continent polygons [lon, lat] ─────────────────────────────────
const CONTINENTS: [number, number][][] = [
  // Africa
  [[-18,14],[-15,20],[-12,33],[-5,36],[4,37],[12,37],[22,37],[30,32],
   [37,22],[42,11],[43,5],[42,-1],[40,-10],[36,-18],[32,-28],[27,-34],
   [18,-35],[12,-34],[8,-25],[10,-16],[6,-4],[0,2],[-4,4],[-8,4],
   [-12,6],[-16,8],[-18,14]],
  // Europe
  [[-10,36],[-9,39],[-9,44],[-2,46],[-5,48],[0,50],[5,52],[8,55],
   [10,58],[15,60],[20,60],[28,60],[32,58],[28,56],[25,52],[23,50],
   [18,48],[14,46],[12,44],[7,44],[3,44],[0,42],[-3,40],[-9,38],[-10,36]],
  // Asia (mainland)
  [[26,68],[40,70],[60,72],[80,72],[100,70],[120,68],[140,68],[160,60],
   [170,55],[145,45],[135,32],[130,22],[120,8],[104,0],[100,3],[95,8],
   [80,8],[72,8],[68,14],[60,18],[55,22],[50,25],[44,30],[38,36],
   [36,40],[28,40],[26,44],[28,50],[24,54],[22,60],[26,68]],
  // North America
  [[-170,62],[-140,68],[-120,70],[-100,72],[-80,72],[-60,68],[-50,60],
   [-54,52],[-66,44],[-70,40],[-76,34],[-80,28],[-82,22],[-88,16],
   [-84,10],[-78,8],[-76,10],[-80,18],[-86,24],[-92,26],[-96,28],
   [-104,28],[-110,32],[-116,32],[-122,36],[-124,40],[-124,48],
   [-130,54],[-140,58],[-150,60],[-160,58],[-165,60],[-170,62]],
  // South America
  [[-80,8],[-76,10],[-62,12],[-60,14],[-52,4],[-50,-2],[-36,-6],
   [-34,-8],[-36,-16],[-40,-22],[-44,-26],[-50,-30],[-54,-34],
   [-58,-36],[-64,-40],[-66,-44],[-68,-50],[-66,-54],[-70,-56],
   [-74,-52],[-76,-44],[-74,-38],[-72,-32],[-74,-28],[-76,-22],
   [-80,-16],[-80,0],[-80,8]],
  // Australia
  [[114,-22],[118,-18],[122,-16],[128,-14],[136,-14],[140,-16],
   [146,-18],[150,-22],[152,-26],[154,-28],[152,-32],[148,-36],
   [144,-38],[138,-36],[132,-32],[126,-34],[120,-34],[114,-30],[112,-26],[114,-22]],
  // Greenland
  [[-50,60],[-44,62],[-30,62],[-18,66],[-16,72],[-20,78],[-30,82],
   [-46,84],[-58,82],[-66,78],[-68,72],[-64,66],[-58,62],[-50,60]],
  // Japan (simplified)
  [[130,32],[132,34],[134,35],[136,36],[138,38],[140,40],[142,42],
   [144,44],[142,44],[140,42],[138,40],[136,38],[134,36],[132,34],[130,32]],
]

// Fixed simulation nodes [lon, lat]
const NODES: [number, number][] = [
  [2.3, 48.9],    // Paris
  [-74, 40.7],    // New York
  [139.7, 35.7],  // Tokyo
  [-43.2, -22.9], // Rio
  [28.0, -26.2],  // Johannesburg
  [77.2, 28.6],   // Delhi
  [116.4, 39.9],  // Beijing
  [-99.1, 19.4],  // Mexico City
  [37.6, 55.8],   // Moscow
  [151.2, -33.9], // Sydney
  [-0.1, 51.5],   // London
  [12.5, 41.9],   // Rome
]

export default function GlobeLoader({ message, countryFlag, countryName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = 240, H = 240
    const cx = W / 2, cy = H / 2
    const R = 108
    let rotation = 0
    let raf: number

    // Convert geographic (lon°, lat°) → sphere 3D + screen 2D
    function project(lon: number, lat: number) {
      const theta = (90 - lat) * Math.PI / 180
      const phi   = lon * Math.PI / 180
      const x3 = Math.sin(theta) * Math.cos(phi + rotation)
      const y3 = Math.cos(theta)
      const z3 = Math.sin(theta) * Math.sin(phi + rotation)
      return { x: cx + R * x3, y: cy - R * y3, z: z3 }
    }

    function draw(ts: number) {
      rotation += 0.005
      ctx.clearRect(0, 0, W, H)

      // ── Ocean background ──────────────────────────────────────────────────
      const ocean = ctx.createRadialGradient(cx - 30, cy - 25, 10, cx, cy, R)
      ocean.addColorStop(0,   '#1d4ed8')
      ocean.addColorStop(0.6, '#1e3a8a')
      ocean.addColorStop(1,   '#0c1445')
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = ocean
      ctx.fill()

      // ── Clip everything to globe ──────────────────────────────────────────
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.clip()

      // ── Latitude grid lines ───────────────────────────────────────────────
      for (let lat = -60; lat <= 60; lat += 30) {
        const rad  = lat * Math.PI / 180
        const yPos = cy - R * Math.sin(rad)
        const xRad = R * Math.cos(rad)
        ctx.beginPath()
        ctx.ellipse(cx, yPos, xRad, xRad * 0.20, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // ── Continent fill ────────────────────────────────────────────────────
      for (const polygon of CONTINENTS) {
        ctx.beginPath()
        let penDown = false
        for (const [lon, lat] of polygon) {
          const p = project(lon, lat)
          if (p.z > 0) {
            if (!penDown) { ctx.moveTo(p.x, p.y); penDown = true }
            else            ctx.lineTo(p.x, p.y)
          } else {
            penDown = false
          }
        }
        ctx.fillStyle   = 'rgba(34, 139, 69, 0.82)'
        ctx.strokeStyle = 'rgba(22, 101, 52, 0.9)'
        ctx.lineWidth   = 0.8
        ctx.fill()
        ctx.stroke()
      }

      // ── Longitude grid (behind continents, after fill) ────────────────────
      for (let i = 0; i < 6; i++) {
        const phi  = (i * Math.PI) / 6 + rotation
        const xRad = R * Math.abs(Math.cos(phi))
        ctx.beginPath()
        ctx.ellipse(cx, cy, xRad, R, 0, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${Math.abs(Math.cos(phi)) * 0.04})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      ctx.restore()

      // ── Globe rim + atmosphere ────────────────────────────────────────────
      const atmo = ctx.createRadialGradient(cx, cy, R - 4, cx, cy, R + 8)
      atmo.addColorStop(0, 'rgba(96, 165, 250, 0.25)')
      atmo.addColorStop(1, 'rgba(96, 165, 250, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, R + 8, 0, Math.PI * 2)
      ctx.fillStyle = atmo
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.5)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // ── Simulation nodes (cities) ─────────────────────────────────────────
      const pts = NODES.map(([lon, lat]) => ({ ...project(lon, lat) }))

      // Connection lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          if (a.z <= 0 || b.z <= 0) continue
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist > R * 1.0) continue
          const alpha = Math.min(a.z, b.z) * 0.6
          const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0007 + i * 0.8 + j * 0.5)
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(239,68,68,${alpha * pulse * 0.7})`
          ctx.lineWidth = 0.9
          ctx.stroke()
        }
      }

      // Node dots
      for (const p of pts) {
        if (p.z <= 0.05) continue
        const pulse = 1 + 0.2 * Math.sin(ts * 0.002 + p.x * 0.05)
        const r = 3.5 * pulse * Math.min(1, p.z + 0.4)

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4)
        glow.addColorStop(0, `rgba(239,68,68,${p.z * 0.5})`)
        glow.addColorStop(1, 'rgba(239,68,68,0)')
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(239,68,68,${Math.min(1, p.z + 0.3)})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,200,200,${p.z})`
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

      <div className="text-center space-y-1">
        <p className="text-slate-700 font-medium text-sm">{message ?? 'Running simulation…'}</p>
        <div className="flex items-center justify-center gap-1">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
