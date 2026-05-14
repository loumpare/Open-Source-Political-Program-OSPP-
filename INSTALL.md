# Installer OSPP en local (GPU NVIDIA requis)

## Windows

**1. Installe les prérequis (une seule fois)**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) → installer → redémarrer
- Drivers NVIDIA récents : [nvidia.com/drivers](https://www.nvidia.com/drivers) (si pas déjà fait)

**2. Clone et lance**

Ouvre PowerShell ou Git Bash :
```bash
git clone https://github.com/loumpare/Open-Source-Political-Program-OSPP-.git ospp
cd ospp
docker compose up --build
```

**3. Ouvre dans ton navigateur**
```
http://localhost
```

---

## Linux (Ubuntu / Debian)

**1. Installe Docker + support GPU**
```bash
# Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER && newgrp docker

# Support GPU NVIDIA
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sudo apt-get update && sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

**2. Clone et lance**
```bash
git clone https://github.com/loumpare/Open-Source-Political-Program-OSPP-.git ospp
cd ospp
docker compose up --build
```

**3. Ouvre dans ton navigateur**
```
http://localhost
```

---

## Notes

- **Premier démarrage** : télécharge le modèle IA (~5 GB), attends 5-10 min
- **RAM minimum** : 8 GB RAM + 6 GB VRAM GPU
- **Arrêter** : `docker compose down`
- **Mettre à jour** : `git pull && docker compose up --build`
