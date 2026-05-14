#!/usr/bin/env bash
# OSPP — Déploiement automatique sur Ubuntu 22.04+
# Usage : bash deploy.sh
set -euo pipefail

REPO="https://github.com/loumpare/Open-Source-Political-Program-OSPP-.git"
APP_DIR="$HOME/ospp"
PORT=80

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   OSPP — Open Source Political Program       ║"
echo "║   Installation automatique (beta)            ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── 1. Docker ────────────────────────────────────────────────────────────────
if ! command -v docker &>/dev/null; then
  echo "▶ Installation de Docker..."
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker "$USER"
  echo "✓ Docker installé"
else
  echo "✓ Docker déjà présent ($(docker --version))"
fi

# ── 2. Git ───────────────────────────────────────────────────────────────────
if ! command -v git &>/dev/null; then
  echo "▶ Installation de git..."
  sudo apt-get update -qq && sudo apt-get install -y git
fi

# ── 3. Clone ─────────────────────────────────────────────────────────────────
if [ -d "$APP_DIR" ]; then
  echo "▶ Mise à jour du code..."
  git -C "$APP_DIR" pull
else
  echo "▶ Téléchargement du projet..."
  git clone "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"

# ── 4. Port 80 (nginx frontend) ──────────────────────────────────────────────
# Remplace le port exposé du frontend dans docker-compose si besoin
if grep -q "5173:80" docker-compose.yml 2>/dev/null; then
  sed -i "s/5173:80/${PORT}:80/" docker-compose.yml
fi

# ── 5. Lancement ─────────────────────────────────────────────────────────────
echo ""
echo "▶ Démarrage des services (frontend + API + Ollama)..."
echo "  ⚠ Premier lancement : téléchargement du modèle IA (~5 GB), patientez 5-10 min"
echo ""

# Utilise sudo si l'utilisateur n'est pas encore dans le groupe docker
if groups | grep -q docker; then
  docker compose up -d --build
else
  sudo docker compose up -d --build
fi

# ── 6. IP publique ────────────────────────────────────────────────────────────
IP=$(curl -fsSL https://api.ipify.org 2>/dev/null || hostname -I | awk '{print $1}')

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅  OSPP est en ligne !                     ║"
echo "╠══════════════════════════════════════════════╣"
printf  "║  🌐  http://%-33s║\n" "$IP"
echo "║                                              ║"
echo "║  Premier démarrage : attendre ~5-10 min     ║"
echo "║  que le modèle Ollama finisse de charger.   ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Commandes utiles :"
echo "  docker compose logs -f     → voir les logs"
echo "  docker compose down        → arrêter"
echo "  docker compose restart     → redémarrer"
