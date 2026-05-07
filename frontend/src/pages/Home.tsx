import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export default function Home() {
  const { data } = useQuery({ queryKey: ["summary"], queryFn: api.summary });

  return (
    <div>
      <h1>Programme Politique Open Source</h1>
      <p>Premier programme politique français collaboratif, piloté par les données et simulé par des agents LLM.</p>
      {data && (
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
          <Stat label="Propositions" value={data.propositions} />
          <Stat label="Simulations" value={data.simulations_completed} />
          <Stat label="Votes citoyens" value={data.votes_cast} />
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: 8, minWidth: 140 }}>
      <div style={{ fontSize: "2rem", fontWeight: 700 }}>{value ?? "—"}</div>
      <div style={{ color: "#6b7280" }}>{label}</div>
    </div>
  );
}
