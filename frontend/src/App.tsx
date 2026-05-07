import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Propositions from "./pages/Propositions";
import Simulations from "./pages/Simulations";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 1100, margin: "0 auto", padding: "0 1rem" }}>
      <nav style={{ borderBottom: "1px solid #e5e7eb", padding: "1rem 0", marginBottom: "2rem" }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: "1.1rem", marginRight: "2rem", textDecoration: "none" }}>
          OSPP
        </Link>
        <Link to="/propositions" style={{ marginRight: "1.5rem", textDecoration: "none" }}>Propositions</Link>
        <Link to="/simulations" style={{ textDecoration: "none" }}>Simulations</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propositions" element={<Propositions />} />
        <Route path="/simulations" element={<Simulations />} />
      </Routes>
    </div>
  );
}
