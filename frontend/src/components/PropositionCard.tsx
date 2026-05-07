interface Props {
  proposition: {
    id: string;
    domain: string;
    title: string;
    summary?: string;
    status: string;
  };
}

const STATUS_COLORS: Record<string, string> = {
  draft: "#d1d5db",
  discussion: "#fde68a",
  vote: "#93c5fd",
  adopte: "#86efac",
  rejete: "#fca5a5",
};

export default function PropositionCard({ proposition }: Props) {
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: "0.75rem", color: "#6b7280", textTransform: "uppercase" }}>
          {proposition.domain}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            padding: "2px 8px",
            borderRadius: 99,
            background: STATUS_COLORS[proposition.status] ?? "#e5e7eb",
          }}
        >
          {proposition.status}
        </span>
      </div>
      <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>{proposition.title}</h3>
      {proposition.summary && <p style={{ margin: 0, color: "#374151", fontSize: "0.9rem" }}>{proposition.summary}</p>}
    </div>
  );
}
