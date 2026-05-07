import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import PropositionCard from "../components/PropositionCard";

export default function Propositions() {
  const { data, isLoading } = useQuery({ queryKey: ["propositions"], queryFn: api.listPropositions });

  if (isLoading) return <p>Chargement…</p>;

  return (
    <div>
      <h2>Propositions</h2>
      {data?.length === 0 && <p>Aucune proposition pour l'instant.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {data?.map((p: any) => <PropositionCard key={p.id} proposition={p} />)}
      </div>
    </div>
  );
}
