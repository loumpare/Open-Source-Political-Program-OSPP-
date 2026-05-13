#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

# Kill anything already on our ports
kill_port() { lsof -ti:"$1" 2>/dev/null | xargs kill -9 2>/dev/null || true; }
kill_port 3000
kill_port 8001

echo "Starting OSPP..."

# RAG API (Ollama + ChromaDB)
"$ROOT/.venv/bin/python" "$ROOT/research/api.py" > /tmp/ospp_api.log 2>&1 &
API_PID=$!

# Frontend (Vite)
cd "$ROOT/frontend"
node_modules/.bin/vite --port 3000 > /tmp/ospp_front.log 2>&1 &
FRONT_PID=$!
cd "$ROOT"

# Wait for both to be ready
echo -n "Waiting"
for i in $(seq 1 20); do
  sleep 1
  echo -n "."
  API_OK=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8001/health 2>/dev/null || echo 0)
  FRONT_OK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo 0)
  [ "$API_OK" = "200" ] && [ "$FRONT_OK" = "200" ] && break
done
echo ""

echo ""
echo "  Frontend  →  http://localhost:3000"
echo "  RAG API   →  http://127.0.0.1:8001"
echo ""
echo "Logs: /tmp/ospp_front.log | /tmp/ospp_api.log"
echo "Stop: kill $FRONT_PID $API_PID  (or Ctrl+C)"
echo ""

# Keep script alive so Ctrl+C kills both
trap "kill $FRONT_PID $API_PID 2>/dev/null; echo 'Stopped.'" EXIT
wait
