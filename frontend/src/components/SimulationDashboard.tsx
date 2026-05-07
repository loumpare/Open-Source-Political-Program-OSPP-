import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  simulation: {
    id: string;
    status: string;
    n_agents: number;
    results?: {
      final_support_pct: number;
      final_oppose_pct: number;
      steps: { support_pct: number[]; oppose_pct: number[] };
    };
  };
}

export default function SimulationDashboard({ simulation }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!simulation.results?.steps || !svgRef.current) return;
    const { support_pct, oppose_pct } = simulation.results.steps;
    const data = support_pct.map((s, i) => ({ step: i, support: s, oppose: oppose_pct[i] }));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 400, height = 160, margin = { top: 10, right: 10, bottom: 30, left: 35 };
    const x = d3.scaleLinear().domain([0, data.length - 1]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    const line = (key: "support" | "oppose") =>
      d3.line<(typeof data)[0]>().x((d) => x(d.step)).y((d) => y(d[key]));

    svg.append("path").datum(data).attr("fill", "none").attr("stroke", "#22c55e").attr("stroke-width", 2).attr("d", line("support") as any);
    svg.append("path").datum(data).attr("fill", "none").attr("stroke", "#ef4444").attr("stroke-width", 2).attr("d", line("oppose") as any);
    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).ticks(5));
    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`));
  }, [simulation.results]);

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>{simulation.id.slice(0, 8)}…</strong>
        <span>{simulation.status} — {simulation.n_agents.toLocaleString()} agents</span>
      </div>
      {simulation.results && (
        <div style={{ marginTop: 8 }}>
          <span style={{ color: "#22c55e", marginRight: 16 }}>Pour: {simulation.results.final_support_pct}%</span>
          <span style={{ color: "#ef4444" }}>Contre: {simulation.results.final_oppose_pct}%</span>
          <svg ref={svgRef} width={400} height={160} style={{ display: "block", marginTop: 8 }} />
        </div>
      )}
    </div>
  );
}
