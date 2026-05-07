import axios from "axios";

const client = axios.create({ baseURL: "/api" });

export const api = {
  summary: () => client.get("/analytics/summary").then((r) => r.data),
  listPropositions: (domain?: string) =>
    client.get("/propositions/", { params: domain ? { domain } : {} }).then((r) => r.data),
  getProposition: (id: string) => client.get(`/propositions/${id}`).then((r) => r.data),
  voteProposition: (id: string, support: 1 | -1, userId: string) =>
    client.post(`/propositions/${id}/vote`, { user_id: userId, support }).then((r) => r.data),
  listSimulations: () => client.get("/simulations/").then((r) => r.data),
  getSimulation: (id: string) => client.get(`/simulations/${id}`).then((r) => r.data),
  createSimulation: (propositionId: string, nAgents = 10000, nSteps = 10) =>
    client
      .post("/simulations/", { proposition_id: propositionId, n_agents: nAgents, n_steps: nSteps })
      .then((r) => r.data),
};
