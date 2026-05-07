import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import SimulationDashboard from "../components/SimulationDashboard";

export default function Simulations() {
  const { data, isLoading } = useQuery({ queryKey: ["simulations"], queryFn: api.listSimulations });

  if (isLoading) return <p>Chargement…</p>;

  return (
    <div>
      <h2>Simulations</h2>
      {data?.length === 0 && <p>Aucune simulation lancée.</p>}
      {data?.map((s: any) => <SimulationDashboard key={s.id} simulation={s} />)}
    </div>
  );
}
